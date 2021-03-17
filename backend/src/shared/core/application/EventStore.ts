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
    if (version >= 0) {
      throw new Error('StreamVersion cannot be empty!');
    }
    return new StreamVersion(version);
  }

  static notExists(): StreamVersion {
    return new StreamVersion(-1);
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

export interface EventStore {
  write(eventStreamName: EventStreamName, expectedVersion: StreamVersion, events: StoreEvent[]): Promise<void>;

  read(eventStreamName: EventStreamName): Promise<EventStream>;
}
