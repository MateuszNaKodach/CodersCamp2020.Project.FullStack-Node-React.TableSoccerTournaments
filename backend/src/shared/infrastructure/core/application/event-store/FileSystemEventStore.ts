import { EventStore, EventStream, EventStreamName, StoreEvent, StreamVersion } from '../../../../core/application/EventStore';
import * as fs from 'fs';
import path from 'path';

const fileExtension = '.json';

export class FileSystemEventStore implements EventStore {
  constructor(private readonly directory: string) {}

  async read(eventStreamName: EventStreamName): Promise<EventStream> {
    const globalOrder = 0;
    const allEventsFileNames = await fs.promises.readdir(this.directory);
    const streamEventsFileNames = allEventsFileNames.filter((eventFile) => eventFile.includes(eventStreamName.raw));
    const streamEvents = await Promise.all(streamEventsFileNames.map((eventFileName) => fileToEvent(this.directory, eventFileName)));
    return new EventStream(
      eventStreamName,
      streamEvents.length == 0 ? StreamVersion.notExists() : StreamVersion.exactly(streamEvents.length - 1),
      streamEvents,
    );
  }

  write(eventStreamName: EventStreamName, expectedVersion: StreamVersion, events: StoreEvent[]): Promise<void> {
    return Promise.all(events.map((event) => this.writeEvent(eventStreamName, expectedVersion, event))).then();
  }

  private async writeEvent(eventStreamName: EventStreamName, expectedVersion: StreamVersion, event: StoreEvent): Promise<void> {
    const fileName = path.join(
      this.directory,
      jsonFileName({
        globalOrder: 0,
        eventStreamName: eventStreamName.raw,
        streamVersion: 0,
        eventType: event.eventType,
        timestamp: event.occurredAt.getTime(),
      }),
    );
    const eventJson = JSON.stringify(event);
    await fs.promises.writeFile(fileName, eventJson);
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
  const eventFileRawData = await fs.promises.readFile(path.join(directory, fileName));
  const eventJson = JSON.parse(eventFileRawData.toString());
  return eventJson as StoreEvent;
}
