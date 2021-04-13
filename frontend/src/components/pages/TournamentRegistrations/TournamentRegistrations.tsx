import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Avatar,
  Button,
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
import { TournamentRegistrationsRestApi } from "../../../restapi/tournament-registrations";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Notification from "../../organisms/Notification/Notification";
import useStyles from "./styles";
import { TopNavBar } from "../../organisms/TournamentRegistrationsComponents/TopNavBar";
import { CreatePlayerProfileDrawer } from "../../organisms/TournamentRegistrationsComponents/CreatePlayerProfileDrawer";

export type TournamentRegistrationsProps = {
  readonly tournamentId: string;
};

export const openPlayerProfileForm = {
  openForm: false,
  toggleOpenFormState: () => {},
  refreshInputAndList: () => {},
};

export const FormContext = createContext(openPlayerProfileForm);

export const TournamentRegistrations = (
  props: TournamentRegistrationsProps
) => {
  const searchInput = useRef<HTMLInputElement>(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [availablePlayers, setAvailablePlayers] = useState<
    PlayerProfileDto[] | undefined
  >(undefined);
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerProfileDto[]>(
    []
  );
  const [registeredPlayersIds, setRegisteredPlayersIds] = useState<string[]>(
    []
  );
  const [openForm, setOpenForm] = useState(openPlayerProfileForm.openForm);
  const toggleOpenFormState = () => {
    setOpenForm((prevValue) => !prevValue);
  };
  const refreshInputAndList = () => {
    refreshPlayersAndResetInput();
  };

  useEffect(() => {
    UserProfileRestApi()
      .getPlayersProfiles()
      .then((playerProfilesList) => {
        setAvailablePlayers(playerProfilesList.items);
        setFilteredPlayers(playerProfilesList.items);
      });
  }, []);

  useEffect(() => {
    reloadRegisteredPlayers().then();
  }, [props.tournamentId]);

  function reloadRegisteredPlayers() {
    return TournamentRegistrationsRestApi()
      .getRegisteredPlayersIds(props.tournamentId)
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

  const refreshPlayersAndResetInput = () => {
    UserProfileRestApi()
      .getPlayersProfiles()
      .then((playerProfilesList) => {
        setAvailablePlayers(playerProfilesList.items);
        setFilteredPlayers(playerProfilesList.items);
      });

    TournamentRegistrationsRestApi()
      .getRegisteredPlayersIds(props.tournamentId)
      .then((tournamentRegistrations) => {
        setRegisteredPlayersIds(tournamentRegistrations.registeredPlayersIds);
      });

    if (searchInput && searchInput.current) {
      searchInput.current.value = "";
    }
  };

  const onNotificationOpen = (name: string = "", surname: string = "") => {
    name && surname
      ? setTextAlert(
          `Pomyślnie utworzono konto ${name} ${surname} oraz zapisano na turniej`
        )
      : setTextAlert("Pomyślnie zapisano zawodniczkę / zawodnika na turniej");
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
      tournamentId: props.tournamentId,
      playerId: playerId,
    });
    await reloadRegisteredPlayers();

    onNotificationOpen();
  };

  //TODO: Add REST API error handling
  const isLoading = availablePlayers === undefined;
  const classes = useStyles();
  return (
    <FormContext.Provider
      value={{ openForm, toggleOpenFormState, refreshInputAndList }}
    >
      <Card className={classes.root}>
        <CardContent>
          <Centered>
            <TopNavBar />
            <VerticalSpace height="1rem" />
            {isLoading ? (
              <CircularProgress data-testid="TournamentRegistrationsLoadingIndicator" />
            ) : (
              <>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="player-search-input">
                    Zawodnik
                  </InputLabel>
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
                  refreshPlayersAndResetInput={refreshPlayersAndResetInput}
                  registerPlayer={registerPlayer}
                  tournamentId={props.tournamentId}
                  notification={onNotificationOpen}
                />
              </>
            )}

            <Notification
              text={textAlert}
              open={openAlert}
              handleClose={onNotificationClose}
            />

            <CreatePlayerProfileDrawer
              clearInputCreateAndRegisterPlayer={onNotificationOpen}
              tournamentId={props.tournamentId}
            />
          </Centered>
        </CardContent>
      </Card>
    </FormContext.Provider>
  );
};

// const TopNavBar = () => {
//   const [openDrawer, setOpenDrawer] = useState(false);
//
//   return (
//     <>
//       <Box display="flex" alignItems="center" width="100%">
//         <Box>
//           <ArrowBackIosIcon />
//         </Box>
//         <Box flexGrow={1} textAlign="center">
//           <Typography component="h6" variant="h6">
//             Zapisy na turniej
//           </Typography>
//         </Box>
//         <Box>
//           <IconButton
//             style={{ padding: 0 }}
//             onClick={() => setOpenDrawer(true)}
//           >
//             <MenuIcon />
//           </IconButton>
//         </Box>
//       </Box>
//       <TournamentRegistrationsActionDrawer
//         openDrawer={openDrawer}
//         returnToPrevState={setOpenDrawer}
//       />
//     </>
//   );
// };

