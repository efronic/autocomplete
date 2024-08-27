import { useCallback, useState } from 'react';
import { AutocompleteCache } from '../types/cache';
import { Recipe } from '../types/recipe-schema';

const useCache = () => {
    const [cache, setCache] = useState<AutocompleteCache>({});
    const getCache = useCallback((key: string) => {
        return cache[key];
    }, [cache]);
    const setCacheValue = useCallback((key: string, value: Recipe[]) => {
        setCache((prevCache) => {
            return { ...prevCache, [key]: value };
        });
    }, []);
    console.log('efron useCache', cache);
    return { getCache, setCacheValue };
};
export default useCache;