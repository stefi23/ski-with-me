import { render } from '@testing-library/react'
import React from 'react'
import SkierCard from '../SkierCard'
import 'jest-styled-components'
import styled from 'styled-components'

const getComponent = (props) => {
  return <SkierCard sport='ski'name="Stefi" level="pro" resorts="Andorra" {...props} />
}

describe('SkierCard is working', () => {
  it('renders the component', () => {
    expect(true).toBe(true)
  })
  it('renders  ski emoji based on sport ski', () => {
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

})