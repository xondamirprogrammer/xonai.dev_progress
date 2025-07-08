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