export type UserStatus =
  | 'Qualified'
  | 'Lead'
  | 'Closed'
  | 'Lost'
  | 'Negotiation'
  | 'Proposal';

export interface StatusDistribution {
  [key: string]: number;
}
