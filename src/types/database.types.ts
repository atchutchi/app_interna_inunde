export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          check_in: string | null
          check_out: string | null
          date: string
          id: string
          justification: string | null
          notes: string | null
          profile_id: string
          status: string
          tenant_id: string
        }
        Insert: {
          check_in?: string | null
          check_out?: string | null
          date?: string
          id?: string
          justification?: string | null
          notes?: string | null
          profile_id: string
          status?: string
          tenant_id: string
        }
        Update: {
          check_in?: string | null
          check_out?: string | null
          date?: string
          id?: string
          justification?: string | null
          notes?: string | null
          profile_id?: string
          status?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          ip_address: string | null
          new_values_json: Json | null
          old_values_json: Json | null
          tenant_id: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          ip_address?: string | null
          new_values_json?: Json | null
          old_values_json?: Json | null
          tenant_id: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          ip_address?: string | null
          new_values_json?: Json | null
          old_values_json?: Json | null
          tenant_id?: string
          user_id?: string
        }
        Relationships: []
      }
      calls: {
        Row: {
          call_datetime: string
          created_at: string
          customer_name: string | null
          customer_phone: string
          delivery_id: string | null
          failure_reason: string | null
          id: string
          notes: string | null
          operator_id: string
          order_type: string | null
          outcome: string
          rider_id: string | null
          source: string | null
          tenant_id: string
          zone: string | null
        }
        Insert: {
          call_datetime?: string
          created_at?: string
          customer_name?: string | null
          customer_phone: string
          delivery_id?: string | null
          failure_reason?: string | null
          id?: string
          notes?: string | null
          operator_id: string
          order_type?: string | null
          outcome: string
          rider_id?: string | null
          source?: string | null
          tenant_id: string
          zone?: string | null
        }
        Update: {
          call_datetime?: string
          created_at?: string
          customer_name?: string | null
          customer_phone?: string
          delivery_id?: string | null
          failure_reason?: string | null
          id?: string
          notes?: string | null
          operator_id?: string
          order_type?: string | null
          outcome?: string
          rider_id?: string | null
          source?: string | null
          tenant_id?: string
          zone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calls_delivery_id_fkey"
            columns: ["delivery_id"]
            isOneToOne: false
            referencedRelation: "deliveries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calls_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calls_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "riders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calls_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      debt_payments: {
        Row: {
          amount_paid: number
          created_at: string
          created_by: string
          debt_id: string
          id: string
          method: string
          notes: string | null
          payment_date: string
        }
        Insert: {
          amount_paid: number
          created_at?: string
          created_by: string
          debt_id: string
          id?: string
          method: string
          notes?: string | null
          payment_date?: string
        }
        Update: {
          amount_paid?: number
          created_at?: string
          created_by?: string
          debt_id?: string
          id?: string
          method?: string
          notes?: string | null
          payment_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "debt_payments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "debt_payments_debt_id_fkey"
            columns: ["debt_id"]
            isOneToOne: false
            referencedRelation: "debts"
            referencedColumns: ["id"]
          },
        ]
      }
      debts: {
        Row: {
          amount: number
          created_at: string
          created_by: string
          currency: string
          debtor_creditor_name: string
          debtor_type: string
          direction: string
          due_date: string | null
          id: string
          notes: string | null
          origin: string | null
          reason: string
          status: string
          tenant_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          created_by: string
          currency?: string
          debtor_creditor_name: string
          debtor_type: string
          direction: string
          due_date?: string | null
          id?: string
          notes?: string | null
          origin?: string | null
          reason: string
          status?: string
          tenant_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          created_by?: string
          currency?: string
          debtor_creditor_name?: string
          debtor_type?: string
          direction?: string
          due_date?: string | null
          id?: string
          notes?: string | null
          origin?: string | null
          reason?: string
          status?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "debts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "debts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      deliveries: {
        Row: {
          assigned_at: string | null
          commission: number | null
          completed_at: string | null
          created_at: string
          created_by: string
          customer_name: string
          customer_phone: string
          delay_reason: string | null
          delivery_address: string | null
          delivery_value: number
          delivery_zone: string
          departed_at: string | null
          distance_km: number | null
          failure_reason: string | null
          id: string
          notes: string | null
          operational_cost: number | null
          order_number: string
          partner_id: string | null
          requested_at: string
          rider_id: string | null
          source: string
          status: string
          tenant_id: string
          updated_at: string
          vertical: string
        }
        Insert: {
          assigned_at?: string | null
          commission?: number | null
          completed_at?: string | null
          created_at?: string
          created_by: string
          customer_name: string
          customer_phone: string
          delay_reason?: string | null
          delivery_address?: string | null
          delivery_value?: number
          delivery_zone: string
          departed_at?: string | null
          distance_km?: number | null
          failure_reason?: string | null
          id?: string
          notes?: string | null
          operational_cost?: number | null
          order_number?: string
          partner_id?: string | null
          requested_at?: string
          rider_id?: string | null
          source: string
          status?: string
          tenant_id: string
          updated_at?: string
          vertical: string
        }
        Update: {
          assigned_at?: string | null
          commission?: number | null
          completed_at?: string | null
          created_at?: string
          created_by?: string
          customer_name?: string
          customer_phone?: string
          delay_reason?: string | null
          delivery_address?: string | null
          delivery_value?: number
          delivery_zone?: string
          departed_at?: string | null
          distance_km?: number | null
          failure_reason?: string | null
          id?: string
          notes?: string | null
          operational_cost?: number | null
          order_number?: string
          partner_id?: string | null
          requested_at?: string
          rider_id?: string | null
          source?: string
          status?: string
          tenant_id?: string
          updated_at?: string
          vertical?: string
        }
        Relationships: [
          {
            foreignKeyName: "deliveries_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliveries_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliveries_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "riders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliveries_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_entries: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          category: string
          created_at: string
          created_by: string
          currency: string
          description: string
          entry_type: string
          id: string
          origin: string | null
          payment_method: string
          receipt_url: string | null
          reference_id: string | null
          reference_type: string | null
          status: string
          subcategory: string | null
          tenant_id: string
          updated_at: string
          vertical: string | null
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          category: string
          created_at?: string
          created_by: string
          currency?: string
          description: string
          entry_type: string
          id?: string
          origin?: string | null
          payment_method: string
          receipt_url?: string | null
          reference_id?: string | null
          reference_type?: string | null
          status?: string
          subcategory?: string | null
          tenant_id: string
          updated_at?: string
          vertical?: string | null
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          category?: string
          created_at?: string
          created_by?: string
          currency?: string
          description?: string
          entry_type?: string
          id?: string
          origin?: string | null
          payment_method?: string
          receipt_url?: string | null
          reference_id?: string | null
          reference_type?: string | null
          status?: string
          subcategory?: string | null
          tenant_id?: string
          updated_at?: string
          vertical?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_entries_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_entries_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_entries_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          balance: number
          commission_pct: number | null
          commission_type: string | null
          contact_name: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          status: string
          tenant_id: string
          type: string
          zone: string | null
        }
        Insert: {
          balance?: number
          commission_pct?: number | null
          commission_type?: string | null
          contact_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          status?: string
          tenant_id: string
          type: string
          zone?: string | null
        }
        Update: {
          balance?: number
          commission_pct?: number | null
          commission_type?: string | null
          contact_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          status?: string
          tenant_id?: string
          type?: string
          zone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partners_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string | null
          full_name: string
          id: string
          last_seen: string | null
          phone: string | null
          role: string
          status: string
          tenant_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          full_name: string
          id: string
          last_seen?: string | null
          phone?: string | null
          role?: string
          status?: string
          tenant_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          full_name?: string
          id?: string
          last_seen?: string | null
          phone?: string | null
          role?: string
          status?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      rider_expenses: {
        Row: {
          amount: number
          approved_by: string | null
          created_at: string
          created_by: string
          description: string | null
          expense_date: string
          expense_type: string
          id: string
          receipt_url: string | null
          rider_id: string
          status: string
          tenant_id: string
        }
        Insert: {
          amount: number
          approved_by?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          expense_date?: string
          expense_type: string
          id?: string
          receipt_url?: string | null
          rider_id: string
          status?: string
          tenant_id: string
        }
        Update: {
          amount?: number
          approved_by?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          expense_date?: string
          expense_type?: string
          id?: string
          receipt_url?: string | null
          rider_id?: string
          status?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rider_expenses_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rider_expenses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rider_expenses_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "riders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rider_expenses_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      riders: {
        Row: {
          created_at: string
          hire_date: string
          id: string
          notes: string | null
          profile_id: string
          status: string
          tenant_id: string
          vehicle_brand: string | null
          vehicle_plate: string | null
          vehicle_type: string
        }
        Insert: {
          created_at?: string
          hire_date?: string
          id?: string
          notes?: string | null
          profile_id: string
          status?: string
          tenant_id: string
          vehicle_brand?: string | null
          vehicle_plate?: string | null
          vehicle_type: string
        }
        Update: {
          created_at?: string
          hire_date?: string
          id?: string
          notes?: string | null
          profile_id?: string
          status?: string
          tenant_id?: string
          vehicle_brand?: string | null
          vehicle_plate?: string | null
          vehicle_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "riders_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "riders_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      shareholder_capital: {
        Row: {
          amount: number
          created_at: string
          created_by: string
          currency: string
          destination: string | null
          entry_date: string
          entry_type: string
          id: string
          notes: string | null
          purpose: string | null
          receipt_url: string | null
          reimbursable: boolean
          reimbursement_status: string | null
          shareholder_name: string
          shareholder_role: string | null
          tenant_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          created_by: string
          currency?: string
          destination?: string | null
          entry_date?: string
          entry_type: string
          id?: string
          notes?: string | null
          purpose?: string | null
          receipt_url?: string | null
          reimbursable?: boolean
          reimbursement_status?: string | null
          shareholder_name: string
          shareholder_role?: string | null
          tenant_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          created_by?: string
          currency?: string
          destination?: string | null
          entry_date?: string
          entry_type?: string
          id?: string
          notes?: string | null
          purpose?: string | null
          receipt_url?: string | null
          reimbursable?: boolean
          reimbursement_status?: string | null
          shareholder_name?: string
          shareholder_role?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shareholder_capital_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shareholder_capital_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
          primary_color: string | null
          settings_json: Json | null
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          primary_color?: string | null
          settings_json?: Json | null
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          primary_color?: string | null
          settings_json?: Json | null
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_tenant_id: { Args: never; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
