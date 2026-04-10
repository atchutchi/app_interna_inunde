-- ============================================================
-- INUNDE OPS — Development Seed Data
-- ⚠️  DO NOT run in production
-- ============================================================

-- ─── SEED TENANT ─────────────────────────────────────────────

INSERT INTO tenants (id, name, slug, primary_color, settings_json) VALUES (
  '11111111-0000-0000-0000-000000000001',
  'INUNDE SARL',
  'inunde',
  '#4CC88A',
  '{"timezone": "Africa/Bissau", "currency": "XOF", "is_seed": true}'
);

-- ─── SEED USERS (auth.users) ─────────────────────────────────
-- Note: In real seeding via Supabase CLI, use supabase.auth.admin.createUser
-- These are placeholder UUIDs matching the profiles below.
-- Run: supabase db reset (which calls seed.sql after migrations)

-- ─── SEED PROFILES ───────────────────────────────────────────

INSERT INTO profiles (id, tenant_id, full_name, phone, role, department, status) VALUES
  -- Admin
  ('22222222-0000-0000-0000-000000000001',
   '11111111-0000-0000-0000-000000000001',
   'Admin INUNDE', '+245 966 000 001', 'admin', 'Tecnologia', 'active'),
  -- CEO
  ('22222222-0000-0000-0000-000000000002',
   '11111111-0000-0000-0000-000000000001',
   'Atchutchi Mané', '+245 966 000 002', 'ceo', 'Direcção', 'active'),
  -- Finance
  ('22222222-0000-0000-0000-000000000003',
   '11111111-0000-0000-0000-000000000001',
   'Fátima Djaló', '+245 966 000 003', 'finance', 'Financeiro', 'active'),
  -- Operations
  ('22222222-0000-0000-0000-000000000004',
   '11111111-0000-0000-0000-000000000001',
   'Mamadu Baldé', '+245 966 000 004', 'operations', 'Operações', 'active'),
  -- Call Center
  ('22222222-0000-0000-0000-000000000005',
   '11111111-0000-0000-0000-000000000001',
   'Aissatu Sanhá', '+245 966 000 005', 'call_center', 'Call Center', 'active'),
  -- Rider 1
  ('22222222-0000-0000-0000-000000000006',
   '11111111-0000-0000-0000-000000000001',
   'Braima Camará', '+245 966 000 006', 'motorbike', 'Motoboys', 'active'),
  -- Rider 2
  ('22222222-0000-0000-0000-000000000007',
   '11111111-0000-0000-0000-000000000001',
   'Idrissa Mendes', '+245 966 000 007', 'motorbike', 'Motoboys', 'active'),
  -- Rider 3
  ('22222222-0000-0000-0000-000000000008',
   '11111111-0000-0000-0000-000000000001',
   'Lamine Djassi', '+245 966 000 008', 'motorbike', 'Motoboys', 'active');

-- ─── SEED PARTNERS ───────────────────────────────────────────

INSERT INTO partners (id, tenant_id, name, type, contact_name, phone, zone, commission_pct, status) VALUES
  ('33333333-0000-0000-0000-000000000001',
   '11111111-0000-0000-0000-000000000001',
   'Restaurante Piquenos', 'restaurant', 'Carlos Gomes', '+245 966 100 001',
   'Bairro de Ajuda', 10.00, 'active'),
  ('33333333-0000-0000-0000-000000000002',
   '11111111-0000-0000-0000-000000000001',
   'Super Bom Preço', 'supplier', 'Maria João', '+245 966 100 002',
   'Bissau Velho', 8.50, 'active'),
  ('33333333-0000-0000-0000-000000000003',
   '11111111-0000-0000-0000-000000000001',
   'Hotel 24 de Setembro', 'corporate', 'Reception', '+245 966 100 003',
   'Centro', 12.00, 'active'),
  ('33333333-0000-0000-0000-000000000004',
   '11111111-0000-0000-0000-000000000001',
   'Terra e Mar Restaurant', 'restaurant', 'António Silva', '+245 966 100 004',
   'Bairro Militar', 10.00, 'active');

-- ─── SEED RIDERS ─────────────────────────────────────────────

INSERT INTO riders (id, tenant_id, profile_id, vehicle_type, vehicle_plate, vehicle_brand, status, hire_date) VALUES
  ('44444444-0000-0000-0000-000000000001',
   '11111111-0000-0000-0000-000000000001',
   '22222222-0000-0000-0000-000000000006',
   'motorbike', 'GBS-001-A', 'Honda CG 150', 'active', '2025-01-15'),
  ('44444444-0000-0000-0000-000000000002',
   '11111111-0000-0000-0000-000000000001',
   '22222222-0000-0000-0000-000000000007',
   'motorbike', 'GBS-002-B', 'Yamaha YBR 125', 'active', '2025-02-01'),
  ('44444444-0000-0000-0000-000000000003',
   '11111111-0000-0000-0000-000000000001',
   '22222222-0000-0000-0000-000000000008',
   'motorbike', 'GBS-003-C', 'Suzuki GS 125', 'active', '2025-03-10');

