-- Create feeds table (global feed registry)
CREATE TABLE feeds (
  id SERIAL PRIMARY KEY,
  url TEXT UNIQUE NOT NULL,
  title TEXT,
  site_url TEXT,
  description TEXT,
  last_fetched_at TIMESTAMP WITH TIME ZONE,
  last_fetch_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE INDEX idx_feeds_url ON feeds (url);
CREATE INDEX idx_feeds_last_fetched_at ON feeds (last_fetched_at);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_feeds_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_feeds_updated_at
    BEFORE UPDATE ON feeds
    FOR EACH ROW
    EXECUTE FUNCTION update_feeds_updated_at();

-- Enable RLS
ALTER TABLE feeds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view feeds" ON feeds
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert feeds" ON feeds
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Service role can update feeds" ON feeds
  FOR UPDATE USING (auth.role() = 'service_role');
