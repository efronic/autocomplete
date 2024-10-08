import Autocomplete from './components/autocomplete/autocomplete';
import { validateResponse, Recipe } from './types/recipe-schema';

const staticData = [
  'apple',
  'banana',
  'berrl',
  'orange',
  'grape',
  'mango',
  'melon',
  'berry',
  'peach',
  'cherry',
  'plum',
];
const dataKey: keyof Recipe = 'name';
const fetchSuggestions = async (query: string) => {
  const res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
  if (res.ok) {
    const data = await res.json();
    try {
      const validatedData = validateResponse(data);
      return validatedData.recipes ?? {};
    } catch (error) {
      console.error('Failed to validate response', error);
      return [];
    }
  } else {
    throw new Error('Failed to fetch suggestions');
  }
};

export function App() {
  return (
    <div>
      <h1>Welcome to autocomplete-react!</h1>
      <Autocomplete
        placeholder={{
          type: 'string',
          required: false,
          description: 'Enter Recipe',
        }}
        caching={true}
        dataKey={dataKey}
        fetchSuggestions={fetchSuggestions}
        customLoader={<>Loading..</>}
        onSelect={(res) => {
           console.log(res) 
        }}
        onBlur={() => {
           console.log('onBlur')
        }}
        onFocus={() => {
          console.log('onFocus')
        }}
        customStyles={{}}
      />
    </div>
  );
}

export default App;
