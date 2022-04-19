import { Grain } from "./grain.model";
import { Hop } from "./hop.model";
import { Yeast } from "./yeast.model";

export interface Recipe {
    _id: any;
    name: string;
    description: string;
    hops: Hop[];
    grains: Grain[];
    instructions: string[];
    yeast: Yeast;
    created_by: any;
    favorites: number;
}