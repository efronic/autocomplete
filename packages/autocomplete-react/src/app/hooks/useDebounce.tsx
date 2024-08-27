import { useState, useEffect, useCallback } from 'react';

const useDebounce = (value: string, delay = 500) => {
    console.log('efron useDebounce called!', value);
    const [debouncedValue, setDebouncedValue] = useState(value);

    const updateDebouncedValue = useCallback(() => {
        setDebouncedValue(value);
    }, [value]);

    useEffect(() => {
        const id = setTimeout(updateDebouncedValue, delay);

        return () => {
            clearTimeout(id);
        };
    }, [value, delay, updateDebouncedValue]);
    console.log('efron useDebounce debouncedValue', debouncedValue);
    return debouncedValue;
};

export default useDebounce;