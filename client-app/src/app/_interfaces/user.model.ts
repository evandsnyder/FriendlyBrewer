import {Recipe } from './recipe.model';
 
export interface User{
    _id: any;
    first_name: string;
    last_name: string;
    email: string;
    recipes: Recipe[];
    favorites: Recipe[];
};