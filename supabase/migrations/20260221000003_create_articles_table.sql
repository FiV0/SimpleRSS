-- Create articles table (global article store)
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  feed_id INTEGER NOT NULL REFERENCES feeds(id) ON DELETE CASCADE,
  title TEXT,
  url TEXT,
  content TEXT,
  summary TEXT,
  author TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  guid TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(feed_id, guid)
);

-- Create indexes
CREATE INDEX idx_articles_feed_id ON articles (feed_id);
CREATE INDEX idx_articles_published_at ON articles (published_at DESC);
CREATE INDEX idx_articles_guid ON articles (feed_id, guid);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view articles" ON articles
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Service role can insert articles" ON articles
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update articles" ON articles
  FOR UPDATE USING (auth.role() = 'service_role');
