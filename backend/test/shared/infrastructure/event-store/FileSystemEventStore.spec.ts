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

    const eventStreamName = EventStreamName.from('PullRequest', uuidGenerator.generate());
    const events: StoreEvent[] = [pullRequestWasOpenedEvent(date)];
    await eventStore.write(eventStreamName, StreamVersion.notExists(), events);

    expect(await eventStore.read(eventStreamName)).toStrictEqual(new EventStream(eventStreamName, StreamVersion.exactly(0), events));
  });

  it('subscribe', async (done) => {
    const date = new Date();
    const directory = path.join(__dirname, 'event-store-files');
    const eventStore: EventStore & EventStoreSubscriptions = new FileSystemEventStore(directory);

    const eventStreamName = EventStreamName.from('PullRequest', uuidGenerator.generate());
    const pullRequestWasOpened = pullRequestWasOpenedEvent(date);
    const events: StoreEvent[] = [pullRequestWasOpened];

    await eventStore.subscribe((event) => {
      expect(event).toStrictEqual(pullRequestWasOpened);
      done();
    });

    await eventStore.write(eventStreamName, StreamVersion.notExists(), events);
  });
});

function pullRequestWasOpenedEvent(date: Date) {
  return {
    occurredAt: date,
    eventId: uuidGenerator.generate(),
    eventType: 'PullRequestWasOpened',
    data: { repositoryId: 'nowakprojects/eventmodeling-workshop', pullRequestId: 52, author: 'nowakprojects' },
  };
}
