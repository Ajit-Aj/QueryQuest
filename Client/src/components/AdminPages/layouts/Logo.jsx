import LogoDark from "../../../assets/images/logos/Logo_blue.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/admin">
      <img src={LogoDark} alt="Logo" />
    </Link>
  );
};

export default Logo;
