import { render,  cleanup } from '@testing-library/react'
import React from 'react'
import SkierCard from '../SkierCard'
import 'jest-styled-components'
import styled from 'styled-components'

const defaultProps = {
  languages: 'English',
  name: 'Stefi',
  sport: 'ski',
  level: 'pro',
  resorts: 'Andorra',
}

const getComponent = (props) => {
  return <SkierCard {...defaultProps} {...props} />
}

describe('SkierCard is working', () => {
  describe('sports', () => {
    describe.each`
    sport          | emoji
    ${'ski'}       | ${'⛷️'}
    ${'snowboard'} | ${'🏂'}
    ${'both'}      | ${'⛷️/🏂'}
    `('for $sport', ({sport, emoji}) => {
      it(`renders the ${emoji} emoji`, () => {
        const { container, getByText } = render(getComponent({ sport }))
        expect(getByText(emoji)).toBeInTheDocument()
      })
    })
  })
  describe('name', ()=> {
    it('renders the passed name', () => {
      const {  getByTestId } = render(getComponent({ name: 'Stefi' }))
      const titleComponent = getByTestId('title')
      expect(titleComponent).toBeInTheDocument()
      expect(titleComponent.innerHTML).toBe('Stefi')
    })
  })

    describe('level', () => {
    describe.each(['pro', 'medium', 'advanced', 'beginner'])('for %s level', (level) => {
      it('renders the correct label', () => {
        const { container, getByText } = render(getComponent({ level }))
        expect(getByText(`- ${level} -`)).toBeInTheDocument()
      })
    })
  })
 
  describe('languages', () => {
  it('renders the passed language', () => {
    const { container, getByText } = render(getComponent({ languages: 'English,German'}))
    expect(getByText('English, German')).toBeInTheDocument()
  })
  it('renders the no language added if nothing is passed', () => {
       cleanup()
    const { container, getByText } = render(getComponent({ languages: '' }))
    expect(getByText('No languages added')).toBeInTheDocument()
  })
  })

  describe('resorts', () => {
  it('renders the no resort added if nothing is passed', () => {
    cleanup()
    const { container, getByText } = render(getComponent({resorts: ''}))
    expect(getByText('No resorts added')).toBeInTheDocument()
  })

   it('renders the passed resort', () => {
    const { container, getByText } = render(getComponent({ resorts: 'Andorra'}))
    expect(getByText('Andorra')).toBeInTheDocument()
  })
    it('renders the passed resorts (in case of more options)', () => {
    const { container, getByText } = render(getComponent({ resorts: 'Andorra,La Molina'}))
    expect(getByText('Andorra, La Molina')).toBeInTheDocument()
  })
 })
  
  describe('contact info', () => {
    it('if isUserLoggedin is not true shows Contact Info as a Login Link', () => {
      const { container, getByText, getByRole, queryByText } = render(getComponent({ isUserLoggedin: false, email:'matei@gmail.com'}))
      expect(getByText('Contact info')).toHaveAttribute('href', '/login')
      expect(getByRole('link')).toHaveAttribute('href', '/login');
      expect(queryByText('matei@gmail.com')).not.toBeInTheDocument()
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
})