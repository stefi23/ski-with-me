import { useState } from "react";

const useInput = (input) => {
    const [value, setValue] = useState(input)
    function handleInputChange(event) {
        setValue(event.target.value)
    }
    return [value, handleInputChange]
}

export { useInput }