import { useCallback, useEffect, useState } from 'react';
import { SuggestionsListProps } from '../../types/suggestionslist-props';

const SuggestionsList = (suggestionsListProps: SuggestionsListProps) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const highlight = suggestionsListProps.highlight;
  const suggestions = suggestionsListProps.suggestions;
  const dataKey = suggestionsListProps.dataKey;

  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) => (
          <span
            key={index}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { fontWeight: 'bold' }
                : {}
            }
          >
            {part}
          </span>
        ))}
      </span>
    );
  };
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter' && highlightedIndex !== null) {
      suggestionsListProps.onSuggestionClick(suggestions[0]);
    } else if (event.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
      );
    } else if (event.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
      );
    }
  }, [highlightedIndex, suggestions, suggestionsListProps])
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [highlightedIndex, suggestions,handleKeyDown]);
  
  return suggestions.map((suggestion, index) => {
    const currSuggestion = dataKey
      ? (suggestion[dataKey] as string)
      : suggestion.name;
    return (
      <li
        key={index}
        onClick={() => suggestionsListProps.onSuggestionClick(suggestion)}
        className={`suggestion-item ${index === highlightedIndex ? 'highlighted' : ''}`}
        id={`suggestion-${index}`}
      >
        {getHighlightedText(currSuggestion, highlight)}
      </li>
    );
  });
};
export default SuggestionsList;
