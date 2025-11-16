export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type AgentType = 'analyzer' | 'refactor' | 'feature' | 'debug' | 'planner'

export interface Database {
  public: {
    Tables: {
      prompts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string | null
          agent_type: AgentType
          user_query: string
          generated_prompt: string
          context: Json | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string | null
          agent_type: AgentType
          user_query: string
          generated_prompt: string
          context?: Json | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string | null
          agent_type?: AgentType
          user_query?: string
          generated_prompt?: string
          context?: Json | null
          metadata?: Json | null
        }
      }
      templates: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string | null
          agent_type: AgentType
          template_content: string
          tags: string[] | null
          is_public: boolean
          user_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description?: string | null
          agent_type: AgentType
          template_content: string
          tags?: string[] | null
          is_public?: boolean
          user_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string | null
          agent_type?: AgentType
          template_content?: string
          tags?: string[] | null
          is_public?: boolean
          user_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
