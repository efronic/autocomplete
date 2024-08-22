import { Recipe } from './recipe-schema';

export type AutocompleteProps = {

    placeholder: {
        type: string,
        required: false,
        description: string,
    },
    fetchSuggestions: (query: string) => Promise<Recipe[]>,
    dataKey: keyof Recipe,
    customLoader?: React.ReactNode,
    onSelect: (value: string) => void,
    caching: boolean,
    onBlur?: () => void,
    onFocus?: () => void,
    onChange?: (value: string) => void,
    customStyles?: object,
    staticData?: Recipe[],
};