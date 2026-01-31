-- =============================================
-- Shows table for managing events/performances
-- =============================================

CREATE TABLE IF NOT EXISTS shows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  venue TEXT NOT NULL,
  city TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT,
  ticket_url TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE shows ENABLE ROW LEVEL SECURITY;

-- Public can view active shows
CREATE POLICY "Public can view active shows" ON shows
  FOR SELECT USING (is_active = true);

-- Authenticated users can manage shows
CREATE POLICY "Authenticated users can manage shows" ON shows
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- Add columns to reviews table for tracking
-- =============================================

-- Add where_seen column (which show/event they attended)
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS where_seen TEXT;

-- Add how_found column (how they found Lana - social media, etc)
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS how_found TEXT;

-- =============================================
-- Grant permissions
-- =============================================

GRANT SELECT ON shows TO anon;
GRANT ALL ON shows TO authenticated;
