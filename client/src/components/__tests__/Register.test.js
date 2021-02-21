import Register from '../register/index'
import { render, screen } from '@testing-library/react'
import React from 'react'
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

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
    it('checks test is connected', () => {
    expect(true).toBe(true)
    })
    it('renders the <Register /> component', () => {
    const { getByText } = render(getComponent())
    getByText('Sign up')
    })
    it('should have first name, last name, email and password input fields present', () => {
        const { container, getByLabelText } = render(getComponent())
        const inputFirstName = screen.getByLabelText('First name')
        const inputLastName = screen.getByLabelText('Last name')
        const inputEmail = screen.getByLabelText('Email')
        const inputPassword = screen.getByLabelText('Password')
        expect(inputFirstName).toBeTruthy()
        expect(inputLastName).toBeTruthy()
        expect(inputEmail).toBeTruthy()
        expect(inputPassword).toBeTruthy()
    })
})

//Test for Submit button exists
// Test button is disabled if email is existet, showAlert is true
//Test submit button works