export type FollowUpType = 'introduction' | 'referral' | 'resume' | 'meeting' | 'other';

export interface FollowUpItem {
  id: string;
  contactId: string;
  contactName: string;
  type: FollowUpType;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  notes?: string;
  createdAt: string;
  updatedAt: string;
} 