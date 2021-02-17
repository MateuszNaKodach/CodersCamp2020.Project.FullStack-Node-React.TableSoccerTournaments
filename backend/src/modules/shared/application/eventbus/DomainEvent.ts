export interface DomainEvent {
  readonly eventType: string;
  readonly eventId: string;
  readonly occurredAt: Date;
}
