export class EventStreamName {
  private readonly TYPE = 'EventStreamName';

  private constructor(readonly raw: string) {}

  static from(group: string, instanceId: string): EventStreamName {
    if (instanceId.length <= 0) {
      throw new Error('EventStreamId cannot be empty!');
    }
    return new EventStreamName(group + '_' + instanceId);
  }
}

export class StreamVersion {
  private readonly TYPE = 'StreamVersion';

  private constructor(readonly raw: number) {}

  static exactly(version: number): StreamVersion {
    if (version < -1) {
      throw new Error('StreamVersion is invalid!');
    }
    return new StreamVersion(version);
  }

  static notExists(): StreamVersion {
    return new StreamVersion(-1);
  }

  next(): StreamVersion {
    return StreamVersion.exactly(this.raw + 1);
  }

  equals(other: StreamVersion | undefined) {
    return this.raw === other?.raw;
  }
}

export interface StoreEvent {
  readonly occurredAt: Date;
  readonly eventId: string;
  readonly eventType: string;
  readonly data: any;
}

export class EventStream {
  constructor(readonly id: EventStreamName, readonly version: StreamVersion, readonly events: StoreEvent[]) {}

  get exists(): boolean {
    return this.version.raw !== StreamVersion.notExists().raw;
  }
}

//TODO: Maybe change to CloudEvents
export interface EventStore {
  write(eventStreamName: EventStreamName, expectedVersion: StreamVersion, events: StoreEvent[]): Promise<void>;

  read(eventStreamName: EventStreamName): Promise<EventStream>;
}

export interface EventStoreSubscriptions {
  subscribe(subscriber: (event: StoreEvent) => any, options?: SubscriptionOptions): Subscription;
}

export interface SubscriptionOptions {
  eventType?: string;
}

export interface Subscription {
  unsubscribe(): Promise<void>;
}
