import Register from '../Register/index'
import { render, screen, act, cleanup, fireEvent } from '@testing-library/react'
import React from 'react'
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import * as getResortsListfromDB from '../Register/getResortsListfromDB'
import * as getLanguagesListfromDB  from '../Register/getLanguagesListfromDB'
import axios from "axios";

const getComponent = (props) => {
  return <Router>
            <Register   updateLoggedIn={() => {}} 
                        getName={() => {}}
                        getUserId={() => {}}
                        intialSkierList={[{}]}
                        {...props} />
            </Router>
}

describe('Register is working', () => {
  beforeEach(async () =>  {
     jest.spyOn(getResortsListfromDB, 'getResortsListfromDB').mockImplementation(() => Promise.resolve(
          ["Andorra", "La Molina"]
          ))
    jest.spyOn(getLanguagesListfromDB, 'getLanguagesListfromDB').mockImplementation(() => Promise.resolve(
          ["English" , "Spanish"]
        ))
    await act( async () => {
        render(getComponent())
      });
  })

    it('renders the <Register /> component', () => {
      expect(screen.getByText('Sign up')).toBeInTheDocument()
    })

    describe('should have first name, last name, email and password input fields present', () => {
      it('first name', () => {
          const inputFirstName = screen.getByLabelText('First name')  
          expect(inputFirstName).toBeInTheDocument()
      })
      it('last name', () => {
          const inputLastName = screen.getByLabelText('Last name')
          expect(inputLastName).toBeInTheDocument()
      })
      it('email', () => {
          const inputEmail = screen.getByLabelText('Email')
          expect(inputEmail).toBeInTheDocument()
      })
       it('password', () => {
          const inputPassword = screen.getByLabelText('Password')
          expect(inputPassword).toBeInTheDocument()
      })
  })

  describe('should have a radio boxes for all sport options', () => {
    describe.each(['ski', 'snowboard', 'both'])('%s', (sport) => {
      it('has specific radiobox', () => {
        const radioBox = screen.getByRole('radio', { name: sport})
        expect(radioBox).toBeDefined()
      })
    })
  })

  describe('should have a radio boxes for all levels', () => {
    describe.each(['beginner', 'medium', 'advanced', 'pro']) ('%s', (level) => {
      it('has specific radio box', () => {
        const radioBox = screen.getByLabelText(level)
        expect(radioBox).toBeDefined()
      })
    })
    })

  describe('should have input field for Resorts and Languages', () => { 
    it.each(['Resorts', 'Languages']) ('%s' , (inputField) => {
        const input = screen.getByLabelText(inputField)
        expect(input).toBeDefined()
    })
  })  

  describe('should have a Sign Up button', ()=> {
      it('Sign Up button', ()=> {
      const button = screen.getByRole('button', { name: 'Submit'})
      expect(button).toBeDefined()
    });
  })

//TODO with a table to have key values: email = matei@gmail.com etc.

describe('sets input value when to the data the user inputs', () => {
    describe.each`
    inputField                 | value
    ${'First name'}       | ${'Matei'}
    ${'Last name'}        | ${'Stanciu'}
    ${'Email'}            | ${'matei@gmail.com'}
    ${'Password'}         | ${'123'}
    `('$inputField', ({inputField, value}) => {
      it(`set`, () => {
        const input = screen.getByLabelText(inputField)
        fireEvent.change(input, { target: { value: value } })
        expect(input.value).toBe(value)
      })
    })
  })




describe('sets sport value when specific sport is selected', () => {
     it.each(['ski', 'snowboard', 'both'])(
        "%s",
        (sport) => {
          const radioBoxSport = screen.getByRole('radio', { name: sport})
          fireEvent.change(radioBoxSport, { target: { value: sport } })
          expect(radioBoxSport.value).toBe(sport)
        }
      );
})


describe('sets level value when specific level is selected', () => {
     it.each(['beginner', 'medium', 'advanced', 'pro'])(
        "%s",
        (level) => {
          const radioBoxLevel = screen.getByRole('radio', { name: level})
          fireEvent.change(radioBoxLevel, { target: { value: level } })
          expect(radioBoxLevel.value).toBe(level)
        }
      );
})


  describe('after successful register', () => {
    const mockUpdateLoggedIn = jest.fn()
    const mockGetName = jest.fn()
    const mockGetUserId = jest.fn()

    const resposeData = {
                        messsage: "user was added",
                        name: "Matei",
                        token: 123,
                        id: 1
                    }

      beforeEach( async () => {
        cleanup()
        const { container, getByText, debug, getByTestId } = render ( getComponent({
          updateLoggedIn: mockUpdateLoggedIn,
          getName: mockGetName,
          getUserId: mockGetUserId
        }))
        const inputFirstName = screen.getByLabelText('First name')
        const inputLastName = screen.getByLabelText('Last name')
        const inputEmail = screen.getByLabelText('Email')
        const inputPassword = screen.getByLabelText('Password')
        const form = screen.getByTestId('register-form')

        fireEvent.change(inputFirstName, { target: { value: 'Matei' } })
        fireEvent.change(inputLastName, { target: { value: 'Mayer' } })
        fireEvent.change(inputEmail, { target: { value: 'matei@gmail.com' } })
        fireEvent.change(inputPassword, { target: { value: '123' } })

        jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({
          data: resposeData
        }))
        await act(async () => {
          fireEvent.submit(form)
        })
        
    })
    it('sets updateLoggedIn = true', async () => {
          expect(mockUpdateLoggedIn).toHaveBeenCalledWith(true)
      })
      it('sets getName to the user name', async () => {
          expect(mockGetName).toHaveBeenCalledWith(resposeData.name)
      })
      it('sets  getUserId to the user id', async () => {
          expect(mockGetUserId).toHaveBeenCalledWith(resposeData.id)
      })
  })

  describe('if user is already registered', () => {
    const mockUpdateLoggedIn = jest.fn()

      beforeEach( async () => {
        cleanup()
        const { container, getByText, debug, getByTestId } = render ( getComponent({
          updateLoggedIn: mockUpdateLoggedIn,
        }))
        const inputFirstName = screen.getByLabelText('First name')
        const inputLastName = screen.getByLabelText('Last name')
        const inputEmail = screen.getByLabelText('Email')
        const inputPassword = screen.getByLabelText('Password')
        const form = screen.getByTestId('register-form')

        fireEvent.change(inputFirstName, { target: { value: 'Matei' } })
        fireEvent.change(inputLastName, { target: { value: 'Mayer' } })
        fireEvent.change(inputEmail, { target: { value: 'matei@gmail.com' } })
        fireEvent.change(inputPassword, { target: { value: '123' } })

        jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({
          data: { message: "user is already registered"}
        }))
        
        await act(async () => {
          fireEvent.submit(form)
        })
        
    })
    it('does set showAlert to true if user is already registered', async () => {
      expect(screen.getByText('Email address already registered.')).toBeInTheDocument()
    })
    it('Submit button is disabled', async () => {
      const button = screen.getByRole('button', { name: 'Submit'})
      expect(button).toHaveAttribute('disabled');
    })
  })

  describe('after unsuccessful register', () => {
    const mockUpdateLoggedIn = jest.fn()
    window.alert = jest.fn()

      beforeEach( async () => {
        cleanup()
        const { container, getByText, debug, getByTestId } = render ( getComponent({
          updateLoggedIn: mockUpdateLoggedIn,
        }))
        const inputFirstName = screen.getByLabelText('First name')
        const inputLastName = screen.getByLabelText('Last name')
        const inputEmail = screen.getByLabelText('Email')
        const inputPassword = screen.getByLabelText('Password')
        const form = screen.getByTestId('register-form')

        fireEvent.change(inputFirstName, { target: { value: 'Matei' } })
        fireEvent.change(inputLastName, { target: { value: 'Mayer' } })
        fireEvent.change(inputEmail, { target: { value: 'matei@gmail.com' } })
        fireEvent.change(inputPassword, { target: { value: '123' } })

        jest.spyOn(axios, 'post').mockImplementation(() => Promise.reject({
         data: { message: "user is not valid"}
        }))
        
        await act(async () => {
          fireEvent.submit(form)
        })
    })
    it('does not set updateLoggedIn = true',  () => {
      expect(mockUpdateLoggedIn).not.toHaveBeenCalled()
    })
    it('alerts the user wit 500 ERROR', () => {
      expect(window.alert).toHaveBeenCalledWith('500 ERROR!')

    }) 
  })

})