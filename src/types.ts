export enum Status {
  Open = "open",
  Solved = "solved",
}

export enum VictimFate {
  Murdered = "murdered",
  AttemptedMurder = "attemptedMurder",
  Missing = "missing",
  Injured = "injured",
}

export enum SuspectStatus {
  Confirmed = "confirmedAsPerp",
  Cleared = "cleared",
}

export interface Victim {
  name: string;
  mainImageUrl: string;
  fate: VictimFate;
}

export interface Suspect {
  name: string;
  status: SuspectStatus;
  mainImageUrl: string;
}

// TODO: Create util function to separate camel case terms into 2+ words
export enum CaseType {
  Murder = "murder",
  Disappearance = "disappearance",
  MD = "mysteriousDeath",
  Terrorism = "terrorism",
  Rape = "rape",
  Assassination = "assassination",
  AM = "attemptedMurder",
  MS = "massShooting",
}

export interface Case {
  id: number;
  threadId: number;
  title: string;
  summary?: string;
  location: string;
  mainImageUrl?: string;
  status: Status;
  buzzing?: boolean;
  victims: Victim[];
  suspects?: Suspect[];
  caseTypes: CaseType[];
}

export enum SearchFilter {
  All = "all",
  Location = "location",
  Case = "case",
  Victims = "victims",
  Suspect = "suspect",
}
