import styled from "styled-components";
import React, { useEffect, useState } from "react";
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
} from "../../restapi/players-profiles";
import { Centered } from "../Shared/Centered";
import { VerticalSpace } from "../Shared/VerticalSpace";
import AddingPlayerForm from "../AddingPlayerForm/AddingPlayerForm";
import { useRouteMatch } from "react-router-dom";

export type TournamentRegistrationsProps = {
  readonly tournamentId: string;
};

export const TournamentRegistrations = () => {
  const [initPlayers, setInitPlayers] = useState<
    PlayerProfileDto[] | undefined
  >(undefined);
  const [players, setPlayers] = useState<PlayerProfileDto[]>([]);
  const [registeredPlayers, setRegisteredPlayers] = useState<
    { playerId: string }[]
  >([]); //TODO: Fetch already registered players

  useEffect(() => {
    UserProfileRestApi()
      .getPlayersProfiles()
      .then((playerProfilesList) => {
        setInitPlayers(playerProfilesList.items);
        setPlayers(playerProfilesList.items);
      });
  }, []);

  interface MatchParams {
    tournamentId: string;
  }
  const match = useRouteMatch<MatchParams>(
    "/tournament-registration/:tournamentId"
  );
  const touranmentId = match?.params.tournamentId;

  function onPlayerSearch(searchInput: string) {
    if (searchInput.trim() === "") {
      setPlayers(initPlayers ?? []);
    } else {
      setPlayers(
        players.filter((player) =>
          `${player.firstName} ${player.lastName} ${player.emailAddress}`.includes(
            searchInput.trim()
          )
        )
      );
    }
  }

  //TODO: Add REST API error handling
  const isLoading = initPlayers === undefined;
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
                  onChange={(event) => onPlayerSearch(event.target.value)}
                  endAdornment={<Search />}
                  labelWidth={70}
                />
              </FormControl>
              <VerticalSpace height="1rem" />
              <PlayersList players={players} />
            </>
          )}
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

type PlayersListProps = { players: PlayerProfileDto[] };
const PlayersList = (props: PlayersListProps) => {
  if (props.players.length === 0) {
    return <PlayerNotFound />;
  }
  return (
    <List>
      {props.players.map((player) => (
        <PlayersListItem key={player.playerId} player={player} />
      ))}
    </List>
  );
};

const PlayerNotFound = () => {
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpened(open);
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
        <AddingPlayerForm
          key={"Adding player form"}
          title={"Nowy zawodnik"}
          inputs={["Imię", "Nazwisko", "Adres e-mail", "Numer telefonu"]}
        />
      </Drawer>
    </Centered>
  );
};

type PlayersListItemProps = { player: PlayerProfileDto };
const PlayersListItem = (props: PlayersListItemProps) => (
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
      <IconButton
        edge="end"
        aria-label="register-player"
        onClick={() => console.log("Register player clicked!")}
      >
        <AddCircleOutline />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);
