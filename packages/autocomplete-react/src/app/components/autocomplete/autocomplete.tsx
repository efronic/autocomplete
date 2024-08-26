import { useCallback, useEffect, useState } from 'react';
import { AutocompleteProps } from '../../types/autocomplete-props';
import { Recipe } from '../../types/recipe-schema';
// import debounce from 'lodash.debounce';
import SuggestionsList from './suggestions-list';
import './styles.scss';
import useDebounce from '../../hooks/useDebounce';

export default function Autocomplete(props: AutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSelectedSuggestion, setIsSelectedSuggestion] = useState(false);

  const debouncedInputValue = useDebounce(inputValue, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    console.log('efron handleInputChange', inputValue,newValue,isSelectedSuggestion);
    if (props.caching) {
      // cache the input value
    }
    if (props.onChange) {
      props.onChange(newValue);
    }
    if (isSelectedSuggestion) {
      console.log('efron isSelectedValue', newValue);
      setIsSelectedSuggestion(false);
      return;
    }
    if (newValue.length > 0) {
      props.fetchSuggestions(newValue);
    } else {
      setSuggestions([]);
    }
  };

  const getSuggestions = useCallback(async (query: string) => {
    setError(false);
    setLoading(true);
    try {
      let result;
      if (props.staticData) {
        result = props.staticData.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });
      } else {
        result = await props.fetchSuggestions(query);
      }
      // setCache(query, result);
      setSuggestions(result);
    } catch (error) {
      setError(true);
      setLoading(false);
      setIsSelectedSuggestion(false);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, [props]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (debouncedInputValue.length > 0 && !isSelectedSuggestion) {
      console.log('efron useEffect', debouncedInputValue);
      getSuggestions(debouncedInputValue);
    }
    else {
      setSuggestions([]);
    }
  }, [debouncedInputValue, getSuggestions, isSelectedSuggestion]);



  // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleSuggestionsClick = (suggestion: Recipe) => {
    const key = props.dataKey;
    const selectedValue = props.dataKey ? suggestion[key] : suggestion.name;
    setIsSelectedSuggestion(true);
    setInputValue(selectedValue);
    console.log('efron handleSuggestionsClick', selectedValue,isSelectedSuggestion,inputValue);
    setSuggestions([]);
    props.onSelect(suggestion.name);
  };

  return (
    <div className="container">
      <input
        type={props.placeholder.type}
        value={inputValue}
        placeholder={props.placeholder.description}
        required={props.placeholder.required}
        style={props.customStyles}
        onChange={handleInputChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
      {(suggestions.length > 0 || loading || error) && (
        <ul
          className="suggestions-list"
          role="listbox"
          aria-label="Suggestion List"
        >
          {loading && (
            <li className="suggestion-item" id="suggestion-loading">
              {props.customLoader}
            </li>
          )}
          {error && (
            <li className="suggestion-item" id="suggestion-error">
              Something went wrong {error}
            </li>
          )}
          <SuggestionsList
            suggestions={suggestions}
            highlight={inputValue}
            dataKey={props.dataKey}
            onSuggestionClick={handleSuggestionsClick}
          />
        </ul>
      )}
    </div>
  );
}
