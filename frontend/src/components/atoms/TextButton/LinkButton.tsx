import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

type TextButtonProps = {
  readonly text: string;
  readonly onLink: string;
};

const LinkButton = ({ text, onLink }: TextButtonProps) => {
  return (
    <Link to={onLink} style={{ textDecoration: "none" }}>
      <Button color="primary" size="large" style={{ fontWeight: 600 }}>
        {text}
      </Button>
    </Link>
  );
};

export default LinkButton;
