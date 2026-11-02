import { DepartmentCode, CompetencyLevel, AuthorityTier, FulfillmentType, RuntimeStatus, GateLevel, ApprovalDecision, NotificationPriority } from '../enums'

export interface PositionRegistryRecord {
  code: string;                          // e.g. 'CRT-008'
  departmentCode: DepartmentCode;        // 'CRT'
  title: string;                         // 'Healthcare Medical Copywriter'
  competencyLevel: CompetencyLevel;      // 'C3'
  authorityTier: AuthorityTier;          // 'P3'
  canonicalAgentId?: string | null;      // 'SAM-AG-082'
  canonicalAgentName?: string | null;    // 'Lekha'
  isActive: boolean;                     // true for pilot, false for inactive
  fulfillmentType: FulfillmentType;      // AGENT, HUMAN_OPERATOR, UNASSIGNED, HYBRID
  runtimeStatus: RuntimeStatus;          // AVAILABLE, DISABLED, MAINTENANCE
  inputContractSchema: Record<string, any>;
  outputContractSchema: Record<string, any>;
  evaluatorPositionCode?: string | null; // e.g. 'GOV-012'
}

export interface ApprovalRequestRecord {
  id: string;
  taskId: string;
  projectId: string;
  tenantId: string;
  gateLevel: GateLevel;
  decision: ApprovalDecision;
  assignedReviewerRole: string;
  decidedByUserId?: string | null;
  decisionNotes?: string | null;
  diffPayloadSnapshot: Record<string, any>;
  createdAt: string;
  decidedAt?: string | null;
}

export interface NotificationRecord {
  id: string;
  tenantId?: string | null;
  recipientUserId?: string | null;
  recipientRole?: string | null;
  category: 'APPROVAL' | 'TASK' | 'MESSAGE' | 'ESCALATION' | 'INCIDENT' | 'FINANCE';
  priority: NotificationPriority;
  title: string;
  message: string;
  entityType: 'PROJECT' | 'TASK' | 'APPROVAL' | 'INVOICE' | 'MESSAGE' | 'INCIDENT';
  entityId: string;
  targetUrl: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string | null;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  correlationId: string;
  timestamp: string;
}
