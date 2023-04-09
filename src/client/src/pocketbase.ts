import PocketBase from "pocketbase";
import { pocketbase } from "../../endpoints";

const pb = new PocketBase(pocketbase);

pb.autoCancellation(false);

export default pb;
