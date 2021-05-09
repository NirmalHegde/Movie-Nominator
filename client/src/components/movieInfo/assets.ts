import IModalAssets from "../../models/interfaces/ModalAssets";
import imdb from "./assets/imdb.png";
import meta from "./assets/metacritic.png";
import rt from "./assets/rt.png";
import g from "./assets/g.png";
import pg from "./assets/pg.png";
import pg13 from "./assets/pg13.png";
import r from "./assets/r.png";
import nc17 from "./assets/nc17.png";
import tvy from "./assets/tvy.png";
import tvy7 from "./assets/tvy7.png";
import tvy7fv from "./assets/tvy7fv.png";
import tvg from "./assets/tvg.png";
import tvpg from "./assets/tvpg.png";
import tv14 from "./assets/tv14.png";
import tvma from "./assets/tvma.png";

// mapping for assets in movieInfo
const assets: IModalAssets = {
  "Internet Movie Database": imdb,
  Metacritic: meta,
  "Rotten Tomatoes": rt,
  G: g,
  PG: pg,
  "PG-13": pg13,
  R: r,
  "NC-17": nc17,
  "TV-Y": tvy,
  "TV-Y7": tvy7,
  "TV-Y7-FV": tvy7fv,
  "TV-G": tvg,
  "TV-PG": tvpg,
  "TV-14": tv14,
  "TV-MA": tvma,
};

export default assets;
