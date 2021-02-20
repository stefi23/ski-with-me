import {useState} from 'react'

export const useArrayState = (initialState) => { 
  const [array, setArray] = useState(initialState)
  function handleAdd(newElement) {
    setArray([...array, newElement])
  }
  
  function handleRemove(index) {
    const newArray = array.filter((item, indexToMatch) => {
      if (index === indexToMatch) {
        return false;
      }
      return true
    })
    setArray(newArray)
  }

  function handleEdit(newValue, index) {
    const updateArray = array.map((item, indexToMatch) => {
      if (index === indexToMatch) {
        return newValue
      }
      return item
    })
    setArray(updateArray)
  }

  return [array, handleAdd, handleRemove, handleEdit]
}