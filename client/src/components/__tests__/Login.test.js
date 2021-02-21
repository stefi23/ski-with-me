import { fireEvent, render, screen} from '@testing-library/react'
import axios from "axios";
import React from 'react'
import Login from '../Login'
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import { act } from 'react-dom/test-utils';


const getComponent = (props) => {
  return <Router>
            <Login  updateLoggedIn={() => {}} 
                    getName={() => {}}
                    getUserId={() => {}} {...props} />
        </Router>
}

describe('Login is working', () => {
  it('checks test is connected', () => {
    expect(true).toBe(true)
  })
  it('renders the <Login /> component', () => {
    const { getByText } = render(getComponent())
    getByText('Welcome Back')
    // expect(getByText('Welcome Back')).toBeInTheDocument()
    //check input boxes and button too
  })

  it('should have email and password input field present', ()=> {
     const { container, getByLabelText } = render(getComponent())
     const inputEmail = screen.getByLabelText('Email')
     const inputPassword = screen.getByLabelText('Password')
        expect(inputEmail).toBeTruthy()
        expect(inputPassword).toBeTruthy()
  });

  it('should have a button contain the text Login', ()=> {
    const { container, getByTestId } = render(getComponent())
    expect(getByTestId('btn-login').textContent).toBe('Login');
  });

  it('sets email value when user updates the email input', async () => {
    const { container, getByLabelText } = render(getComponent())
    const inputEmail = screen.getByLabelText('Email')
    fireEvent.change(inputEmail, { target: { value: 'matei@gmail.com' } })
    expect(inputEmail.value).toBe('matei@gmail.com')
  })

  it('sets password value when user updates the password input', () => {
    const { container, getByLabelText } = render(getComponent())
    const inputPassword = screen.getByLabelText('Password')
    fireEvent.change(inputPassword, { target: { value: '123' } })
    expect(inputPassword.value).toBe('123')
  })

  it('sets updateLoggedIn = true on successful login', async () => {
    const mockUpdateLoggedIn = jest.fn();

    const { container, getByText, debug, getByTestId } = render ( getComponent({
      updateLoggedIn: mockUpdateLoggedIn
    }))

    const inputEmail = screen.getByLabelText('Email')
    const inputPassword = screen.getByLabelText('Password')
  
    const form = getByTestId('login-form')

    fireEvent.change(inputEmail, { target: { value: 'matei@gmail.com' } })
    fireEvent.change(inputPassword, { target: { value: '123' } })

    jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({
      data: {
        messsage: "Login successful",
        name: "Matei",
        token: 123,
        id: 1
      }
    }))
    
    await act(async () => {
      fireEvent.submit(form)
    })
   
    expect(mockUpdateLoggedIn).toHaveBeenCalledWith(true)
  })

  it('does not set updateLoggedIn = true on unsuccessful login', async () => {
    const mockUpdateLoggedIn = jest.fn();

    const { container, getByText, debug, getByTestId } = render ( getComponent({
      updateLoggedIn: mockUpdateLoggedIn
    }))
    
    const inputPassword = screen.getByLabelText('Password')
    const inputEmail = screen.getByLabelText('Email')

    const form = getByTestId('login-form')

    fireEvent.change(inputEmail, { target: { value: 'matei@gmail.com' } })
    fireEvent.change(inputPassword, { target: { value: '123' } })
   
    jest.spyOn(axios, 'post').mockImplementation(() => Promise.reject({
      response: {
        status: 400
      }
    }))

    await act( async() => {
      fireEvent.submit(form)
    })

    expect(mockUpdateLoggedIn).not.toHaveBeenCalled()
  })
})