/**
 * Auto-generated Supabase types placeholder.
 *
 * After linking your Supabase project, regenerate with:
 *   npx supabase gen types typescript --project-id [ID] > src/types/database.types.ts
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          primary_color: string | null;
          settings_json: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          logo_url?: string | null;
          primary_color?: string | null;
          settings_json?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          logo_url?: string | null;
          primary_color?: string | null;
          settings_json?: Json | null;
          created_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          tenant_id: string;
          full_name: string;
          phone: string | null;
          role: string;
          department: string | null;
          status: string;
          avatar_url: string | null;
          last_seen: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          tenant_id: string;
          full_name: string;
          phone?: string | null;
          role?: string;
          department?: string | null;
          status?: string;
          avatar_url?: string | null;
          last_seen?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          full_name?: string;
          phone?: string | null;
          role?: string;
          department?: string | null;
          status?: string;
          avatar_url?: string | null;
          last_seen?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      deliveries: {
        Row: {
          id: string;
          tenant_id: string;
          order_number: string;
          source: string;
          vertical: string;
          customer_name: string;
          customer_phone: string;
          delivery_zone: string;
          delivery_address: string | null;
          partner_id: string | null;
          rider_id: string | null;
          status: string;
          requested_at: string;
          assigned_at: string | null;
          departed_at: string | null;
          completed_at: string | null;
          delivery_value: number;
          operational_cost: number | null;
          commission: number | null;
          failure_reason: string | null;
          delay_reason: string | null;
          distance_km: number | null;
          notes: string | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          order_number?: string;
          source: string;
          vertical: string;
          customer_name: string;
          customer_phone: string;
          delivery_zone: string;
          delivery_address?: string | null;
          partner_id?: string | null;
          rider_id?: string | null;
          status?: string;
          requested_at?: string;
          assigned_at?: string | null;
          departed_at?: string | null;
          completed_at?: string | null;
          delivery_value?: number;
          operational_cost?: number | null;
          commission?: number | null;
          failure_reason?: string | null;
          delay_reason?: string | null;
          distance_km?: number | null;
          notes?: string | null;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          order_number?: string;
          source?: string;
          vertical?: string;
          customer_name?: string;
          customer_phone?: string;
          delivery_zone?: string;
          delivery_address?: string | null;
          partner_id?: string | null;
          rider_id?: string | null;
          status?: string;
          requested_at?: string;
          assigned_at?: string | null;
          departed_at?: string | null;
          completed_at?: string | null;
          delivery_value?: number;
          operational_cost?: number | null;
          commission?: number | null;
          failure_reason?: string | null;
          delay_reason?: string | null;
          distance_km?: number | null;
          notes?: string | null;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      calls: {
        Row: {
          id: string;
          tenant_id: string;
          operator_id: string;
          call_datetime: string;
          customer_phone: string;
          customer_name: string | null;
          zone: string | null;
          order_type: string | null;
          source: string | null;
          notes: string | null;
          rider_id: string | null;
          delivery_id: string | null;
          outcome: string;
          failure_reason: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          operator_id: string;
          call_datetime?: string;
          customer_phone: string;
          customer_name?: string | null;
          zone?: string | null;
          order_type?: string | null;
          source?: string | null;
          notes?: string | null;
          rider_id?: string | null;
          delivery_id?: string | null;
          outcome: string;
          failure_reason?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          operator_id?: string;
          call_datetime?: string;
          customer_phone?: string;
          customer_name?: string | null;
          zone?: string | null;
          order_type?: string | null;
          source?: string | null;
          notes?: string | null;
          rider_id?: string | null;
          delivery_id?: string | null;
          outcome?: string;
          failure_reason?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      financial_entries: {
        Row: {
          id: string;
          tenant_id: string;
          entry_type: string;
          category: string;
          subcategory: string | null;
          vertical: string | null;
          origin: string | null;
          amount: number;
          currency: string;
          payment_method: string;
          reference_id: string | null;
          reference_type: string | null;
          description: string;
          receipt_url: string | null;
          status: string;
          created_by: string;
          approved_by: string | null;
          approved_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          entry_type: string;
          category: string;
          subcategory?: string | null;
          vertical?: string | null;
          origin?: string | null;
          amount: number;
          currency?: string;
          payment_method: string;
          reference_id?: string | null;
          reference_type?: string | null;
          description: string;
          receipt_url?: string | null;
          status?: string;
          created_by: string;
          approved_by?: string | null;
          approved_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          entry_type?: string;
          category?: string;
          subcategory?: string | null;
          vertical?: string | null;
          origin?: string | null;
          amount?: number;
          currency?: string;
          payment_method?: string;
          reference_id?: string | null;
          reference_type?: string | null;
          description?: string;
          receipt_url?: string | null;
          status?: string;
          created_by?: string;
          approved_by?: string | null;
          approved_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      partners: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          type: string;
          contact_name: string | null;
          phone: string | null;
          email: string | null;
          zone: string | null;
          commission_pct: number | null;
          commission_type: string | null;
          status: string;
          balance: number;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          name: string;
          type: string;
          contact_name?: string | null;
          phone?: string | null;
          email?: string | null;
          zone?: string | null;
          commission_pct?: number | null;
          commission_type?: string | null;
          status?: string;
          balance?: number;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          name?: string;
          type?: string;
          contact_name?: string | null;
          phone?: string | null;
          email?: string | null;
          zone?: string | null;
          commission_pct?: number | null;
          commission_type?: string | null;
          status?: string;
          balance?: number;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      riders: {
        Row: {
          id: string;
          tenant_id: string;
          profile_id: string;
          vehicle_type: string;
          vehicle_plate: string | null;
          vehicle_brand: string | null;
          status: string;
          hire_date: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          profile_id: string;
          vehicle_type: string;
          vehicle_plate?: string | null;
          vehicle_brand?: string | null;
          status?: string;
          hire_date?: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          profile_id?: string;
          vehicle_type?: string;
          vehicle_plate?: string | null;
          vehicle_brand?: string | null;
          status?: string;
          hire_date?: string;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      rider_expenses: {
        Row: {
          id: string;
          tenant_id: string;
          rider_id: string;
          expense_type: string;
          amount: number;
          description: string | null;
          receipt_url: string | null;
          status: string;
          expense_date: string;
          created_by: string;
          approved_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          rider_id: string;
          expense_type: string;
          amount: number;
          description?: string | null;
          receipt_url?: string | null;
          status?: string;
          expense_date?: string;
          created_by: string;
          approved_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          rider_id?: string;
          expense_type?: string;
          amount?: number;
          description?: string | null;
          receipt_url?: string | null;
          status?: string;
          expense_date?: string;
          created_by?: string;
          approved_by?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      shareholder_capital: {
        Row: {
          id: string;
          tenant_id: string;
          shareholder_name: string;
          shareholder_role: string | null;
          entry_type: string;
          amount: number;
          currency: string;
          purpose: string | null;
          destination: string | null;
          receipt_url: string | null;
          reimbursable: boolean;
          reimbursement_status: string | null;
          notes: string | null;
          entry_date: string;
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          shareholder_name: string;
          shareholder_role?: string | null;
          entry_type: string;
          amount: number;
          currency?: string;
          purpose?: string | null;
          destination?: string | null;
          receipt_url?: string | null;
          reimbursable?: boolean;
          reimbursement_status?: string | null;
          notes?: string | null;
          entry_date?: string;
          created_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          shareholder_name?: string;
          shareholder_role?: string | null;
          entry_type?: string;
          amount?: number;
          currency?: string;
          purpose?: string | null;
          destination?: string | null;
          receipt_url?: string | null;
          reimbursable?: boolean;
          reimbursement_status?: string | null;
          notes?: string | null;
          entry_date?: string;
          created_by?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      attendance: {
        Row: {
          id: string;
          tenant_id: string;
          profile_id: string;
          date: string;
          check_in: string | null;
          check_out: string | null;
          status: string;
          justification: string | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          profile_id: string;
          date?: string;
          check_in?: string | null;
          check_out?: string | null;
          status?: string;
          justification?: string | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          profile_id?: string;
          date?: string;
          check_in?: string | null;
          check_out?: string | null;
          status?: string;
          justification?: string | null;
          notes?: string | null;
        };
        Relationships: [];
      };
      debts: {
        Row: {
          id: string;
          tenant_id: string;
          direction: string;
          debtor_creditor_name: string;
          debtor_type: string;
          amount: number;
          currency: string;
          origin: string | null;
          reason: string;
          due_date: string | null;
          status: string;
          notes: string | null;
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          direction: string;
          debtor_creditor_name: string;
          debtor_type: string;
          amount: number;
          currency?: string;
          origin?: string | null;
          reason: string;
          due_date?: string | null;
          status?: string;
          notes?: string | null;
          created_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          direction?: string;
          debtor_creditor_name?: string;
          debtor_type?: string;
          amount?: number;
          currency?: string;
          origin?: string | null;
          reason?: string;
          due_date?: string | null;
          status?: string;
          notes?: string | null;
          created_by?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      debt_payments: {
        Row: {
          id: string;
          debt_id: string;
          amount_paid: number;
          payment_date: string;
          method: string;
          notes: string | null;
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          debt_id: string;
          amount_paid: number;
          payment_date?: string;
          method: string;
          notes?: string | null;
          created_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          debt_id?: string;
          amount_paid?: number;
          payment_date?: string;
          method?: string;
          notes?: string | null;
          created_by?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      audit_logs: {
        Row: {
          id: string;
          tenant_id: string;
          user_id: string;
          action: string;
          entity_type: string;
          entity_id: string;
          old_values_json: Json | null;
          new_values_json: Json | null;
          ip_address: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          user_id: string;
          action: string;
          entity_type: string;
          entity_id: string;
          old_values_json?: Json | null;
          new_values_json?: Json | null;
          ip_address?: string | null;
          created_at?: string;
        };
        Update: never;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_user_tenant_id: {
        Args: Record<string, never>;
        Returns: string;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
