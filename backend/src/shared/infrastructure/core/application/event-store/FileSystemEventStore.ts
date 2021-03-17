import {
  Subscription,
  EventStore,
  EventStream,
  EventStreamName,
  StoreEvent,
  StreamVersion,
  EventStoreSubscriptions,
  SubscriptionOptions,
} from '../../../../core/application/EventStore';
import * as fs from 'fs';
import path from 'path';
import * as chokidar from 'chokidar';

const fileExtension = '.json';

export class FileSystemEventStore implements EventStore, EventStoreSubscriptions {
  constructor(private readonly directory: string) {}

  async read(eventStreamName: EventStreamName): Promise<EventStream> {
    const allEventsFileNames = await fs.promises.readdir(this.directory);
    const streamEventsFileNames = allEventsFileNames.filter((eventFile) => eventFile.includes(eventStreamName.raw));
    const streamEvents = await Promise.all(streamEventsFileNames.map((eventFileName) => fileToEvent(this.directory, eventFileName)));
    return new EventStream(
      eventStreamName,
      streamEvents.length == 0 ? StreamVersion.notExists() : StreamVersion.exactly(streamEvents.length - 1),
      streamEvents,
    );
  }

  private async readAll(): Promise<EventStream> {
    const allEventsFileNames = await fs.promises.readdir(this.directory);
    const streamEvents = await Promise.all(allEventsFileNames.map((eventFileName) => fileToEvent(this.directory, eventFileName)));
    return new EventStream(
      EventStreamName.from('$internal', 'all'),
      streamEvents.length == 0 ? StreamVersion.notExists() : StreamVersion.exactly(streamEvents.length - 1),
      streamEvents,
    );
  }

  write(eventStreamName: EventStreamName, expectedVersion: StreamVersion, events: StoreEvent[]): Promise<void> {
    return Promise.all(events.map((event) => this.writeEvent(eventStreamName, expectedVersion, event))).then();
  }

  private async writeEvent(eventStreamName: EventStreamName, expectedVersion: StreamVersion, event: StoreEvent): Promise<void> {
    const globalOrder = (await this.readAll()).version.next();
    const currentStreamVersion = (await this.read(eventStreamName)).version;
    if (!currentStreamVersion.equals(expectedVersion)) {
      throw new Error('Cannot write event! Stream was modified concurrently!');
    }
    const filePath = path.join(
      this.directory,
      jsonFileName({
        globalOrder: globalOrder.raw,
        eventStreamName: eventStreamName.raw,
        streamVersion: currentStreamVersion.next().raw,
        eventType: event.eventType,
        timestamp: event.occurredAt.getTime(),
      }),
    );
    const eventJson = JSON.stringify(event);
    await fs.promises.writeFile(filePath, eventJson);
  }

  subscribe(subscriber: (event: StoreEvent) => any, options?: SubscriptionOptions): Subscription {
    const watcher = chokidar.watch(this.directory, { awaitWriteFinish: true }).on('add', async (filePath) => {
      if (options?.eventType) {
        if (filePath.includes(options?.eventType)) {
          const event = await filePathToEvent(filePath);
          subscriber(event);
        }
      } else {
        const event = await filePathToEvent(filePath);
        subscriber(event);
      }
    });
    return {
      unsubscribe(): Promise<void> {
        return watcher.close();
      },
    };
  }
}

function jsonFileName(props: {
  globalOrder: number;
  eventStreamName: string;
  streamVersion: number;
  eventType: string;
  timestamp: number;
}): string {
  return Object.values(props).reduce((p1, p2) => p1.toString() + '_' + p2.toString()) + fileExtension;
}

async function fileToEvent(directory: string, fileName: string): Promise<StoreEvent> {
  return filePathToEvent(path.join(directory, fileName));
}

async function filePathToEvent(filePath: string): Promise<StoreEvent> {
  const eventFileRawData = await fs.promises.readFile(filePath);
  const eventJson = JSON.parse(eventFileRawData.toString());
  return { ...eventJson, occurredAt: new Date(eventJson.occurredAt) } as StoreEvent;
}
