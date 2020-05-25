import { IFunction } from "../interfaces";
import { pubsub } from "./pubsub";

const baseArray: IFunction[] = [];

export const triggers = baseArray.concat(pubsub);
