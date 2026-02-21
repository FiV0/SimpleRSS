-- Create user_feeds junction table (subscriptions)
CREATE TABLE user_feeds (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  feed_id INTEGER NOT NULL REFERENCES feeds(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, feed_id)
);

-- Create user_article_status table (per-user read/star status)
CREATE TABLE user_article_status (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  is_starred BOOLEAN DEFAULT false,
  UNIQUE(user_id, article_id)
);

-- Create indexes
CREATE INDEX idx_user_feeds_user_id ON user_feeds (user_id);
CREATE INDEX idx_user_feeds_feed_id ON user_feeds (feed_id);
CREATE INDEX idx_user_article_status_user_id ON user_article_status (user_id);
CREATE INDEX idx_user_article_status_article_id ON user_article_status (article_id);
CREATE INDEX idx_user_article_status_is_read ON user_article_status (user_id, is_read);

-- Enable RLS
ALTER TABLE user_feeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_article_status ENABLE ROW LEVEL SECURITY;

-- user_feeds policies
CREATE POLICY "Users can view own subscriptions" ON user_feeds
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can subscribe to feeds" ON user_feeds
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can unsubscribe from feeds" ON user_feeds
  FOR DELETE USING (user_id = auth.uid());

-- user_article_status policies
CREATE POLICY "Users can view own article status" ON user_article_status
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own article status" ON user_article_status
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own article status" ON user_article_status
  FOR UPDATE USING (user_id = auth.uid());
