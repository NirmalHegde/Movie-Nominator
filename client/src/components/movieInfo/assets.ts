import IModalAssets from "../../models/interfaces/ModalAssets";
import imdb from "./assets/imdb.png";
import meta from "./assets/metacritic.png";
import rt from "./assets/rt.png";
import g from "./assets/g.png";
import pg from "./assets/pg.png";
import pg13 from "./assets/pg13.png";
import r from "./assets/r.png";
import nc17 from "./assets/nc17.png";
import tv14 from "./assets/tv14.png";

const assets: IModalAssets = {
  "Internet Movie Database": imdb,
  Metacritic: meta,
  "Rotten Tomatoes": rt,
  G: g,
  PG: pg,
  "PG-13": pg13,
  R: r,
  "NC-17": nc17,
  "TV-14": tv14,
};

export default assets;
