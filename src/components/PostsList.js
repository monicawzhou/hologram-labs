import Post from "./Post";
import classes from "./PostsList.module.css";

function PostsList({ posts }) {
  // filtering for nfts with thumbnails
  const filtered = posts.filter((post) => {
    if (post.thumbnail) {
      return post;
    }
  });

  return (
    <div>
      <ul className={classes.posts}>
        {filtered.map((post, index) => {
          return (
            <li key={index}>
              <Post id={post.id} name={post.title} thumbnail={post.thumbnail} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PostsList;
