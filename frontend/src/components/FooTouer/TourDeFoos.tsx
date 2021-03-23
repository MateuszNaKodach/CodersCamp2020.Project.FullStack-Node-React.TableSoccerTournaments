import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  createMuiTheme,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  MuiThemeProvider,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Add, Search, SupervisedUserCircle } from "@material-ui/icons";
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

const TournamentRegistrations = () => {
  const defaultPlayers: PlayerProps[] = [
    {
      playerId: "1",
      firstName: "Jan",
      lastName: "Kowalski",
      emailAddress: "jan.kowalski@foo.com",
    },
    {
      playerId: "2",
      firstName: "Janina",
      lastName: "Kowalska",
      emailAddress: "janina.kowalski@foo.com",
    },
    {
      playerId: "2",
      firstName: "Janina",
      lastName: "Kowalska",
      emailAddress: "janina.kowalski@foo.com",
    },
    {
      playerId: "2",
      firstName: "Janina",
      lastName: "Kowalska",
      emailAddress: "janina.kowalski@foo.com",
    },
    {
      playerId: "2",
      firstName: "Janina",
      lastName: "Kowalska",
      emailAddress: "janina.kowalski@foo.com",
    },
    {
      playerId: "2",
      firstName: "Janina",
      lastName: "Kowalska",
      emailAddress: "janina.kowalski@foo.com",
    },
    {
      playerId: "2",
      firstName: "Janina",
      lastName: "Kowalska",
      emailAddress: "janina.kowalski@foo.com",
    },
  ];
  const [players, setPlayers] = useState(defaultPlayers);

  useEffect(() => {
    axios
      .get<{ items: PlayerProps[] }>(
        "http://localhost:5000/rest-api/players-profiles"
      )
      .then((r) => setPlayers(r.data.items));
  }, []);

  function onPlayerSearch(searchInput: string) {
    if (searchInput.trim() === "") {
      setPlayers(defaultPlayers);
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
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Zawodnik
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              onChange={(event) => onPlayerSearch(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </Centered>
        <PlayersList players={players} />
      </CardContent>
    </MainMenuCard>
  );
};

const PlayersList = (props: { players: PlayerProps[] }) => (
  <List>
    {props.players.map((player) => (
      <Player player={player} />
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
      <IconButton edge="end" aria-label="delete">
        <Add />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

function TourDeFoos() {
  return (
    <MuiThemeProvider theme={theme}>
      <TournamentRegistrations />
      <Button variant="contained" color="primary">
        Primary
      </Button>
    </MuiThemeProvider>
  );
}

export default TourDeFoos;
