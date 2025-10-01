import type { Coach, Session, Review } from "../../models/Coach";

let hardCodedCoaches: Coach[] = [];
let hardCodedSessions: Session[] = [];
let hardCodedReviews: Review[] = [];

if (process.env.REACT_APP_USE_POC === "true") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
  const mocks = require("./mockData") as typeof import("./mockData");
  hardCodedCoaches = mocks.hardCodedCoaches;
  hardCodedSessions = mocks.hardCodedSessions;
  hardCodedReviews = mocks.hardCodedReviews;
}

export { hardCodedCoaches, hardCodedSessions, hardCodedReviews };
