import {useState} from 'react'

//To think of better naming convention
const useCallback = (input) => {
    const [value, setValue] = useState(input)
    function setCallBack(value) {
        setValue(value)
    }
    return [value, setCallBack]
}

export {useCallback}