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
  return <Router ><Login updateLoggedIn={() => {}} 
                         getName={() => {}}
                         getUserId={() => {}} {...props} />
        </Router>
}

describe('Login is working', () => {
  it('renders the component', () => {
    expect(1).toBe(1)
  })
  it('renders the <Login /> component', () => {
  const { container, getByText } = render(getComponent())

  
  expect(getByText('Welcome Back')).toBeInTheDocument()
})

  it('sets updateLoggedIn = true on successful login', async () => {
    const mockUpdateLoggedIn = jest.fn();

    const { container, getByText, debug, getByTestId } = render ( getComponent({
      updateLoggedIn: mockUpdateLoggedIn
    }))
    

    const inputPassword = screen.getByLabelText('Password')
    const inputEmail = screen.getByLabelText('Email')

    const form = getByTestId('login-form')
    // debug()
    // console.log(form)
    // fill the form
    fireEvent.change(inputEmail, { target: { value: 'matei@gmail.com' } })
    fireEvent.change(inputPassword, { target: { value: '123' } })
   
    // expect(inputEmail.value).toBe('matei@gmail.com')

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

  it('does not set updateLoggedIn = true on successful login', async () => {
    const mockUpdateLoggedIn = jest.fn();

    const { container, getByText, debug, getByTestId } = render ( getComponent({
      updateLoggedIn: mockUpdateLoggedIn
    }))
    

    const inputPassword = screen.getByLabelText('Password')
    const inputEmail = screen.getByLabelText('Email')

    const form = getByTestId('login-form')
    // debug()
    // console.log(form)
    // fill the form
    fireEvent.change(inputEmail, { target: { value: 'matei@gmail.com' } })
    fireEvent.change(inputPassword, { target: { value: '123' } })
   
    // expect(inputEmail.value).toBe('matei@gmail.com')

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