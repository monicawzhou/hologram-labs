import { MdPostAdd, MdMessage } from "react-icons/md";
import { Link } from "react-router-dom";

import classes from "./MainHeader.module.css";

function MainHeader() {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>Hologram Labs NFTs</h1>
      <p>
        <Link to="/connect-wallet" className={classes.button}>
          Connect Wallet
        </Link>
      </p>
    </header>
  );
}

export default MainHeader;
