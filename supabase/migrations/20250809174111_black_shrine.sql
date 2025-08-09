/*
  # Create smart websites contacts table

  1. New Tables
    - `smart_websites_contacts`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `service` (text, required)
      - `message` (text, required)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `smart_websites_contacts` table
    - Add policy for anonymous users to insert submissions
    - Add policy for authenticated users to read submissions

  3. Triggers
    - Add updated_at trigger
*/

-- Create the smart_websites_contacts table
CREATE TABLE IF NOT EXISTS smart_websites_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE smart_websites_contacts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can submit smart websites contact form"
  ON smart_websites_contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read smart websites contacts"
  ON smart_websites_contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_smart_websites_contacts_updated_at ON smart_websites_contacts;
CREATE TRIGGER update_smart_websites_contacts_updated_at
  BEFORE UPDATE ON smart_websites_contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();