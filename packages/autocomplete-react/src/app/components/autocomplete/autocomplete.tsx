import { AutocompleteProps } from '../../types/autocomplete-props';


export default function Autocomplete(props: AutocompleteProps) {
  return (
    <div>autocomplete {props.placeholder.description} </div>
  )
}