import { SuggestionsListProps } from '../../types/suggestionslist-props';

const SuggestionsList = (suggestionsListProps: SuggestionsListProps) => {
  const highlight = suggestionsListProps.highlight;
  const suggestions = suggestionsListProps.suggestions;
  const dataKey = suggestionsListProps.dataKey;
  console.log('efron suggestionsListProps', suggestionsListProps);
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
  return suggestions.map((suggestion, index) => {
    const currSuggestion = dataKey
      ? (suggestion[dataKey] as string)
      : suggestion.name;
    return (
      <li
        key={index}
        onClick={() => suggestionsListProps.onSuggestionClick(suggestion)}
        className="suggestion-item"
        id={`suggestion-${index}`}
      >
        {getHighlightedText(currSuggestion, highlight)}
      </li>
    );
  });
};
export default SuggestionsList;
