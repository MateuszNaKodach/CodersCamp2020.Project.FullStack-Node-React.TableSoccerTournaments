export interface DomainEvent {
  readonly eventId: string;
  readonly occurredAt: Date;
}
