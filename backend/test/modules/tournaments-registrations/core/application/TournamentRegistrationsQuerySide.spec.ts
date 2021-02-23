import "jest-extended";
import { OpenTournamentRegistrations } from "../../../../../src/modules/tournaments-registrations/core/application/command/OpenTournamentRegistrations";
import { testTournamentsRegistrationsModule } from "./TestTournamentsRegistrationsModule";
import { FindAllTournamentRegistrations, FindAllTournamentRegistrationsResult } from "../../../../../src/modules/tournaments-registrations/core/application/query/FindAllTournamentRegistrations";
import { TournamentRegistrations } from "../../../../../src/modules/tournaments-registrations/core/domain/TournamentRegistrations";
import { TournamentId } from "../../../../../src/modules/tournaments-registrations/core/domain/TournamentId";
import { RegistrationsStatus } from "../../../../../src/modules/tournaments-registrations/core/domain/RegistrationsStatus";
import { FindTournamentRegistrationsById } from "../../../../../src/modules/tournaments-registrations/core/application/query/FindTournamentRegistrationsById";
import { PlayerId } from "../../../../../src/modules/tournaments-registrations/core/domain/PlayerId";
import { registerPlayerForTournament } from "./TestHelpers";

describe('Tournament Registrations | Query Side', () => {
  it('FindAllTournamentRegistrationsResult | No tournaments registrations', async () => {
    //Given
    const currentTime = new Date();
    const tournamentsRegistrations = testTournamentsRegistrationsModule(currentTime);
    const tournamentId = 'TournamentId';

    //When
    const findAllTournamentRegistrationsResult = await tournamentsRegistrations.executeQuery<FindAllTournamentRegistrationsResult>(
      new FindAllTournamentRegistrations(),
    );

    //Then
    expect(findAllTournamentRegistrationsResult).toBeEmpty();
  });

  it('FindAllTournamentRegistrationsResult | One tournament registrations was opened', async () => {
    //Given
    const currentTime = new Date();
    const tournamentsRegistrations = testTournamentsRegistrationsModule(currentTime);
    const tournamentId = 'TournamentId';

    const openTournamentRegistrations = new OpenTournamentRegistrations({ tournamentId });
    const commandResult = await tournamentsRegistrations.executeCommand(openTournamentRegistrations);

    //When
    const findAllTournamentRegistrationsResult = await tournamentsRegistrations.executeQuery<FindAllTournamentRegistrationsResult>(
      new FindAllTournamentRegistrations(),
    );

    //Then
    expect(findAllTournamentRegistrationsResult).toIncludeSameMembers([
      new TournamentRegistrations({
        tournamentId: TournamentId.from(tournamentId),
        status: RegistrationsStatus.OPENED,
        registeredPlayers: [],
      }),
    ]);
  });

  it('FindAllTournamentRegistrationsResult | Two tournaments registrations and some players registered', async () => {
    //Given
    const currentTime = new Date();
    const tournamentsRegistrations = testTournamentsRegistrationsModule(currentTime);

    const tournamentId1 = 'TournamentId1';
    const openTournamentRegistrations1 = new OpenTournamentRegistrations({ tournamentId: tournamentId1 });
    await tournamentsRegistrations.executeCommand(openTournamentRegistrations1);

    const tournamentId2 = 'TournamentId2';
    const openTournamentRegistrations2 = new OpenTournamentRegistrations({ tournamentId: tournamentId2 });
    await tournamentsRegistrations.executeCommand(openTournamentRegistrations2);

    const playerIdRegisteredForTournament2 = 'PlayerId';
    await registerPlayerForTournament(tournamentsRegistrations, playerIdRegisteredForTournament2, tournamentId2);

    //When
    const findAllTournamentRegistrationsResult = await tournamentsRegistrations.executeQuery<FindAllTournamentRegistrationsResult>(
      new FindAllTournamentRegistrations(),
    );

    //Then
    expect(findAllTournamentRegistrationsResult).toIncludeSameMembers([
      new TournamentRegistrations({
        tournamentId: TournamentId.from(tournamentId1),
        status: RegistrationsStatus.OPENED,
        registeredPlayers: [],
      }),
      new TournamentRegistrations({
        tournamentId: TournamentId.from(tournamentId2),
        status: RegistrationsStatus.OPENED,
        registeredPlayers: [PlayerId.from(playerIdRegisteredForTournament2)],
      }),
    ]);
  });

  it('FindTournamentRegistrationsById | Tournament id exists', async () => {
    //Given
    const currentTime = new Date();
    const tournamentsRegistrations = testTournamentsRegistrationsModule(currentTime);
    const tournamentId = 'TournamentId';

    const openTournamentRegistrations = new OpenTournamentRegistrations({ tournamentId });
    const commandResult = await tournamentsRegistrations.executeCommand(openTournamentRegistrations);

    //When
    const findTournamentRegistrationsByIdResult = await tournamentsRegistrations.executeQuery<FindTournamentRegistrationsById>(
      new FindTournamentRegistrationsById({ tournamentId }),
    );

    //Then
    expect(findTournamentRegistrationsByIdResult).toStrictEqual(
      new TournamentRegistrations({
        tournamentId: TournamentId.from(tournamentId),
        status: RegistrationsStatus.OPENED,
        registeredPlayers: [],
      }),
    );
  });

  it('FindTournamentRegistrationsById | Tournament id not exists', async () => {
    //Given
    const currentTime = new Date();
    const tournamentsRegistrations = testTournamentsRegistrationsModule(currentTime);
    const tournamentId = 'TournamentId';

    //When
    const findTournamentRegistrationsByIdResult = await tournamentsRegistrations.executeQuery<FindTournamentRegistrationsById>(
      new FindTournamentRegistrationsById({ tournamentId }),
    );

    //Then
    expect(findTournamentRegistrationsByIdResult).toBeUndefined();
  });
});
