export enum DepartmentCode {
  CEO = 'CEO', // CEO Office & Enterprise Strategy (6 positions)
  SAL = 'SAL', // Sales & Business Development (13 positions)
  MKT = 'MKT', // Samrudhi Brand & Marketing (16 positions)
  CEX = 'CEX', // Client Experience & Accounts (16 positions)
  OPS = 'OPS', // Operations & Delivery (18 positions)
  CRT = 'CRT', // Creative, Content & Social (22 positions)
  PMG = 'PMG', // Paid Media, SEO & Growth (20 positions)
  DAT = 'DAT', // Analytics & Intelligence (19 positions)
  FIN = 'FIN', // Finance & Administration (20 positions)
  TEC = 'TEC', // Technology, MCP & AgentOps (24 positions)
  GOV = 'GOV'  // Independent Assurance (20 positions)
}

export enum CompetencyLevel {
  C0 = 'C0', // Awareness
  C1 = 'C1', // Basic Execution
  C2 = 'C2', // Intermediate Execution
  C3 = 'C3', // Advanced Execution
  C4 = 'C4', // Expert Domain Lead
  C5 = 'C5'  // Master / Autonomous Authority
}

export enum AuthorityTier {
  P1 = 'P1', // Executive (Strategic Direction / Reserved Arbitration)
  P2 = 'P2', // Managerial / Department Lead
  P3 = 'P3', // Operational Specialist
  P4 = 'P4'  // Independent Assurance / Audit
}

export enum GateLevel {
  G0 = 'G0', // Brief Ingestion & Feasibility Check
  G1 = 'G1', // Strategic Angle & Target Approval
  G2 = 'G2', // Draft Production & Creative Synthesis
  G3 = 'G3', // Internal Quality & Clinical Compliance Review (MANDATORY HITL)
  G4 = 'G4', // Client Deliverable Sign-off (PORTAL GATE)
  G5 = 'G5'  // Publishing, Performance Measurement & Billing Reconciliation
}

export enum FulfillmentType {
  AGENT = 'AGENT',                     // Staffed by an autonomous AI agent
  HUMAN_OPERATOR = 'HUMAN_OPERATOR',   // Staffed by a designated human operator
  UNASSIGNED = 'UNASSIGNED',           // Registered position awaiting activation
  HYBRID = 'HYBRID'                    // Collaborative human + agent pair
}

export enum RuntimeStatus {
  AVAILABLE = 'AVAILABLE',     // Active model runtime connected
  DISABLED = 'DISABLED',       // Inactive in current pilot phase
  MAINTENANCE = 'MAINTENANCE'  // Circuit breaker tripped or undergoing upgrade
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  BLOCKED = 'BLOCKED',
  REVISION_REQUESTED = 'REVISION_REQUESTED'
}

export enum ApprovalDecision {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REVISION_REQUESTED = 'REVISION_REQUESTED'
}

export enum NotificationPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}
