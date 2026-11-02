# Samrudhi Backend Domain Modules Architecture

This directory establishes the enterprise domain module boundaries for Samrudhi:

- `workforce/`: Manages the 11 Departments, 194 Logical Positions, and Canonical Agent identities.
- `projects/`: Project decomposition, milestone DAG tracking, and delivery planning (OPS / PMG).
- `approvals/`: Human-in-the-Loop decision engine with digital signatures (Gates G0 through G5).
- `finance/`: Client billing, token burn cost attribution, and invoicing ledger (Department 09 FIN).
- `governance/`: Independent assurance, clinical accuracy verification, and S1-S4 incidents (Department 11 GOV).
- `notifications/`: Persistent multi-channel notification engine with deep-linking.
- `client-workspace/`: Tenant-scoped endpoints for the client portal.
