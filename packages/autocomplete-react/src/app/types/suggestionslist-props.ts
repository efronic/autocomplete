import { Recipe } from './recipe-schema';

export type SuggestionsListProps = {
  suggestions: Recipe[];
  highlight: string;
  dataKey: keyof Recipe;
  onSuggestionClick: (value: Recipe) => void;
};
