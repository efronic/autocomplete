import { useCallback, useEffect, useState } from 'react';
import { AutocompleteProps } from '../../types/autocomplete-props';
import { Recipe } from '../../types/recipe-schema';
import debounce from 'lodash.debounce';
import SuggestionsList from './suggestions-list';
import './styles.scss';

export default function Autocomplete(props: AutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (props.caching) {
      // cache the input value
    }
    if (props.onChange) {
      props.onChange(e.target.value);
    }
    if (e.target.value.length > 0) {
      props.fetchSuggestions(e.target.value);
    } else {
      setSuggestions([]);
    }
  };

  const getSuggestions = async (query: string) => {
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
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300),
    []
  );

  useEffect(() => {
    if (inputValue.length > 0) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleSuggestionsClick = (suggestion: Recipe) => {
    const key = props.dataKey;
    setInputValue(
      props.dataKey ? (suggestion[key] as string) : suggestion.name
    );
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
