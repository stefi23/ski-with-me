import Register from '../Register/index'
import { render, screen, act } from '@testing-library/react'
import React from 'react'
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import * as getResortsListfromDB from '../Register/getResortsListfromDB'
import * as getLanguagesListfromDB  from '../Register/getLanguagesListfromDB'


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

    it('should have a Sign Up button', ()=> {
    const button = screen.getByRole('button', { name: 'Submit'})
    expect(button).toBeDefined()
    // expect(getByTestId('btn-login').textContent).toBe('Login');
  });
})

// Test button is disabled if email is existet, showAlert is true
//Test submit button works