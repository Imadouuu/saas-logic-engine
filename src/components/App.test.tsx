import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App Integration', () => {
  it('should open the Form Modal when a contact button is clicked', async () => {
    render(<App />)

    expect(screen.queryByTestId('contact-form-modal')).toBeNull()

    const contactButtons = screen.getAllByRole('button', { name: /contact/i })
    fireEvent.click(contactButtons[0])

    expect(screen.getByTestId('contact-form-modal')).toBeInTheDocument()
  })
})