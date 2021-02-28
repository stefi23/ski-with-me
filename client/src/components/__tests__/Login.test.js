import { fireEvent, render, screen, cleanup} from '@testing-library/react'
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

  beforeEach(() => render(getComponent()))
  it('renders the <Login /> component', () => {
    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
  })

  describe('should have email and password input field present', () => {
    it('email', ()=> {
        const inputEmail = screen.getByLabelText('Email')
        expect(inputEmail).toBeDefined()
      });
      it('password', ()=> {
        const inputPassword = screen.getByLabelText('Password')
        expect(inputPassword).toBeDefined()
      });
    })
  describe('should have a Login button', () => {
    it('login button', ()=> {
      const button = screen.getByRole('button', { name: 'Login'})
      expect(button).toBeDefined()
      expect(screen.getByTestId('btn-login').textContent).toBe('Login');
    });
  })

  describe('sets input value when to the data the user inputs', () => {
    it('email input', async () => {
      const inputEmail = screen.getByLabelText('Email')
      fireEvent.change(inputEmail, { target: { value: 'matei@gmail.com' } })
      expect(inputEmail.value).toBe('matei@gmail.com')
    })

    it('password input', () => {
      const inputPassword = screen.getByLabelText('Password')
      fireEvent.change(inputPassword, { target: { value: '123' } })
      expect(inputPassword.value).toBe('123')
    })
})
  describe('after successful login', () => {
    const mockUpdateLoggedIn = jest.fn()
    const mockGetName = jest.fn()
    const mockGetUserId = jest.fn()

    const resposeData = {
                        messsage: "Login successful",
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
        const inputEmail = screen.getByLabelText('Email')
        const inputPassword = screen.getByLabelText('Password')
        const form = screen.getByTestId('login-form')

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
      it('sets getUserId to the user id', async () => {
          expect(mockGetUserId).toHaveBeenCalledWith(resposeData.id)
      })
      it('does not show alert: username or password incorrect', async () => {
      expect(screen.queryByText('username or password incorrect')).not.toBeInTheDocument()
      })
  })
  
describe('after unsuccessful login', () => {
  const mockUpdateLoggedIn = jest.fn();
//
  beforeEach( async () => {
    cleanup()
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
  })

    it('does not set updateLoggedIn = true', async () => {
      expect(mockUpdateLoggedIn).not.toHaveBeenCalled()
    })
    it('shows alert: username or password incorrect', async () => {
      expect(screen.getByText('username or password incorrect')).toBeInTheDocument()
    })

})

})