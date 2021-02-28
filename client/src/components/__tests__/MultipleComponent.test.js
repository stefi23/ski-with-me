import { fireEvent, render, screen, cleanup} from '@testing-library/react'
import React from 'react'
import MultipleComponent from '../MultipleInput'
import { act } from 'react-dom/test-utils';
import { iteratee } from 'lodash';



const getComponent = (props) => {
  return  <MultipleComponent  
                  data={[]}
                  label="Resorts"
                  items={[""]}
                  onAdd={() => {}} 
                  onRemove={() => {}} 
                  onEdit={() => {}} 
                //     updateLoggedIn={() => {}} 
                //     getName={() => {}}
                //     getUserId={() => {}} {...props} 
                    />
}

describe('MultipleComponent is working', () => {
    beforeEach(() => render(getComponent()))
    
    it('test is connected', () => {
     expect(1).toBe(1)
    })

    describe('when there is no data' , () => {
        it('renders an empty input field', () => {
            const inputField = screen.getByLabelText('Resorts')
            expect(inputField).toBeDefined()
        })
    })

    describe('when there is data' , () => {
        it('renders an input field', () => {
            const inputField = screen.getByLabelText('Resorts')
            expect(inputField).toBeDefined()
        })

        // in has the Add More Resorts Button
        // it gives you a Remove Resorts Button
        // Can edit specifc elements
    })

})