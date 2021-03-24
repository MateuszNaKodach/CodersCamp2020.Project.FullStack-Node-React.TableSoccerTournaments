import styled from "styled-components";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CircularProgress,
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

export type TournamentRegistrationsProps = {
  readonly tournamentId: string;
};

export const TournamentRegistrations = (
  props: TournamentRegistrationsProps
) => {
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
export const PlayersList = (props: PlayersListProps) => (
  <List>
    {props.players.map((player) => (
      <PlayersListItem key={player.playerId} player={player} />
    ))}
  </List>
);

type PlayersListItemProps = { player: PlayerProfileDto };
export const PlayersListItem = (props: PlayersListItemProps) => (
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
