import { PlayerId } from '../../../../../shared/core/domain/PlayerId';

export class PostPlayerProfileRequestBody {
  //TODO playerId here should be string ? so also in CreatePlayerProfile it should be string, but than there is problem in CommandHandler :-/
  readonly playerId: PlayerId;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly emailAddress: string;
}
