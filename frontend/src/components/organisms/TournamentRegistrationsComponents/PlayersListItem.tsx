import { PlayerProfileDto } from "../../../restapi/players-profiles";
import React, { useContext } from "react";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { AddCircleOutline, SupervisedUserCircle } from "@material-ui/icons";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { TournamentRegistrationsContext } from "./Context";

export const PlayersListItem = (props: {
  player: PlayerProfileDto;
  isRegistered: boolean;
}) => {
  const { registerPlayer } = useContext(TournamentRegistrationsContext);

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
