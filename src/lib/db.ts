import PocketBase from "pocketbase";

const pb = new PocketBase("https://movie-list.pockethost.io");
export const pb_url = "https://movie-list.pockethost.io";
export default pb;
export type PB = typeof pb
