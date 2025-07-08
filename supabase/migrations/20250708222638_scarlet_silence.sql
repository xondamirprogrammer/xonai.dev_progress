/*
  # Create AI agents contacts table

  1. New Tables
    - `ai_agents_contacts`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `service` (text, required)
      - `message` (text, required)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `ai_agents_contacts` table
    - Add policy for anonymous users to insert submissions
    - Add policy for authenticated users to read submissions
*/

CREATE TABLE IF NOT EXISTS ai_agents_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ai_agents_contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact form submissions
CREATE POLICY "Anyone can submit ai agents contact form"
  ON ai_agents_contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read contacts (for admin purposes)
CREATE POLICY "Authenticated users can read ai agents contacts"
  ON ai_agents_contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Trigger to automatically update updated_at
CREATE TRIGGER update_ai_agents_contacts_updated_at
  BEFORE UPDATE ON ai_agents_contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();