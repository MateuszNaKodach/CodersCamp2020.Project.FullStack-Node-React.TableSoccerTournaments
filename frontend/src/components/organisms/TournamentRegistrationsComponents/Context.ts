import { createContext } from "react";

export const tournamentRegistrationsContext = {
  openCreatePlayerProfileForm: false,
  toggleOpenFormState: () => {},
  onPlayerProfileCreated: (name: string, surname: string) => {},
  registerPlayer: async (playerId: string) => {},
};

export const TournamentRegistrationsContext = createContext(
  tournamentRegistrationsContext
);
