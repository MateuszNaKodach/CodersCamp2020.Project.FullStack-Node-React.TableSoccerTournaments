import styled from "styled-components";
import {Card} from "@material-ui/core";
import {MIN_CARD_COMPONENT_WIDTH} from "../constants/sizes";

export const StyledCard = styled(Card)({
   display: "block",
   boxSizing: "border-box",
   minWidth: MIN_CARD_COMPONENT_WIDTH,
   width: MIN_CARD_COMPONENT_WIDTH,
   paddingTop: "40px",
   paddingBottom: "40px",
   margin: "2px",
});