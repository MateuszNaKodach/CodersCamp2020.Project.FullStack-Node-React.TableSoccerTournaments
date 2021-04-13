import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import {
  PlayerProfileDto,
  UserProfileRestApi,
} from "../../../restapi/players-profiles";
import { Centered } from "../../atoms/Shared/Centered";
import { VerticalSpace } from "../../atoms/Shared/VerticalSpace";
import { TournamentRegistrationsRestApi } from "../../../restapi/tournament-registrations";
import Notification from "../../organisms/Notification/Notification";
import useStyles from "./styles";
import { TopNavBar } from "../../organisms/TournamentRegistrationsComponents/TopNavBar";
import { CreatePlayerProfileDrawer } from "../../organisms/TournamentRegistrationsComponents/CreatePlayerProfileDrawer";
import { PlayersList } from "../../organisms/TournamentRegistrationsComponents/PlayersList";
import {
  TournamentRegistrationsContext,
  tournamentRegistrationsContext,
} from "../../organisms/TournamentRegistrationsComponents/Context";

export type TournamentRegistrationsProps = {
  readonly tournamentId: string;
};

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

  const [
    openCreatePlayerProfileForm,
    setOpenCreatePlayerProfileForm,
  ] = useState(tournamentRegistrationsContext.openCreatePlayerProfileForm);
  const toggleOpenFormState = () => {
    setOpenCreatePlayerProfileForm((prevValue) => !prevValue);
  };
  const onPlayerProfileCreated = (name: string, surname: string) => {
    onNotificationOpen(name, surname);
    refreshPlayersAndResetSearchingInput();
  };
  const registerPlayer = async (playerId: string) => {
    await TournamentRegistrationsRestApi().postPlayersForTournament({
      tournamentId: props.tournamentId,
      playerId: playerId,
    });
    await reloadRegisteredPlayers();

    onNotificationOpen();
  };

  useEffect(() => {
    getPlayersProfiles().then();
  }, []);

  useEffect(() => {
    reloadRegisteredPlayers().then();
  }, [props.tournamentId]);

  function getPlayersProfiles() {
    return UserProfileRestApi()
      .getPlayersProfiles()
      .then((playerProfilesList) => {
        setAvailablePlayers(playerProfilesList.items);
        setFilteredPlayers(playerProfilesList.items);
      });
  }

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

  const refreshPlayersAndResetSearchingInput = () => {
    getPlayersProfiles().then();
    reloadRegisteredPlayers().then();

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

  //TODO: Add REST API error handling
  const isLoading = availablePlayers === undefined;
  const classes = useStyles();
  return (
    <TournamentRegistrationsContext.Provider
      value={{
        openCreatePlayerProfileForm,
        toggleOpenFormState,
        onPlayerProfileCreated,
        registerPlayer,
      }}
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
                />
              </>
            )}

            <Notification
              text={textAlert}
              open={openAlert}
              handleClose={onNotificationClose}
            />
            <CreatePlayerProfileDrawer tournamentId={props.tournamentId} />
          </Centered>
        </CardContent>
      </Card>
    </TournamentRegistrationsContext.Provider>
  );
};
