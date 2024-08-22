// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { Route, Routes, Link } from 'react-router-dom';
import Autocomplete from './components/autocomplete/autocomplete';

const staticData = [
  "apple",
  "banana",
  "berrl",
  "orange",
  "grape",
  "mango",
  "melon",
  "berry",
  "peach",
  "cherry",
  "plum",
];
const fetchSuggestions = async (query: string) => {
  const res = await fetch(`https://dummyjson.com/recipes/search?q=mar${query}`);
  if (res.ok) {
    const data = await res.json();
    return data.recipes ?? [];
  } else {
    throw new Error('Failed to fetch suggestions');
  }
}
export function App() {
  return (
    <div>
      <h1>Welcome to autocomplete-react!</h1>
      <Autocomplete
        placeholder={{ type: 'string', required: false, description: 'Enter Recipe' }}
        caching={true}
        dataKey={'name'}
        fetchSuggestions={fetchSuggestions}
        customLoader={<>Loading..</>}
        onSelect={(res) => console.log(res)}
        onBlur={() => console.log('onBlur')}
        onFocus={() => console.log('onFocus')}
        customStyles={{}}
      />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
