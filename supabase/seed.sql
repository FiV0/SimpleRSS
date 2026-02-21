-- Seed some popular feeds for testing
INSERT INTO feeds (url, title, site_url) VALUES
  ('https://hnrss.org/frontpage', 'Hacker News - Front Page', 'https://news.ycombinator.com'),
  ('https://feeds.arstechnica.com/arstechnica/features', 'Ars Technica - Features', 'https://arstechnica.com'),
  ('https://www.theverge.com/rss/index.xml', 'The Verge', 'https://www.theverge.com'),
  ('https://xkcd.com/rss.xml', 'xkcd', 'https://xkcd.com'),
  ('https://blog.pragmaticengineer.com/rss/', 'The Pragmatic Engineer', 'https://blog.pragmaticengineer.com')
ON CONFLICT (url) DO NOTHING;
