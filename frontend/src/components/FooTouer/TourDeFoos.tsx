import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  createMuiTheme,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  MuiThemeProvider,
  OutlinedInput,
  Typography
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import {
  AddCircleOutline,
  Search,
  SupervisedUserCircle
} from "@material-ui/icons";
import styled from "styled-components";
import axios from "axios";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[800],
      contrastText: "#E3E152",
    },
  },
});

const MainMenuCard = styled(Card)({
  maxWidth: "500px",
  minHeight: "500px",
});

interface PlayerProps {
  readonly playerId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly emailAddress: string;
}

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Divider = (props: { height: string | number }) => (
  <div style={{ minHeight: props.height }} />
);

interface TournamentRegistrationsProps {
  readonly tournamentId: string;
}

const TournamentRegistrations = (props: TournamentRegistrationsProps) => {
  const [initPlayers, setInitPlayers] = useState<PlayerProps[]>([]);
  const [players, setPlayers] = useState<PlayerProps[]>([]);
  const [registeredPlayers, setRegisteredPlayers] = useState<
    { playerId: string }[]
  >([]);

  useEffect(() => {
    axios
      .get<{ items: PlayerProps[] }>(
        "http://localhost:5000/rest-api/players-profiles"
      )
      .then((r) => {
        const players = r.data.items;
        setInitPlayers(players);
        setPlayers(players);
      });
  }, []);

  function onPlayerSearch(searchInput: string) {
    if (searchInput.trim() === "") {
      setPlayers(initPlayers);
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

  return (
    <MainMenuCard>
      <CardContent>
        <Centered>
          <Typography component="h6" variant="h6">
            Zapisy na turniej
          </Typography>
          <Divider height="1rem" />
          <FormControl variant="outlined">
            <InputLabel htmlFor="player-search-input">Zawodnik</InputLabel>
            <OutlinedInput
              id="player-search-input"
              onChange={(event) => onPlayerSearch(event.target.value)}
              endAdornment={<Search />}
              labelWidth={70}
            />
          </FormControl>
          <Divider height="1rem" />
        </Centered>
        <PlayersList players={players} />
      </CardContent>
    </MainMenuCard>
  );
};

const PlayersList = (props: { players: PlayerProps[] }) => (
  <List>
    {props.players.map((player) => (
      <Player key={player.playerId} player={player} />
    ))}
  </List>
);

const Player = (props: { player: PlayerProps }) => (
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
        aria-label="delete"
        onClick={() => console.log("Register player clicked!")}
      >
        <AddCircleOutline />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

function TourDeFoos() {
  return (
    <MuiThemeProvider theme={theme}>
      <Centered>
        <TournamentRegistrations tournamentId="sampleTournamentId" />
      </Centered>
      <Button variant="contained" color="primary">
        Primary
      </Button>
    </MuiThemeProvider>
  );
}

export default TourDeFoos;
