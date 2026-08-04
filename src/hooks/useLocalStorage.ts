import { useCallback, useState } from "react";

function useLocalStorage<T>(
    key: string,
    initialValue: T
) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            if (typeof window === "undefined") {
                return initialValue;
            }

            const item = window.localStorage.getItem(key);

            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = useCallback((value: T) => {
        try {
            const serializedValue = JSON.stringify(value);

            setStoredValue(value);

            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, serializedValue);
            }
        } catch (error) {
            console.error(error);
        }
    }, [key]);

    return [storedValue, setValue] as const;
}

export default useLocalStorage;