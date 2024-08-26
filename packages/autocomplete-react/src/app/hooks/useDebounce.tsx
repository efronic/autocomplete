import { useState, useEffect } from 'react'


const useDebounce = (value: string, delay = 500) => {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => {
            // console.log('efron setting new timeout value', value);
            setDebouncedValue(value);
        }, delay);
        return () => {
            // console.log('efron clearing timeout');
            clearTimeout(id);
        };
    }, [value, delay]);

    return debouncedValue;
}
export default useDebounce;