import classes from "./Post.module.css";
import { Link } from "react-router-dom";

function Post({ id, name, thumbnail, text }) {
  return (
    <div className={classes.post}>
      <Link to={id}>
        <img src={thumbnail} />
        <p className={classes.name}>{name}</p>
        <p className={classes.text}>{text}</p>
      </Link>
    </div>
  );
}

export default Post;
