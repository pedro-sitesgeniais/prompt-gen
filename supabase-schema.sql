-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create agent_type enum
CREATE TYPE agent_type AS ENUM ('analyzer', 'refactor', 'feature', 'debug', 'planner');

-- Prompts table
CREATE TABLE IF NOT EXISTS prompts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_type agent_type NOT NULL,
  user_query TEXT NOT NULL,
  generated_prompt TEXT NOT NULL,
  context JSONB,
  metadata JSONB
);

-- Templates table
CREATE TABLE IF NOT EXISTS templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  agent_type agent_type NOT NULL,
  template_content TEXT NOT NULL,
  tags TEXT[],
  is_public BOOLEAN DEFAULT false,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX IF NOT EXISTS prompts_user_id_idx ON prompts(user_id);
CREATE INDEX IF NOT EXISTS prompts_agent_type_idx ON prompts(agent_type);
CREATE INDEX IF NOT EXISTS prompts_created_at_idx ON prompts(created_at DESC);

CREATE INDEX IF NOT EXISTS templates_user_id_idx ON templates(user_id);
CREATE INDEX IF NOT EXISTS templates_agent_type_idx ON templates(agent_type);
CREATE INDEX IF NOT EXISTS templates_is_public_idx ON templates(is_public);
CREATE INDEX IF NOT EXISTS templates_tags_idx ON templates USING GIN(tags);

-- Row Level Security (RLS)
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for prompts
CREATE POLICY "Users can view their own prompts"
  ON prompts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own prompts"
  ON prompts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prompts"
  ON prompts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own prompts"
  ON prompts FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for templates
CREATE POLICY "Users can view their own templates and public templates"
  ON templates FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can insert their own templates"
  ON templates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates"
  ON templates FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates"
  ON templates FOR DELETE
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_prompts_updated_at BEFORE UPDATE ON prompts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