-- ─── SEED DELIVERIES ─────────────────────────────────────────

INSERT INTO deliveries (
  id, tenant_id, order_number, source, vertical,
  customer_name, customer_phone, delivery_zone, delivery_address,
  partner_id, rider_id, status, delivery_value, commission,
  requested_at, assigned_at, completed_at, created_by
) VALUES
  ('55555555-0000-0000-0000-000000000001',
   '11111111-0000-0000-0000-000000000001',
   'DEL-1001', 'app', 'icomida',
   'João Pereira', '+245 966 200 001', 'Bairro de Ajuda', 'Rua Principal, 12',
   '33333333-0000-0000-0000-000000000001',
   '44444444-0000-0000-0000-000000000001',
   'completed', 2500.00, 250.00,
   NOW() - INTERVAL '2 hours',
   NOW() - INTERVAL '90 minutes',
   NOW() - INTERVAL '30 minutes',
   '22222222-0000-0000-0000-000000000005'),

  ('55555555-0000-0000-0000-000000000002',
   '11111111-0000-0000-0000-000000000001',
   'DEL-1002', 'call_center', 'ientrega',
   'Aminata Baldé', '+245 966 200 002', 'Bandim', 'Mercado de Bandim',
   NULL,
   '44444444-0000-0000-0000-000000000002',
   'in_route', 1500.00, NULL,
   NOW() - INTERVAL '1 hour',
   NOW() - INTERVAL '45 minutes',
   NULL,
   '22222222-0000-0000-0000-000000000005'),

  ('55555555-0000-0000-0000-000000000003',
   '11111111-0000-0000-0000-000000000001',
   'DEL-1003', 'partner', 'icomida',
   'Suleimane Djaló', '+245 966 200 003', 'Bairro Militar', 'Rua do Porto, 5',
   '33333333-0000-0000-0000-000000000004',
   NULL,
   'received', 3000.00, 300.00,
   NOW() - INTERVAL '10 minutes',
   NULL,
   NULL,
   '22222222-0000-0000-0000-000000000005'),

  ('55555555-0000-0000-0000-000000000004',
   '11111111-0000-0000-0000-000000000001',
   'DEL-1004', 'app', 'icomida',
   'Mariama Camará', '+245 966 200 004', 'Centro', 'Av. Amilcar Cabral, 3',
   '33333333-0000-0000-0000-000000000001',
   '44444444-0000-0000-0000-000000000003',
   'completed', 2000.00, 200.00,
   NOW() - INTERVAL '3 hours',
   NOW() - INTERVAL '150 minutes',
   NOW() - INTERVAL '2 hours',
   '22222222-0000-0000-0000-000000000005'),

  ('55555555-0000-0000-0000-000000000005',
   '11111111-0000-0000-0000-000000000001',
   'DEL-1005', 'call_center', 'ientrega',
   'Bubacar Sá', '+245 966 200 005', 'São Paulo', 'Bairro São Paulo, 22',
   NULL,
   NULL,
   'failed', 1000.00, NULL,
   NOW() - INTERVAL '4 hours',
   NOW() - INTERVAL '200 minutes',
   NULL,
   '22222222-0000-0000-0000-000000000005');

-- ─── SEED CALLS ──────────────────────────────────────────────

INSERT INTO calls (
  tenant_id, operator_id, customer_phone, customer_name,
  zone, order_type, source, outcome, delivery_id, created_at
) VALUES
  ('11111111-0000-0000-0000-000000000001',
   '22222222-0000-0000-0000-000000000005',
   '+245 966 200 001', 'João Pereira',
   'Bairro de Ajuda', 'food', 'app', 'converted',
   '55555555-0000-0000-0000-000000000001',
   NOW() - INTERVAL '2 hours'),

  ('11111111-0000-0000-0000-000000000001',
   '22222222-0000-0000-0000-000000000005',
   '+245 966 300 001', 'Unknown Caller',
   'Bandim', NULL, 'call_center', 'no_answer',
   NULL,
   NOW() - INTERVAL '90 minutes'),

  ('11111111-0000-0000-0000-000000000001',
   '22222222-0000-0000-0000-000000000005',
   '+245 966 300 002', 'Cliente Info',
   NULL, NULL, 'call_center', 'info',
   NULL,
   NOW() - INTERVAL '1 hour');

-- ─── SEED FINANCIAL ENTRIES ───────────────────────────────────

