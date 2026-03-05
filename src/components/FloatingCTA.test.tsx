import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FloatingCTA from './FloatingCTA'

describe('FloatingCTA Component', () => {
  it('should trigger onOpenForm when clicked', () => {
    const mockOnOpenForm = vi.fn()

    render(<FloatingCTA onOpenForm={mockOnOpenForm} />)

    const floatingButton = screen.getByRole('button')

    fireEvent.click(floatingButton)

    expect(mockOnOpenForm).toHaveBeenCalledTimes(1)
  })
})