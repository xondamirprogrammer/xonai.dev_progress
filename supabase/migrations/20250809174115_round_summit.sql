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

  3. Triggers
    - Add updated_at trigger
*/

-- Create the ai_agents_contacts table
CREATE TABLE IF NOT EXISTS ai_agents_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE ai_agents_contacts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can submit ai agents contact form"
  ON ai_agents_contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read ai agents contacts"
  ON ai_agents_contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_ai_agents_contacts_updated_at ON ai_agents_contacts;
CREATE TRIGGER update_ai_agents_contacts_updated_at
  BEFORE UPDATE ON ai_agents_contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();