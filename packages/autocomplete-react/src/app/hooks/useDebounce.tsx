import { useState, useEffect, useCallback } from 'react';

const useDebounce = (value: string, delay = 500) => {
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
    return debouncedValue;
};

export default useDebounce;