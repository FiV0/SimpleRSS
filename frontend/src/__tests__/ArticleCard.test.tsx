import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ArticleCard } from '@/components/ArticleCard'

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('ArticleCard', () => {
  it('renders article title', () => {
    renderWithRouter(
      <ArticleCard
        id={1}
        title="Test Article"
        publishedAt={null}
        isRead={false}
      />
    )
    expect(screen.getByText('Test Article')).toBeInTheDocument()
  })

  it('shows New badge for unread articles', () => {
    renderWithRouter(
      <ArticleCard
        id={2}
        title="Unread Article"
        publishedAt={null}
        isRead={false}
      />
    )
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('does not show New badge for read articles', () => {
    renderWithRouter(
      <ArticleCard
        id={3}
        title="Read Article"
        publishedAt={null}
        isRead={true}
      />
    )
    expect(screen.queryByText('New')).not.toBeInTheDocument()
  })

  it('renders published date when provided', () => {
    const date = new Date('2026-02-20T12:00:00Z').toISOString()
    renderWithRouter(
      <ArticleCard
        id={4}
        title="Dated Article"
        publishedAt={date}
        isRead={false}
      />
    )
    // Should show relative time like "1 day ago"
    expect(screen.getByText(/ago/)).toBeInTheDocument()
  })
})
