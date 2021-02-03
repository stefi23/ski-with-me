import {useState} from 'react'

//To think of better naming?
const useCallbackData = (input) => {
    const [value, setValue] = useState(input)
    function setCallBack(value) {
        setValue(value)
    }
    return [value, setCallBack]
}

export {useCallbackData}