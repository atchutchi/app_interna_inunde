-- ============================================================
-- INUNDE OPS — Row Level Security Policies
-- Migration: 20260409000002_rls_policies
-- ============================================================

-- ─── TENANTS ────────────────────────────────────────────────
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

-- Users can only see their own tenant
CREATE POLICY tenants_select ON tenants
  FOR SELECT USING (id = get_user_tenant_id());

-- Only admins can update tenant settings
CREATE POLICY tenants_update ON tenants
  FOR UPDATE USING (
    id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'ceo')
    )
  );

-- ─── PROFILES ────────────────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can see all profiles in their tenant
CREATE POLICY profiles_select ON profiles
  FOR SELECT USING (tenant_id = get_user_tenant_id());

-- Users can update their own profile
CREATE POLICY profiles_update_own ON profiles
  FOR UPDATE USING (id = auth.uid());

-- Admins can update any profile in the tenant
CREATE POLICY profiles_update_admin ON profiles
  FOR UPDATE USING (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles AS p
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'ceo')
    )
  );

-- Admins can insert new profiles
CREATE POLICY profiles_insert ON profiles
  FOR INSERT WITH CHECK (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles AS p
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'ceo')
    )
  );

-- ─── PARTNERS ────────────────────────────────────────────────
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- All authenticated users in the tenant can view partners
CREATE POLICY partners_select ON partners
  FOR SELECT USING (tenant_id = get_user_tenant_id());

-- Operations, admin, ceo can insert partners
CREATE POLICY partners_insert ON partners
  FOR INSERT WITH CHECK (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'ceo', 'operations')
    )
  );

-- Operations, admin, ceo can update partners
CREATE POLICY partners_update ON partners
  FOR UPDATE USING (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'ceo', 'operations')
    )
  );

-- Only admins can delete partners
CREATE POLICY partners_delete ON partners
  FOR DELETE USING (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'ceo')
    )
  );

-- ─── RIDERS ──────────────────────────────────────────────────
ALTER TABLE riders ENABLE ROW LEVEL SECURITY;

-- All tenant users can view riders
CREATE POLICY riders_select ON riders
  FOR SELECT USING (tenant_id = get_user_tenant_id());

-- Only admin/ceo/operations can insert/update/delete riders
CREATE POLICY riders_insert ON riders
  FOR INSERT WITH CHECK (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'ceo', 'operations')
    )
  );

CREATE POLICY riders_update ON riders
  FOR UPDATE USING (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'ceo', 'operations')
    )
  );

CREATE POLICY riders_delete ON riders
  FOR DELETE USING (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'ceo')
    )
  );

-- ─── DELIVERIES ──────────────────────────────────────────────
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;

-- All tenant users can view deliveries
-- Riders can only see their own deliveries
CREATE POLICY deliveries_select ON deliveries
  FOR SELECT USING (
    tenant_id = get_user_tenant_id()
    AND (
      -- Non-riders see all tenant deliveries
      EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role != 'motorbike'
      )
      OR
      -- Riders only see their own deliveries
      rider_id IN (
        SELECT r.id FROM riders r WHERE r.profile_id = auth.uid()
      )
    )
  );

-- Call center, operations, admin can create deliveries
CREATE POLICY deliveries_insert ON deliveries
  FOR INSERT WITH CHECK (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'ceo', 'operations', 'call_center')
    )
  );

-- Operations, admin can update deliveries; riders can update status of their own
CREATE POLICY deliveries_update ON deliveries
  FOR UPDATE USING (
    tenant_id = get_user_tenant_id()
    AND (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
          AND role IN ('admin', 'ceo', 'operations', 'call_center')
      )
      OR
      rider_id IN (
        SELECT r.id FROM riders r WHERE r.profile_id = auth.uid()
      )
    )
  );

-- Only admins can delete deliveries
CREATE POLICY deliveries_delete ON deliveries
  FOR DELETE USING (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'ceo')
    )
  );

-- ─── CALLS ───────────────────────────────────────────────────
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;

-- All tenant users (except motorbike) can view calls
CREATE POLICY calls_select ON calls
  FOR SELECT USING (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role != 'motorbike'
    )
  );

-- Call center, operations, admin can log calls
CREATE POLICY calls_insert ON calls
  FOR INSERT WITH CHECK (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'ceo', 'call_center', 'operations')
    )
  );

-- Operators can update their own calls; admins can update any
CREATE POLICY calls_update ON calls
  FOR UPDATE USING (
    tenant_id = get_user_tenant_id()
    AND (
      operator_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role IN ('admin', 'ceo')
      )
    )
  );

-- ─── FINANCIAL ENTRIES ───────────────────────────────────────
ALTER TABLE financial_entries ENABLE ROW LEVEL SECURITY;

-- Finance, CEO, admin, auditor can view entries
CREATE POLICY financial_entries_select ON financial_entries
  FOR SELECT USING (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'ceo', 'board_member', 'finance', 'auditor')
    )
  );

