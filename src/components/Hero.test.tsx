import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Hero from './Hero'

describe('Hero Component', () => {
  it('should call onContactClick when the contact button is clicked', () => {
    const mockOnContactClick = vi.fn()

    render(<Hero onContactClick={mockOnContactClick} />)

    const contactButton = screen.getByRole('button', { name: /contact/i })

    fireEvent.click(contactButton)

    expect(mockOnContactClick).toHaveBeenCalledTimes(1)
  })
})