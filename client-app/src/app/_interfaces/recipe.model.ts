import { Grain } from "./grain.model";
import { Hop } from "./hop.model";
import { Yeast } from "./yeast.model";

export interface Recipe {
    id: string;
    name: string;
    hops: Hop[];
    grains: Grain[];
    instructions: string[];
    yeast: Yeast;
}