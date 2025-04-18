export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string | null
          avatar_url: string | null
          company_id: string | null
          role: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          company_id?: string | null
          role?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          company_id?: string | null
          role?: string | null
        }
      }
      companies: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          logo_url: string | null
          subscription_status: string
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          name: string
          logo_url?: string | null
          subscription_status?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          logo_url?: string | null
          subscription_status?: string
        }
      }
      skills: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          category: string
          description: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          name: string
          category: string
          description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          category?: string
          description?: string | null
        }
      }
      employee_skills: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          employee_id: string
          skill_id: string
          proficiency_level: number
          verified: boolean
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          employee_id: string
          skill_id: string
          proficiency_level: number
          verified?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          employee_id?: string
          skill_id?: string
          proficiency_level?: number
          verified?: boolean
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