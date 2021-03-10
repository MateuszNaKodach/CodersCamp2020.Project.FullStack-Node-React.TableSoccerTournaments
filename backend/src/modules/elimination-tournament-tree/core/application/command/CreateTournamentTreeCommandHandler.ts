import {CreateTournamentTree} from "./CreateTournamentTree";
import {CommandResult} from "../../../../../shared/core/application/command/CommandResult";
import {CommandHandler} from "../../../../../shared/core/application/command/CommandHandler";
import {DomainEventPublisher} from "../../../../../shared/core/application/event/DomainEventBus";
import {CurrentTimeProvider} from "../../../../../shared/core/CurrentTimeProvider";
import {EntityIdGenerator} from "../../../../../shared/core/application/EntityIdGenerator";
import {TournamentTeam} from "../../domain/TournamentTeam";
import {TournamentTeamId} from "../../domain/TournamentTeamId";
import {createTournamentTree, TournamentTree} from "../../domain/TournamentTree";
import {TournamentTreeRepository} from "../TournamentTreeRepository";

export class CreateTournamentTreeCommandHandler implements CommandHandler<CreateTournamentTree> {
    constructor(
        private readonly eventPublisher: DomainEventPublisher,
        private readonly currentTimeProvider: CurrentTimeProvider,
        private readonly entityIdGenerator: EntityIdGenerator,
        private readonly repository: TournamentTreeRepository,

    ) {
    }

    async execute(command: CreateTournamentTree): Promise<CommandResult> {

        // ---------------
        // ! Konwersja typów tutaj!
        // ---------------

        console.log();

        const tournamentId = command.tournamentId;

        const tournamentTeams = command.tournamentTeams.map((team) => new TournamentTeam({teamId: TournamentTeamId.from(team.teamId)}));

        const commandForCreateTournamentTree = {tournamentId: tournamentId, tournamentTeams: tournamentTeams,}
        // const newCommand = {tournamentId: tournamentId, tournamentTeams: tournamentTeams,}

        // TODO: To co poniżej!
        // const tournamentTree: TournamentTree = {} as TournamentTree;
        const tournamentTree= await this.repository.findByTournamentTreeId(tournamentId);



        const {state, events} = createTournamentTree(tournamentTree, commandForCreateTournamentTree, this.currentTimeProvider,  this.entityIdGenerator);


// tree.giveMeThisThings();
        // const doublesTournament = await this.repository.findByTournamentId(tournamentId);
        //

        // const { state, events } = createTournamentTreeWithTeams(doublesTournament, command, this.currentTimeProvider(), this.entityIdGenerator);

        await this.repository.save(state);

        this.eventPublisher.publishAll(events);

        return CommandResult.success();
    }
}
