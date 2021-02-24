import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';
import { PlayersWereMatchedIntoTeams } from './PlayersWereMatchedIntoTeams';
import { TournamentPair } from './TournamentPair';

export function matchPlayersFromEdges(
  command: { tournamentId: string; registeredPlayersIds: string[] },
  currentTime: Date,
): { events: DomainEvent[] } {
  return {
    events: [new PlayersWereMatchedIntoTeams(currentTime, command.tournamentId, matchFromEdges(command.registeredPlayersIds, []))],
  };
}

function matchFromEdges(unmatchedPlayers: string[], matchedPairs: TournamentPair[]): TournamentPair[] {
  if (unmatchedPlayers.length === 0) {
    return matchedPairs;
  }
  const pairPlayer1 = unmatchedPlayers[0];
  const pairPlayer2 = unmatchedPlayers[unmatchedPlayers.length - 1];
  const unmatched = unmatchedPlayers.pop();
  unmatchedPlayers.reverse().pop();
  unmatchedPlayers.reverse();
  return matchFromEdges(unmatchedPlayers, [...matchedPairs, new TournamentPair(pairPlayer1, pairPlayer2)]);
}