INSERT INTO financial_entries (
  tenant_id, entry_type, category, subcategory, vertical,
  amount, currency, payment_method, description, status, created_by, created_at
) VALUES
  ('11111111-0000-0000-0000-000000000001',
   'income', 'delivery_commission', NULL, 'icomida',
   750.00, 'XOF', 'orange_money',
   'Comissões do dia — iComida',
   'approved', '22222222-0000-0000-0000-000000000003',
   NOW() - INTERVAL '1 day'),

  ('11111111-0000-0000-0000-000000000001',
   'expense', 'fuel', NULL, NULL,
   15000.00, 'XOF', 'cash',
   'Combustível motoboys — semana 14',
   'approved', '22222222-0000-0000-0000-000000000003',
   NOW() - INTERVAL '2 days'),

  ('11111111-0000-0000-0000-000000000001',
   'income', 'b2b_revenue', NULL, 'ientrega',
   45000.00, 'XOF', 'transfer',
   'Contrato mensal — Hotel 24 de Setembro',
   'approved', '22222222-0000-0000-0000-000000000003',
   NOW() - INTERVAL '3 days'),

  ('11111111-0000-0000-0000-000000000001',
   'expense', 'salaries', NULL, NULL,
   120000.00, 'XOF', 'orange_money',
   'Salários equipa call center — Março 2026',
   'pending', '22222222-0000-0000-0000-000000000003',
   NOW() - INTERVAL '1 day'),

  ('11111111-0000-0000-0000-000000000001',
   'income', 'partner_commission', NULL, 'icomida',
   8500.00, 'XOF', 'cash',
   'Comissão parceiro — Restaurante Piquenos',
   'approved', '22222222-0000-0000-0000-000000000003',
   NOW());

-- ─── SEED RIDER EXPENSES ──────────────────────────────────────

INSERT INTO rider_expenses (
  tenant_id, rider_id, expense_type, amount, description, status, expense_date, created_by
) VALUES
  ('11111111-0000-0000-0000-000000000001',
   '44444444-0000-0000-0000-000000000001',
   'fuel', 3500.00, 'Gasolina — semana 14',
   'approved', CURRENT_DATE - 2,
   '22222222-0000-0000-0000-000000000006'),

  ('11111111-0000-0000-0000-000000000001',
   '44444444-0000-0000-0000-000000000002',
   'fuel', 3000.00, 'Gasolina — semana 14',
   'pending', CURRENT_DATE - 1,
   '22222222-0000-0000-0000-000000000007'),

  ('11111111-0000-0000-0000-000000000001',
   '44444444-0000-0000-0000-000000000003',
   'maintenance', 8500.00, 'Troca de pneu traseiro',
   'approved', CURRENT_DATE - 5,
   '22222222-0000-0000-0000-000000000008');

-- ─── SEED SHAREHOLDER CAPITAL ─────────────────────────────────

INSERT INTO shareholder_capital (
  tenant_id, shareholder_name, shareholder_role, entry_type,
  amount, currency, purpose, reimbursable, reimbursement_status, entry_date, created_by
) VALUES
  ('11111111-0000-0000-0000-000000000001',
   'Atchutchi Mané', 'CEO & Fundador', 'investment',
   500000.00, 'XOF', 'Capital inicial de operações',
   FALSE, NULL, '2025-01-01',
   '22222222-0000-0000-0000-000000000002'),

  ('11111111-0000-0000-0000-000000000001',
   'Atchutchi Mané', 'CEO & Fundador', 'operational_cover',
   75000.00, 'XOF', 'Cobertura de despesas operacionais — Fevereiro 2026',
   TRUE, 'pending', '2026-02-15',
   '22222222-0000-0000-0000-000000000002');

-- ─── SEED DEBTS ───────────────────────────────────────────────

INSERT INTO debts (
  tenant_id, direction, debtor_creditor_name, debtor_type,
  amount, currency, reason, due_date, status, created_by
) VALUES
  ('11111111-0000-0000-0000-000000000001',
   'receivable', 'Hotel 24 de Setembro', 'partner',
   45000.00, 'XOF', 'Serviço de entregas — Fevereiro 2026',
   CURRENT_DATE + 15, 'pending',
   '22222222-0000-0000-0000-000000000003'),

  ('11111111-0000-0000-0000-000000000001',
   'payable', 'Fornecedor de Embalagens', 'partner',
   22000.00, 'XOF', 'Compra de embalagens biodegradáveis',
   CURRENT_DATE + 7, 'pending',
   '22222222-0000-0000-0000-000000000003');

-- ─── SEED ATTENDANCE ──────────────────────────────────────────

INSERT INTO attendance (tenant_id, profile_id, date, check_in, check_out, status) VALUES
  ('11111111-0000-0000-0000-000000000001',
   '22222222-0000-0000-0000-000000000005',
   CURRENT_DATE, NOW() - INTERVAL '6 hours', NULL, 'present'),
  ('11111111-0000-0000-0000-000000000001',
   '22222222-0000-0000-0000-000000000004',
   CURRENT_DATE, NOW() - INTERVAL '7 hours', NULL, 'present'),
  ('11111111-0000-0000-0000-000000000001',
   '22222222-0000-0000-0000-000000000003',
   CURRENT_DATE, NOW() - INTERVAL '6 hours 30 minutes', NULL, 'late');
