import { DomainEvent } from '../../domain/event/DomainEvent';

export type DomainCommandResult<StateType> = {
  state: StateType;
  events: DomainEvent[];
};
