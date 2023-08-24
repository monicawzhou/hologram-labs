import { useLoaderData, Link } from "react-router-dom";

import Modal from "../components/Modal";
import classes from "./PostDetails.module.css";

import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "ZD4dooPVWqoVVBEtXLTBwKMNG6V2VSLH",
  network: Network.ETH_MAINNET
};
const alchemy = new Alchemy(config);

const main = async () => {
  // Get all NFTs
  const nfts = await alchemy.nft.getNftsForOwner(
    "0x5e765C6A318502FF2F6eF0D951e84F8dAE7FA3c9"
  );
  return nfts;
};

function PostDetails() {
  const { post } = useLoaderData();

  if (!post) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to=".." className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <Modal>
      <main className={classes.details}>
        <img className={classes.photo} src={post.media[0].raw} />
        <p className={classes.author}>{post.tokenId}</p>
        <p className={classes.author}>{post.title}</p>
        <p className={classes.text}>{post.description}</p>
      </main>
    </Modal>
  );
}

export default PostDetails;

export async function loader({ params }) {
  console.log(params.id);
  const data = await main();
  let post = data.ownedNfts.find(
    (elem) => elem.contract.address == params.id.toString()
  );
  console.log(post);

  return { post };

  // const response = await fetch("http://localhost:8080/posts/" + params.id);
  // const resData = await response.json();
  // return resData.post; // .post depends on the key that is returned from the backend
  return { author: "Monica", body: "TEST TEST HELLO WILL THIS WORK" };
}
