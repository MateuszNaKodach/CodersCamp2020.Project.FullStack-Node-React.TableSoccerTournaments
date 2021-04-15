import CardTitleWithNavButton from "../../molecules/CardTitleWithNavButton/CardTitleWithNavButton";
import TournamentCardsGallery from "../../organisms/TournamentsCardsGallery/TournamentsCardsGallery";
import NewTournamentButton from "../../molecules/NewTournamentButton/NewTournamentButton";
import { styled } from "@material-ui/core";
import { CreateTournamentForm } from "../../organisms/CreateTournamentForm/CreateTournamentForm";
import React, { useState } from "react";
import { VerticalSpace } from "../../atoms/VerticalSpace";

const StyledWrapper = styled("div")({
  position: "relative",
});

const TournamentsList = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [reloadData, setReloadData] = useState(false);

  return (
    <StyledWrapper>
      <CardTitleWithNavButton title="Turnieje" />
      <VerticalSpace height={30} />
      <TournamentCardsGallery
        shouldReload={reloadData}
        openForm={setOpenDrawer}
      />
      <VerticalSpace height={30} />
      <NewTournamentButton openForm={setOpenDrawer} />
      <CreateTournamentForm
        openDrawer={openDrawer}
        returnToPrevState={setOpenDrawer}
        reloadData={() => setReloadData(!reloadData)}
      />
    </StyledWrapper>
  );
};

export default TournamentsList;
