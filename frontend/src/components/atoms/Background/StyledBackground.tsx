import styled from "styled-components";
import { PATH_FOR_IMAGES } from "../constants/paths";

export const StyledBackground = styled("div")({
  backgroundImage: `url("${PATH_FOR_IMAGES}/background.png")`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: -1,
});
