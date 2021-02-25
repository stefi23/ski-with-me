import { render,  cleanup } from '@testing-library/react'
import React from 'react'
import SkierCard from '../SkierCard'
import 'jest-styled-components'
import styled from 'styled-components'

const getComponent = (props) => {
  return <SkierCard name="Stefi" sport="ski" level= "pro" resorts="" {...props} />
}

describe('SkierCard is working', () => {
  it('renders the component', () => {
    expect(true).toBe(true)
  })

  it('renders ski emoji based on sport ski', () => {
    const { container, getByText } = render(getComponent({ sport: 'ski'}))
    expect(getByText('⛷️')).toBeInTheDocument()
  })
  it('renders snowboard emoji based on sport snowboard', () => {
    const { container, getByText } = render(getComponent({ sport: 'snowboard'}))
    expect(getByText('🏂')).toBeInTheDocument()
  })
  it('renders both emojis based on sport both', () => {
    const { container, getByText } = render(getComponent({ sport: 'both'}))
    expect(getByText('⛷️/🏂')).toBeInTheDocument()
  })
  it('renders the passed name', () => {
    const { container, getByText } = render(getComponent({ name: 'Stefi'}))
    expect(getByText('Stefi')).toBeInTheDocument()
  })
   it('renders the passed level', () => {
    const { container, getByText } = render(getComponent({ level: 'pro'}))
    expect(getByText('- pro -')).toBeInTheDocument()
  })
   it('renders the passed language', () => {
    const { container, getByText } = render(getComponent({ languages: 'English'}))
    expect(getByText('English')).toBeInTheDocument()
  })
  it('renders the no language added if nothing is passed', () => {
       cleanup()
    const { container, getByText } = render(getComponent())
    expect(getByText('No languages added')).toBeInTheDocument()
  })

  it('renders the no resort added if nothing is passed', () => {
    cleanup()
    const { container, getByText } = render(getComponent())
    expect(getByText('No resort added')).toBeInTheDocument()
  })

   it('renders the passed resort', () => {
    const { container, getByText } = render(getComponent({ resorts: 'Andorra'}))
    expect(getByText('Andorra')).toBeInTheDocument()
  })

  // it('renders the passed resort', () => {
  //   const { container, getByText } = render(getComponent({ resorts: 'Andorra, La Molina'}))
  //   expect(getByText('Andorra, La Molina')).toBeInTheDocument()
  // })

  it('if isUserLoggedin is not true shows Contact Info as a Login Link', () => {
    const { container, getByText, getByRole } = render(getComponent({ isUserLoggedin: false}))
    expect(getByText('Contact info')).toHaveAttribute('href', '/login')
    expect(getByRole('link')).toHaveAttribute('href', '/login');
  })

  it('if isUserLoggedin is true to not show Contact Info as a Login Link', () => {
    const { container, queryByText, getByRole } = render(getComponent({ isUserLoggedin: true, email:'matei@gmail.com'}))
    expect(queryByText('Contact info')).not.toBeInTheDocument()
    expect(queryByText('matei@gmail.com')).toBeInTheDocument()
    // expect(getByRole('link').toHaveAttribute('href', '/login').not.toBeInTheDocument())
  })

  it('if isUserLoggedin is true to show their email address', () => {
    const { container, queryByText, getByRole } = render(getComponent({ isUserLoggedin: true, email:'matei@gmail.com'}))
    expect(queryByText('matei@gmail.com')).toBeInTheDocument()
  })

})