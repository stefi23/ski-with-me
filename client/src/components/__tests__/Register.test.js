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

    it('checks test is connected', () => {
      expect(true).toBe(true)
    })

    it('renders the <Register /> component', () => {
      expect(screen.getByText('Sign up')).toBeInTheDocument()
    })

    it('should have first name, last name, email and password input fields present', () => {
        const inputFirstName = screen.getByLabelText('First name')
        const inputLastName = screen.getByLabelText('Last name')
        const inputEmail = screen.getByLabelText('Email')
        const inputPassword = screen.getByLabelText('Password')
        expect(inputFirstName).toBeInTheDocument()
        expect(inputLastName).toBeInTheDocument()
        expect(inputEmail).toBeInTheDocument()
        expect(inputPassword).toBeInTheDocument()
    })

    it('should have a radio boxes for all sports(ski, snowboard, both)', ()=> {
    const radioBoxSki = screen.getByRole('radio', { name: 'ski'})
    const radioBoxSnowboard = screen.getByRole('radio', { name: 'snowboard'})
    const radioBoxBoth = screen.getByRole('radio', { name: 'both'})
    expect(radioBoxSki).toBeDefined()
    expect(radioBoxSnowboard).toBeDefined()
    expect(radioBoxBoth).toBeDefined()
  });

  it('should have a radio boxes for all levels(beginner, medium, advanced, pro)', ()=> {
    // const pro = screen.getByRole('radio', { name: 'pro'})
    const pro = screen.getByLabelText('pro')
    const advanced = screen.getByRole('radio', { name: 'advanced'})
    const medium = screen.getByRole('radio', { name: 'medium'})
    const beginner = screen.getByRole('radio', { name: 'beginner'})
    
    expect(pro).toBeDefined()
    expect(advanced).toBeDefined()
    expect(medium).toBeDefined()
    expect(beginner).toBeDefined()
  });

  it('should have a the an input field for Resorts', ()=> {
    // const resortsInput = screen.getByRole('textbox', { name: 'Resorts'})
    const resortsInput = screen.getByLabelText('Resorts')
    expect(resortsInput).toBeDefined()

  });

   it('should have a the an input field for Resorts', ()=> {
    const languagesInput = screen.getByLabelText('Languages')
    expect(languagesInput).toBeDefined()

  });

    it('should have a Sign Up button', ()=> {
    const button = screen.getByRole('button', { name: 'Submit'})
    expect(button).toBeDefined()
    // expect(getByTestId('btn-login').textContent).toBe('Login');
  });

  it('sets email value when user updates the email input', async () => {
    const inputEmail = screen.getByLabelText('Email')
    fireEvent.change(inputEmail, { target: { value: 'matei@gmail.com' } })
    expect(inputEmail.value).toBe('matei@gmail.com')
  })

  it('sets sport value when specific sport is selected', async () => {
     const radioBoxSki = screen.getByRole('radio', { name: 'ski'})
    fireEvent.change(radioBoxSki, { target: { value: 'ski' } })
    expect(radioBoxSki.value).toBe('ski')
  })

  it('sets cannot set sport value to a not specified sport ', async () => {
     const radioBoxSki = screen.getByRole('radio', { name: 'ski'})
    fireEvent.change(radioBoxSki, { target: { value: 'skier' } })
    expect(radioBoxSki.value).not.toBe('ski')
  })

const mockUpdateLoggedIn = jest.fn()
    const mockGetName = jest.fn()
    const mockGetUserId = jest.fn()

    const resposeData = {
                        messsage: "user was added",
                        name: "Matei",
                        token: 123,
                        id: 1
                    }
it('sets updateLoggedIn = true', async () => {
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
          expect(mockUpdateLoggedIn).toHaveBeenCalledWith(true)
        })
        //it expects
      
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





// Test button is disabled if email is existet, showAlert is true
//Test submit button works