import React from "react";
import { Menu } from "../../templates/Menu";
import {PATH_FOR_PLAYERS_PROFILES_VIEW, PATH_FOR_TOURNAMENTS_SELECTION_VIEW} from "../../atoms/constants/routerPaths";
import {APP_NAME} from "../../atoms/constants/names";

const homeMenuButtonsListProps = [
  {
    textName: "Turnieje",
    onClick: () => {
      console.log("Menu button was clicked!");
    },
    onLink: PATH_FOR_TOURNAMENTS_SELECTION_VIEW,
  },
  {
    textName: "Zawodnicy",
    onClick: () => {
      console.log("Menu button was clicked!");
    },
    onLink: PATH_FOR_PLAYERS_PROFILES_VIEW,
  },
];

export const HomeMenu = () => (
  <>
    <Menu title={APP_NAME} menuButtonsList={homeMenuButtonsListProps} />
  </>
);
