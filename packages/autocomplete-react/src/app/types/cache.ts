import { Recipe } from './recipe-schema';

export type AutocompleteCache = {
    [key: string]: Recipe[];
};