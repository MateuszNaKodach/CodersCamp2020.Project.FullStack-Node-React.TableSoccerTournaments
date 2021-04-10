import React from 'react';
import {PATH_FOR_PLAYERS_PROFILES_VIEW, PATH_FOR_TOURNAMENTS_SELECTION_VIEW} from "../../atoms/constants/routerPaths";
import {VerticalSpace} from "../../atoms/Shared/VerticalSpace";
import {Menu} from "../../templates/Menu";
import {APP_NAME} from "../../atoms/constants/names";

const homeMenuButtonsListProps = [
    {
        textName: "Turniej",
        onClick: () => {
            console.log("Menu button was clicked!")
        },
        onLink: PATH_FOR_TOURNAMENTS_SELECTION_VIEW
    },
    {
        textName: "Zawodnicy",
        onClick: () => {
            console.log("Menu button was clicked!")
        },
        onLink: PATH_FOR_PLAYERS_PROFILES_VIEW
    }
];

export const HomeMenu = () => (
    <>
        <VerticalSpace height="1rem"/>
        <Menu title={APP_NAME} menuButtonsList={homeMenuButtonsListProps}/>
        <VerticalSpace height="1rem"/>
    </>
);