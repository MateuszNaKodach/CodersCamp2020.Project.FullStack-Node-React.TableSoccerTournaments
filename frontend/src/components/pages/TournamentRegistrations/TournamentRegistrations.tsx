import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import {
  AddCircleOutline,
  Search,
  SupervisedUserCircle,
} from "@material-ui/icons";
import {
  PlayerProfileDto,
  UserProfileRestApi,
} from "../../../restapi/players-profiles";
import { Centered } from "../../atoms/Shared/Centered";
import { VerticalSpace } from "../../atoms/Shared/VerticalSpace";
import { useRouteMatch } from "react-router-dom";
import AddingPlayerForm from "../../organisms/AddingPlayerForm/AddingPlayerForm";
import { TournamentRegistrationsRestApi } from "../../../restapi/tournament-registrations";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Notification from "../../organisms/Notification/Notification";

export type TournamentRegistrationsProps = {
  readonly tournamentId: string;
};

export const TournamentRegistrations = () => {
  const searchInput = useRef<HTMLInputElement>(null);
  const [openAlert, setOpenAlert] = useState(false);

  const [availablePlayers, setAvailablePlayers] = useState<
    PlayerProfileDto[] | undefined
  >(undefined);
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerProfileDto[]>([]);
  const [registeredPlayersIds, setRegisteredPlayersIds] = useState<string[]>(
    []
  );

  useEffect(() => {
    UserProfileRestApi()
      .getPlayersProfiles()
      .then((playerProfilesList) => {
        setAvailablePlayers(playerProfilesList.items);
        setFilteredPlayers(playerProfilesList.items);
      });
  }, []);

  interface MatchParams {
    tournamentId: string;
  }

  const match = useRouteMatch<MatchParams>(
    "/tournament-registration/:tournamentId"
  );
  const tournamentId = match?.params.tournamentId as string;
  useEffect(() => {
    reloadRegisteredPlayers().then();
  }, [tournamentId]);

  function reloadRegisteredPlayers() {
    return TournamentRegistrationsRestApi()
      .getRegisteredPlayersIds(tournamentId)
      .then((tournamentRegistrations) => {
        setRegisteredPlayersIds(tournamentRegistrations.registeredPlayersIds);
      });
  }

  function onPlayerSearch(searchInput: string) {
    if (searchInput.trim() === "") {
      setFilteredPlayers(availablePlayers ?? []);
    } else {
      setFilteredPlayers(
          (availablePlayers ?? []).filter((player) =>
          `${player.firstName} ${player.lastName} ${player.emailAddress}`.includes(
            searchInput.trim()
          )
        )
      );
    }
  }

  const resetInput = () => {
    UserProfileRestApi()
      .getPlayersProfiles()
      .then((playerProfilesList) => {
        setAvailablePlayers(playerProfilesList.items);
        setFilteredPlayers(playerProfilesList.items);
      });

    if (searchInput && searchInput.current) {
      searchInput.current.value = "";
    }

    setOpenAlert(true);
  };

  const onNotificationClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const registerPlayer = async (playerId: string) => {
    await TournamentRegistrationsRestApi().postPlayersForTournament({
      tournamentId: tournamentId,
      playerId: playerId,
    });
    await reloadRegisteredPlayers();
  };

  //TODO: Add REST API error handling
  const isLoading = availablePlayers === undefined;
  return (
    <RegistrationsCard>
      <CardContent>
        <Centered>
          <Typography component="h6" variant="h6">
            Zapisy na turniej
          </Typography>
          <VerticalSpace height="1rem" />
          {isLoading ? (
            <CircularProgress data-testid="TournamentRegistrationsLoadingIndicator" />
          ) : (
            <>
              <FormControl variant="outlined">
                <InputLabel htmlFor="player-search-input">Zawodnik</InputLabel>
                <OutlinedInput
                  id="player-search-input"
                  inputRef={searchInput}
                  onChange={(event) => onPlayerSearch(event.target.value)}
                  endAdornment={<Search />}
                  labelWidth={70}
                />
              </FormControl>
              <VerticalSpace height="1rem" />
              <PlayersList
                players={filteredPlayers}
                registeredPlayersIds={registeredPlayersIds}
                clearSearchInput={resetInput}
                registerPlayer={registerPlayer}
              />
            </>
          )}

          <Notification
            text="Player profile was created"
            open={openAlert}
            handleClose={onNotificationClose}
          />
        </Centered>
      </CardContent>
    </RegistrationsCard>
  );
};

//TODO: Use something responsive instead of setting card maxWidth/Height (for example Grid from MaterialUI)
const RegistrationsCard = styled(Card)({
  maxWidth: "500px",
  minHeight: "500px",
});
const PlayersList = (props: {
  players: PlayerProfileDto[];
  registeredPlayersIds: string[];
  clearSearchInput: () => void;
  registerPlayer: (playerId: string) => void;
}) => {
  const clearSearchInputAndAddPlayer = (playerId: string) => {
    props.clearSearchInput();
    props.registerPlayer(playerId);
  };

  if (props.players.length === 0) {
    return (
      <PlayerNotFound clearInputAndAddPlayer={clearSearchInputAndAddPlayer} />
    );
  }

  const registerPlayer = (playerId: string) => {
    props.registerPlayer(playerId);
  };
  return (
    <List>
      {props.players.map((player) => {
        const isRegistered: boolean = props.registeredPlayersIds.includes(
          player.playerId
        );
        return (
          <PlayersListItem
            key={player.playerId}
            player={player}
            isRegistered={isRegistered}
            registerPlayer={registerPlayer}
          />
        );
      })}
    </List>
  );
};
const PlayerNotFound = (props: {
  clearInputAndAddPlayer: (playerId: string) => void;
}) => {
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpened(open);
  };

  const playerAdded = (playerId: string) => {
    setDrawerOpened(false);
    props.clearInputAndAddPlayer(playerId);
  };

  return (
    <Centered>
      <Alert severity="info">
        <AlertTitle>Nie znaleziono zawodnika?</AlertTitle>
        Zapisz nowego poniżej.
      </Alert>
      <VerticalSpace height="1rem" />
      <Button variant="contained" color="primary" onClick={toggleDrawer(true)}>
        Dodaj i zapisz
      </Button>
      <Drawer
        anchor={"bottom"}
        open={drawerOpened}
        onClose={toggleDrawer(false)}
      >
        <AddingPlayerForm onPlayerAdded={playerAdded} />
      </Drawer>
    </Centered>
  );
};

const PlayersListItem = (props: {
  player: PlayerProfileDto;
  isRegistered: boolean;
  registerPlayer: (playerId: string) => void;
}) => {
  const registerPlayer = (playerId: string) => {
    props.registerPlayer(playerId);
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <SupervisedUserCircle />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${props.player.firstName} ${props.player.lastName}`}
        secondary={props.player.emailAddress}
      />
      <ListItemSecondaryAction>
        {props.isRegistered ? (
          <CheckCircleIcon color="action" aria-label="registered-player" />
        ) : (
          <IconButton
            edge="end"
            aria-label="register-player"
            onClick={() => registerPlayer(props.player.playerId)}
          >
            <AddCircleOutline />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};