// const TournamentRegistrationsDrawer = (props: {
//   openDrawer: boolean;
//   returnToPrevState: (prevState: boolean) => void;
// }) => {
//   const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
//   const { toggleOpenFormState } = useContext(FormContext);
//
//   useEffect(() => {
//     setDrawerOpened(props.openDrawer);
//
//     return () => {
//       setDrawerOpened(false);
//     };
//   }, [props.openDrawer]);
//
//   function toggleDrawer(open: boolean) {
//     props.returnToPrevState(false);
//     setDrawerOpened(open);
//   }
//
//   return (
//     <Drawer
//       anchor={"bottom"}
//       open={drawerOpened}
//       onClose={() => toggleDrawer(false)}
//     >
//       <Grid container direction={"column"} justify="center" alignItems="center">
//         <VerticalSpace height="30px" />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => {
//             toggleOpenFormState();
//             toggleDrawer(false);
//           }}
//         >
//           Dodaj i zapisz zawdonika
//         </Button>
//         <VerticalSpace height="20px" />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => console.log("second button")}
//         >
//           Zakończ zapisy na turniej
//         </Button>
//         <VerticalSpace height="30px" />
//       </Grid>
//     </Drawer>
//   );
// };

// const CreatePlayerProfileDrawer = (props: {
//   clearInputCreateAndRegisterPlayer: (name: string, surname: string) => void;
//   tournamentId: string;
// }) => {
//   const { openForm, toggleOpenFormState } = useContext(FormContext);
//   const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
//
//   useEffect(() => {
//     if (openForm) {
//       setDrawerOpened(true);
//       toggleOpenFormState();
//     }
//   }, [openForm]);
//
//   const toggleDrawer = (open: boolean) => () => {
//     setDrawerOpened(open);
//   };
//
//   const onPlayerProfileCreated = (name: string, surname: string) => {
//     setDrawerOpened(false);
//     props.clearInputCreateAndRegisterPlayer(name, surname);
//   };
//
//   return (
//     <Drawer anchor={"bottom"} open={drawerOpened} onClose={toggleDrawer(false)}>
//       <CreatePlayerProfileForm
//         onPlayerProfileCreated={onPlayerProfileCreated}
//         tournamentId={props.tournamentId}
//       />
//     </Drawer>
//   );
// };

const PlayersList = (props: {
  players: PlayerProfileDto[];
  registeredPlayersIds: string[];
  refreshPlayersAndResetInput: () => void;
  registerPlayer: (playerId: string, name?: string, surname?: string) => void;
  notification: (name: string, surname: string) => void;
  tournamentId: string;
}) => {
  const clearInputCreateAndRegisterPlayer = (name: string, surname: string) => {
    props.refreshPlayersAndResetInput();
    props.notification(name, surname);
  };

  if (props.players.length === 0) {
    return (
      <PlayerNotFound
        clearInputCreateAndRegisterPlayer={clearInputCreateAndRegisterPlayer}
        tournamentId={props.tournamentId}
      />
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
  clearInputCreateAndRegisterPlayer: (name: string, surname: string) => void;
  tournamentId: string;
}) => {
  // const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const { toggleOpenFormState } = useContext(FormContext);

  // const toggleDrawer = (open: boolean) => () => {
  //   setDrawerOpened(open);
  // };
  //
  // const onPlayerProfileCreated = (name: string, surname: string) => {
  //   setDrawerOpened(false);
  //   props.clearInputCreateAndRegisterPlayer(name, surname);
  // };

  return (
    <Centered>
      <Alert severity="info">
        <AlertTitle>Nie znaleziono zawodnika?</AlertTitle>
        Zapisz nowego poniżej.
      </Alert>
      <VerticalSpace height="1rem" />
      <Button
        variant="contained"
        color="primary"
        onClick={() => toggleOpenFormState()}
      >
        Dodaj i zapisz
      </Button>
      {/*<OpenDrawer*/}
      {/*  clearInputCreateAndRegisterPlayer={onPlayerProfileCreated}*/}
      {/*  tournamentId={props.tournamentId}*/}
      {/*/>*/}
      {/*<Drawer*/}
      {/*  anchor={"bottom"}*/}
      {/*  open={drawerOpened}*/}
      {/*  onClose={toggleDrawer(false)}*/}
      {/*>*/}
      {/*  <CreatePlayerProfileForm*/}
      {/*    onPlayerProfileCreated={onPlayerProfileCreated}*/}
      {/*    tournamentId={props.tournamentId}*/}
      {/*  />*/}
      {/*</Drawer>*/}
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
          <CheckCircleIcon
            color="action"
            aria-label="registered-player"
            data-testid="registered-player"
          />
        ) : (
          <IconButton
            edge="end"
            aria-label="register-player"
            data-testid="register-player"
            onClick={() => registerPlayer(props.player.playerId)}
          >
            <AddCircleOutline />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};
