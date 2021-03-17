import {
  EventStore,
  EventStoreSubscriptions,
  EventStream,
  EventStreamName,
  StoreEvent,
  StreamVersion,
} from '../../../../src/shared/core/application/EventStore';
import { FileSystemEventStore } from '../../../../src/shared/infrastructure/core/application/event-store/FileSystemEventStore';
import path from 'path';
import { UuidEntityIdGenerator } from '../../../../src/shared/infrastructure/core/application/UuidEntityIdGenerator';

const uuidGenerator: UuidEntityIdGenerator = new UuidEntityIdGenerator();

describe('FileSystemEventStore', () => {
  it('write and read event', async () => {
    const date = new Date();
    const directory = path.join(__dirname, 'event-store-files');
    const eventStore: EventStore = new FileSystemEventStore(directory);

    const eventStreamName = EventStreamName.from('SampleEventGroup', uuidGenerator.generate());
    const events: StoreEvent[] = [
      {
        occurredAt: date,
        eventId: uuidGenerator.generate(),
        eventType: 'PullRequestWasOpened',
        data: { repositoryId: 'nowakprojects/eventmodeling-workshop', pullRequestId: 52, author: 'nowakprojects' },
      },
    ];
    await eventStore.write(eventStreamName, StreamVersion.notExists(), events);

    expect(await eventStore.read(eventStreamName)).toStrictEqual(new EventStream(eventStreamName, StreamVersion.exactly(0), events));
  });

  it('subscribe', async (done) => {
    const date = new Date();
    const directory = path.join(__dirname, 'event-store-files');
    const eventStore: EventStore & EventStoreSubscriptions = new FileSystemEventStore(directory);

    const eventStreamName = EventStreamName.from('SampleEventGroup', uuidGenerator.generate());
    const events: StoreEvent[] = [
      {
        occurredAt: date,
        eventId: uuidGenerator.generate(),
        eventType: 'SampleEventType',
        data: { sampleKey: 'sampleValue' },
      },
    ];

    const receivedEvents: StoreEvent[] = [];
    await eventStore.subscribe((event) => {
      receivedEvents.push(event);
      console.log(event);
      expect(receivedEvents).toHaveLength(1);
      done();
    });
    await eventStore.write(eventStreamName, StreamVersion.notExists(), events);
  });
});