-- Finance, operations, admin can create entries
CREATE POLICY financial_entries_insert ON financial_entries
  FOR INSERT WITH CHECK (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'ceo', 'finance', 'operations')
    )
  );

-- Finance and admin can update entries (audit trail preserved)
CREATE POLICY financial_entries_update ON financial_entries
  FOR UPDATE USING (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'ceo', 'finance')
    )
  );

-- Only admins can delete entries
CREATE POLICY financial_entries_delete ON financial_entries
  FOR DELETE USING (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'ceo')
    )
  );

-- ─── RIDER EXPENSES ──────────────────────────────────────────
ALTER TABLE rider_expenses ENABLE ROW LEVEL SECURITY;

-- Riders see own expenses; finance/admin see all
CREATE POLICY rider_expenses_select ON rider_expenses
  FOR SELECT USING (
    tenant_id = get_user_tenant_id()
    AND (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
          AND role IN ('admin', 'ceo', 'finance', 'operations', 'auditor')
      )
      OR
      rider_id IN (
        SELECT r.id FROM riders r WHERE r.profile_id = auth.uid()
      )
    )
  );

-- Riders can submit their own expenses
CREATE POLICY rider_expenses_insert ON rider_expenses
  FOR INSERT WITH CHECK (
    tenant_id = get_user_tenant_id()
    AND (
      -- Admin/finance can insert for any rider
      EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
          AND role IN ('admin', 'ceo', 'finance', 'operations')
      )
      OR
      -- Riders insert for themselves
      rider_id IN (
        SELECT r.id FROM riders r WHERE r.profile_id = auth.uid()
      )
    )
  );

-- Finance/admin can approve expenses
CREATE POLICY rider_expenses_update ON rider_expenses
  FOR UPDATE USING (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'ceo', 'finance')
    )
  );

-- ─── SHAREHOLDER CAPITAL ─────────────────────────────────────
ALTER TABLE shareholder_capital ENABLE ROW LEVEL SECURITY;

-- Only CEO, board_member, admin, auditor can view
CREATE POLICY shareholder_capital_select ON shareholder_capital
  FOR SELECT USING (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'ceo', 'board_member', 'auditor')
    )
  );

-- Only CEO and admin can insert capital entries
CREATE POLICY shareholder_capital_insert ON shareholder_capital
  FOR INSERT WITH CHECK (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'ceo')
    )
  );

CREATE POLICY shareholder_capital_update ON shareholder_capital
  FOR UPDATE USING (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'ceo')
    )
  );

-- ─── DEBTS ───────────────────────────────────────────────────
ALTER TABLE debts ENABLE ROW LEVEL SECURITY;

-- Finance, CEO, admin, auditor can view debts
CREATE POLICY debts_select ON debts
  FOR SELECT USING (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'ceo', 'board_member', 'finance', 'auditor')
    )
  );

CREATE POLICY debts_insert ON debts
  FOR INSERT WITH CHECK (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'ceo', 'finance')
    )
  );

CREATE POLICY debts_update ON debts
  FOR UPDATE USING (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'ceo', 'finance')
    )
  );

CREATE POLICY debts_delete ON debts
  FOR DELETE USING (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'ceo')
    )
  );

-- ─── DEBT PAYMENTS ───────────────────────────────────────────
ALTER TABLE debt_payments ENABLE ROW LEVEL SECURITY;

-- Finance, CEO, admin, auditor can view debt payments
CREATE POLICY debt_payments_select ON debt_payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM debts d
      WHERE d.id = debt_payments.debt_id
        AND d.tenant_id = get_user_tenant_id()
    )
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'ceo', 'board_member', 'finance', 'auditor')
    )
  );

CREATE POLICY debt_payments_insert ON debt_payments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM debts d
      WHERE d.id = debt_payments.debt_id
        AND d.tenant_id = get_user_tenant_id()
    )
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'ceo', 'finance')
    )
  );

-- ─── ATTENDANCE ──────────────────────────────────────────────
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- HR, admin, managers can view all attendance; employees see own
CREATE POLICY attendance_select ON attendance
  FOR SELECT USING (
    tenant_id = get_user_tenant_id()
    AND (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
          AND role IN ('admin', 'ceo', 'operations')
      )
      OR profile_id = auth.uid()
    )
  );

-- Admin/operations can log attendance
CREATE POLICY attendance_insert ON attendance
  FOR INSERT WITH CHECK (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'ceo', 'operations')
    )
  );

CREATE POLICY attendance_update ON attendance
  FOR UPDATE USING (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'ceo', 'operations')
    )
  );

-- ─── AUDIT LOGS (read-only for authorized roles) ─────────────
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admin, ceo, auditor can read audit logs
CREATE POLICY audit_logs_select ON audit_logs
  FOR SELECT USING (
    tenant_id = get_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'ceo', 'auditor')
    )
  );

-- Insert is only done via SECURITY DEFINER functions (triggers)
-- No direct INSERT policy — controlled by triggers only
