-- ============================================================
-- INUNDE OPS — Initial Schema
-- Migration: 20260409000001_initial_schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── TENANTS ────────────────────────────────────────────────

CREATE TABLE tenants (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  logo_url      TEXT,
  primary_color TEXT DEFAULT '#4CC88A',
  settings_json JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── PROFILES ────────────────────────────────────────────────

CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL,
  phone       TEXT,
  role        TEXT NOT NULL DEFAULT 'support'
              CHECK (role IN ('admin','ceo','board_member','finance','operations',
                              'call_center','motorbike','marketing','auditor','support')),
  department  TEXT,
  status      TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive')),
  avatar_url  TEXT,
  last_seen   TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_profiles_tenant ON profiles(tenant_id);
CREATE INDEX idx_profiles_role ON profiles(role);

-- ─── PARTNERS ────────────────────────────────────────────────

CREATE TABLE partners (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id       UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  type            TEXT NOT NULL
                  CHECK (type IN ('restaurant','supplier','b2b_delivery','events','corporate')),
  contact_name    TEXT,
  phone           TEXT,
  email           TEXT,
  zone            TEXT,
  commission_pct  NUMERIC(5,2),
  commission_type TEXT,
  status          TEXT NOT NULL DEFAULT 'active'
                  CHECK (status IN ('active','inactive','pending')),
  balance         NUMERIC(15,2) NOT NULL DEFAULT 0,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_partners_tenant ON partners(tenant_id);
CREATE INDEX idx_partners_status ON partners(status);

-- ─── RIDERS ──────────────────────────────────────────────────

CREATE TABLE riders (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  profile_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  vehicle_type  TEXT NOT NULL,
  vehicle_plate TEXT,
  vehicle_brand TEXT,
  status        TEXT NOT NULL DEFAULT 'active'
                CHECK (status IN ('active','inactive','suspended')),
  hire_date     DATE NOT NULL DEFAULT CURRENT_DATE,
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_riders_tenant ON riders(tenant_id);
CREATE INDEX idx_riders_status ON riders(status);

-- ─── DELIVERIES ──────────────────────────────────────────────

CREATE TABLE deliveries (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id        UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  order_number     TEXT NOT NULL,
  source           TEXT NOT NULL
                   CHECK (source IN ('app','call_center','partner','b2b','terra_e_mar','other')),
  vertical         TEXT NOT NULL
                   CHECK (vertical IN ('icomida','ientrega','ieventos','ilugares')),
  customer_name    TEXT NOT NULL,
  customer_phone   TEXT NOT NULL,
  delivery_zone    TEXT NOT NULL,
  delivery_address TEXT,
  partner_id       UUID REFERENCES partners(id),
  rider_id         UUID REFERENCES riders(id),
  status           TEXT NOT NULL DEFAULT 'received'
                   CHECK (status IN ('received','preparing','assigned','in_route',
                                     'completed','failed','cancelled','refunded')),
  requested_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  assigned_at      TIMESTAMPTZ,
  departed_at      TIMESTAMPTZ,
  completed_at     TIMESTAMPTZ,
  delivery_value   NUMERIC(15,2) NOT NULL DEFAULT 0,
  operational_cost NUMERIC(15,2),
  commission       NUMERIC(15,2),
  failure_reason   TEXT,
  delay_reason     TEXT,
  distance_km      NUMERIC(6,2),
  notes            TEXT,
  created_by       UUID NOT NULL REFERENCES profiles(id),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_deliveries_tenant ON deliveries(tenant_id);
CREATE INDEX idx_deliveries_status ON deliveries(status);
CREATE INDEX idx_deliveries_rider ON deliveries(rider_id);
CREATE INDEX idx_deliveries_created ON deliveries(created_at DESC);

-- Auto-generate order number
CREATE SEQUENCE delivery_order_seq START 1001;
ALTER TABLE deliveries ALTER COLUMN order_number SET DEFAULT 'DEL-' || nextval('delivery_order_seq');

-- ─── CALLS ───────────────────────────────────────────────────

CREATE TABLE calls (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id       UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  operator_id     UUID NOT NULL REFERENCES profiles(id),
  call_datetime   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  customer_phone  TEXT NOT NULL,
  customer_name   TEXT,
  zone            TEXT,
  order_type      TEXT,
  source          TEXT,
  notes           TEXT,
  rider_id        UUID REFERENCES riders(id),
  delivery_id     UUID REFERENCES deliveries(id),
  outcome         TEXT NOT NULL
                  CHECK (outcome IN ('converted','failed','info','complaint','no_answer')),
  failure_reason  TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_calls_tenant ON calls(tenant_id);
CREATE INDEX idx_calls_operator ON calls(operator_id);
CREATE INDEX idx_calls_datetime ON calls(call_datetime DESC);

-- ─── FINANCIAL ENTRIES ───────────────────────────────────────

CREATE TABLE financial_entries (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id       UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  entry_type      TEXT NOT NULL CHECK (entry_type IN ('income','expense','transfer')),
  category        TEXT NOT NULL,
  subcategory     TEXT,
  vertical        TEXT CHECK (vertical IN ('icomida','ientrega','ieventos','ilugares')),
  origin          TEXT,
  amount          NUMERIC(15,2) NOT NULL CHECK (amount > 0),
  currency        TEXT NOT NULL DEFAULT 'XOF' CHECK (currency IN ('XOF','EUR')),
  payment_method  TEXT NOT NULL
                  CHECK (payment_method IN ('orange_money','teletaku','cash','transfer','other')),
  reference_id    UUID,
  reference_type  TEXT,
  description     TEXT NOT NULL,
  receipt_url     TEXT,
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','approved','rejected')),
  created_by      UUID NOT NULL REFERENCES profiles(id),
  approved_by     UUID REFERENCES profiles(id),
  approved_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_financial_tenant ON financial_entries(tenant_id);
CREATE INDEX idx_financial_type ON financial_entries(entry_type);
CREATE INDEX idx_financial_status ON financial_entries(status);
CREATE INDEX idx_financial_created ON financial_entries(created_at DESC);

-- ─── RIDER EXPENSES ──────────────────────────────────────────

CREATE TABLE rider_expenses (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  rider_id      UUID NOT NULL REFERENCES riders(id) ON DELETE CASCADE,
  expense_type  TEXT NOT NULL CHECK (expense_type IN ('fuel','maintenance','other')),
  amount        NUMERIC(15,2) NOT NULL CHECK (amount > 0),
  description   TEXT,
  receipt_url   TEXT,
  status        TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','approved','rejected')),
  expense_date  DATE NOT NULL DEFAULT CURRENT_DATE,
  created_by    UUID NOT NULL REFERENCES profiles(id),
  approved_by   UUID REFERENCES profiles(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_rider_expenses_rider ON rider_expenses(rider_id);
CREATE INDEX idx_rider_expenses_status ON rider_expenses(status);

-- ─── SHAREHOLDER CAPITAL ─────────────────────────────────────

CREATE TABLE shareholder_capital (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id            UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  shareholder_name     TEXT NOT NULL,
  shareholder_role     TEXT,
  entry_type           TEXT NOT NULL
                       CHECK (entry_type IN ('investment','loan','operational_cover')),
  amount               NUMERIC(15,2) NOT NULL CHECK (amount > 0),
  currency             TEXT NOT NULL DEFAULT 'XOF' CHECK (currency IN ('XOF','EUR')),
  purpose              TEXT,
  destination          TEXT,
  receipt_url          TEXT,
  reimbursable         BOOLEAN NOT NULL DEFAULT FALSE,
  reimbursement_status TEXT DEFAULT 'pending'
                       CHECK (reimbursement_status IN ('pending','partial','completed','waived')),
  notes                TEXT,
  entry_date           DATE NOT NULL DEFAULT CURRENT_DATE,
  created_by           UUID NOT NULL REFERENCES profiles(id),
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_shareholder_capital_tenant ON shareholder_capital(tenant_id);

-- ─── DEBTS ───────────────────────────────────────────────────

CREATE TABLE debts (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id            UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  direction            TEXT NOT NULL CHECK (direction IN ('receivable','payable')),
  debtor_creditor_name TEXT NOT NULL,
  debtor_type          TEXT NOT NULL
                       CHECK (debtor_type IN ('customer','partner','rider','shareholder','other')),
  amount               NUMERIC(15,2) NOT NULL CHECK (amount > 0),
  currency             TEXT NOT NULL DEFAULT 'XOF' CHECK (currency IN ('XOF','EUR')),
  origin               TEXT,
  reason               TEXT NOT NULL,
  due_date             DATE,
  status               TEXT NOT NULL DEFAULT 'pending'
                       CHECK (status IN ('pending','partial','settled','cancelled')),
  notes                TEXT,
  created_by           UUID NOT NULL REFERENCES profiles(id),
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_debts_tenant ON debts(tenant_id);
CREATE INDEX idx_debts_status ON debts(status);
CREATE INDEX idx_debts_due_date ON debts(due_date);

-- ─── DEBT PAYMENTS ───────────────────────────────────────────

CREATE TABLE debt_payments (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  debt_id      UUID NOT NULL REFERENCES debts(id) ON DELETE CASCADE,
  amount_paid  NUMERIC(15,2) NOT NULL CHECK (amount_paid > 0),
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  method       TEXT NOT NULL,
  notes        TEXT,
  created_by   UUID NOT NULL REFERENCES profiles(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_debt_payments_debt ON debt_payments(debt_id);

-- ─── ATTENDANCE ──────────────────────────────────────────────

CREATE TABLE attendance (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  profile_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date          DATE NOT NULL DEFAULT CURRENT_DATE,
  check_in      TIMESTAMPTZ,
  check_out     TIMESTAMPTZ,
  status        TEXT NOT NULL DEFAULT 'present'
                CHECK (status IN ('present','late','absent')),
  justification TEXT,
  notes         TEXT,
  UNIQUE (profile_id, date)
);

CREATE INDEX idx_attendance_tenant ON attendance(tenant_id);
CREATE INDEX idx_attendance_date ON attendance(date DESC);

-- ─── AUDIT LOGS (immutable) ───────────────────────────────────

CREATE TABLE audit_logs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id       UUID NOT NULL,
  user_id         UUID NOT NULL,
  action          TEXT NOT NULL,
  entity_type     TEXT NOT NULL,
  entity_id       UUID NOT NULL,
  old_values_json JSONB,
  new_values_json JSONB,
  ip_address      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_tenant ON audit_logs(tenant_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- Helper function: get the current user's tenant_id
CREATE OR REPLACE FUNCTION get_user_tenant_id()
RETURNS UUID AS $$
  SELECT tenant_id FROM profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- updated_at trigger function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_deliveries_updated_at
  BEFORE UPDATE ON deliveries
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_financial_entries_updated_at
  BEFORE UPDATE ON financial_entries
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
