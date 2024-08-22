import { useState } from 'react';
import { AutocompleteProps } from '../../types/autocomplete-props';


export default function Autocomplete(props: AutocompleteProps) {
  const [inputValue, setInputValue] = useState();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  
  
  return (
    <div className='container'>
      <input
        type={props.placeholder.type}
        value={inputValue}
        placeholder={props.placeholder.description}
        required={props.placeholder.required} />
        
    </div>
  )
}