import { useEffect, useState } from "react"

//we'll use the useLocalStorage hook to store the budgets and expenses in local storage
const useLocalStorage = (key, initialValue) => { 
    const [value, setValue] = useState(() => {
        //we'll use the getItem method to get the value from local storage
        const jsonValue = localStorage.getItem(key);
        //if the value is not null, we'll parse the json value
        if (jsonValue != null) return JSON.parse(jsonValue);
        //if the value is null, we'll check if the initial value is a function, if it is, we'll call the function
        if (typeof initialValue === 'function') {
            return initialValue();
        //otherwise we'll just return the initial value
        } else {
            return initialValue;
        }
    });

    //we'll use the useEffect hook to update the local storage whenever the value changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue]
}

export default useLocalStorage;