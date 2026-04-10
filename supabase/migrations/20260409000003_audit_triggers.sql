-- ============================================================
-- INUNDE OPS — Audit Log Triggers
-- Migration: 20260409000003_audit_triggers
-- ============================================================

-- ─── AUDIT LOG TRIGGER FUNCTION ──────────────────────────────

CREATE OR REPLACE FUNCTION log_audit_event()
RETURNS TRIGGER AS $$
DECLARE
  v_tenant_id UUID;
  v_user_id   UUID;
  v_action    TEXT;
  v_old       JSONB;
  v_new       JSONB;
BEGIN
  -- Determine action
  IF TG_OP = 'INSERT' THEN
    v_action := 'INSERT';
    v_old    := NULL;
    v_new    := to_jsonb(NEW);
  ELSIF TG_OP = 'UPDATE' THEN
    v_action := 'UPDATE';
    v_old    := to_jsonb(OLD);
    v_new    := to_jsonb(NEW);
  ELSIF TG_OP = 'DELETE' THEN
    v_action := 'DELETE';
    v_old    := to_jsonb(OLD);
    v_new    := NULL;
  END IF;

  -- Get tenant_id from the row (all audited tables have tenant_id)
  IF TG_OP = 'DELETE' THEN
    v_tenant_id := OLD.tenant_id;
  ELSE
    v_tenant_id := NEW.tenant_id;
  END IF;

  -- Get current user
  v_user_id := auth.uid();

  -- If no user context (e.g., service role), use a nil UUID sentinel
  IF v_user_id IS NULL THEN
    v_user_id := '00000000-0000-0000-0000-000000000000';
  END IF;

  INSERT INTO audit_logs (
    tenant_id,
    user_id,
    action,
    entity_type,
    entity_id,
    old_values_json,
    new_values_json
  ) VALUES (
    v_tenant_id,
    v_user_id,
    v_action,
    TG_TABLE_NAME,
    COALESCE(
      (CASE WHEN TG_OP = 'DELETE' THEN OLD.id ELSE NEW.id END),
      '00000000-0000-0000-0000-000000000000'
    ),
    v_old,
    v_new
  );

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─── DELIVERIES AUDIT ─────────────────────────────────────────

CREATE TRIGGER audit_deliveries_insert
  AFTER INSERT ON deliveries
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_deliveries_update
  AFTER UPDATE ON deliveries
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_deliveries_delete
  AFTER DELETE ON deliveries
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

-- ─── FINANCIAL ENTRIES AUDIT ──────────────────────────────────

CREATE TRIGGER audit_financial_entries_insert
  AFTER INSERT ON financial_entries
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_financial_entries_update
  AFTER UPDATE ON financial_entries
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_financial_entries_delete
  AFTER DELETE ON financial_entries
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

-- ─── CALLS AUDIT ──────────────────────────────────────────────

CREATE TRIGGER audit_calls_insert
  AFTER INSERT ON calls
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_calls_update
  AFTER UPDATE ON calls
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

-- ─── RIDER EXPENSES AUDIT ─────────────────────────────────────

CREATE TRIGGER audit_rider_expenses_insert
  AFTER INSERT ON rider_expenses
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_rider_expenses_update
  AFTER UPDATE ON rider_expenses
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

-- ─── SHAREHOLDER CAPITAL AUDIT ────────────────────────────────

CREATE TRIGGER audit_shareholder_capital_insert
  AFTER INSERT ON shareholder_capital
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_shareholder_capital_update
  AFTER UPDATE ON shareholder_capital
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

-- ─── DEBTS AUDIT ──────────────────────────────────────────────

CREATE TRIGGER audit_debts_insert
  AFTER INSERT ON debts
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_debts_update
  AFTER UPDATE ON debts
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

-- ─── PROFILES AUDIT (sensitive field changes only) ────────────

CREATE OR REPLACE FUNCTION log_profile_changes()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log role or status changes (sensitive)
  IF OLD.role IS DISTINCT FROM NEW.role
     OR OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO audit_logs (
      tenant_id,
      user_id,
      action,
      entity_type,
      entity_id,
      old_values_json,
      new_values_json
    ) VALUES (
      NEW.tenant_id,
      COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000'),
      'UPDATE',
      'profiles',
      NEW.id,
      jsonb_build_object('role', OLD.role, 'status', OLD.status),
      jsonb_build_object('role', NEW.role, 'status', NEW.status)
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER audit_profiles_sensitive_update
  AFTER UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION log_profile_changes();
