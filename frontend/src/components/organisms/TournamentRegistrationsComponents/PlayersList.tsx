import { PlayerProfileDto } from "../../../restapi/players-profiles";
import { List } from "@material-ui/core";
import React from "react";
import { PlayerNotFound } from "./PlayerNotFound";
import { PlayersListItem } from "./PlayersListItem";

export const PlayersList = (props: {
  players: PlayerProfileDto[];
  registeredPlayersIds: string[];
}) => {
  if (props.players.length === 0) {
    return <PlayerNotFound />;
  }

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
          />
        );
      })}
    </List>
  );
};
