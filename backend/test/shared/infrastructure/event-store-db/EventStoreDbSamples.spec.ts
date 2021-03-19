import { EventStoreDBClient, jsonEvent, FORWARDS, START, JSONEventType } from '@eventstore/db-client';
import express, { Express } from 'express';
import { ModuleRestApi } from '../../../../src/shared/presentation/rest-api/ModuleRestApi';
import YAML from 'yamljs';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { JSONEventData } from '@eventstore/db-client/dist/types';
import { JSONEventOptions } from '@eventstore/db-client/dist/events/jsonEvent';

const client = new EventStoreDBClient({
  endpoint: 'localhost:2113',
});

interface Reservation {
  reservationId: string;
  movieId: string;
  userId: string;
  seatId: string;
}

type SeatReservedEvent = JSONEventType<
  'seat-reserved',
  {
    reservationId: string;
    movieId: string;
    userId: string;
    seatId: string;
  }
>;

type SeatChangedEvent = JSONEventType<
  'seat-changed',
  {
    reservationId: string;
    newSeatId: string;
  }
>;

type ReservationEvents = SeatReservedEvent | SeatChangedEvent;

async function simpleTest(): Promise<void> {
  const streamName = 'booking-abc123';

  const event = jsonEvent<SeatReservedEvent>({
    type: 'seat-reserved',
    data: {
      reservationId: 'abc123',
      movieId: 'tt0368226',
      userId: 'nm0802995',
      seatId: '4b',
    },
  });

  const appendResult = await client.appendToStream(streamName, event);

  const events = await client.readStream<ReservationEvents>(streamName, {
    fromRevision: START,
    direction: FORWARDS,
    maxCount: 10,
  });

  const reservation = events.reduce<Partial<Reservation>>((acc, { event }) => {
    switch (event?.type) {
      case 'seat-reserved':
        return {
          ...acc,
          reservationId: event.data.reservationId,
          movieId: event.data.movieId,
          seatId: event.data.seatId,
          userId: event.data.userId,
        };
      case 'seat-changed': {
        return {
          ...acc,
          seatId: event.data.newSeatId,
        };
      }
      default:
        return acc;
    }
  }, {});
}

class OpenPullRequestUseCase {
  constructor(private readonly eventStore: EventStoreDBClient) {}

  async handle(command: OpenPullRequest) {
    const streamName = `PullRequest-${command.data.pullRequestId}`;
    const events = await this.eventStore.readStream<PullRequestEvents>(streamName, {
      fromRevision: START,
      direction: FORWARDS,
      maxCount: 10,
    });
  }
}

export interface Command<Type extends string = string, Data = any> {
  type: Type;
  data: Data;
}

type OpenPullRequest = Command<
  'OpenPullRequest',
  { repositoryId: string; pullRequestId: string; sourceBranch: string; targetBranch: string; author: string }
>;

type PullRequestWasOpened = JSONEventType<
  'PullRequestWasOpened',
  { repositoryId: string; pullRequestId: string; sourceBranch: string; targetBranch: string; author: string }
>;

type PullRequestEvents = PullRequestWasOpened;

const port = process.env.REST_API_PORT || process.env.PORT || 5000;

const server = express();
server.use(bodyParser.json());

server.post('/pull-request', (req, res) => {
  const command = req.body;
});

server.listen(port, () => {
  console.log(`[App]: REST API listening on port ${port}`);
});
