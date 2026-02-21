import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { FeedCard } from '@/components/FeedCard'

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('FeedCard', () => {
  it('renders feed title and site URL', () => {
    renderWithRouter(
      <FeedCard
        id={1}
        title="Hacker News"
        url="https://hnrss.org/frontpage"
        siteUrl="https://news.ycombinator.com"
        unreadCount={0}
      />
    )
    expect(screen.getByText('Hacker News')).toBeInTheDocument()
    expect(screen.getByText('https://news.ycombinator.com')).toBeInTheDocument()
  })

  it('falls back to feed URL when siteUrl is null', () => {
    renderWithRouter(
      <FeedCard
        id={2}
        title="Test Feed"
        url="https://example.com/feed.xml"
        siteUrl={null}
        unreadCount={0}
      />
    )
    expect(screen.getByText('https://example.com/feed.xml')).toBeInTheDocument()
  })

  it('shows unread count when greater than zero', () => {
    renderWithRouter(
      <FeedCard
        id={3}
        title="My Feed"
        url="https://example.com/rss"
        siteUrl={null}
        unreadCount={42}
      />
    )
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('does not show unread count when zero', () => {
    renderWithRouter(
      <FeedCard
        id={4}
        title="Empty Feed"
        url="https://example.com/rss"
        siteUrl={null}
        unreadCount={0}
      />
    )
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })
})
