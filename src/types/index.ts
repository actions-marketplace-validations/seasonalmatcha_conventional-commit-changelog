import { ConventionalChangelogCommit } from '@conventional-commits/parser';
import { DefaultLogFields, ListLogLine } from 'simple-git';

export type CommitLog = DefaultLogFields & ListLogLine;

export type ParsedCommit = {
  author: string;
  date: Date;
  hash: string;
} & ConventionalChangelogCommit;

export interface IGetCommitParams {
  from: string;
  to: string;
}

export type IndexedByType = Record<string, ParsedCommit[]>;

export type CommitSortOrder = 'asc' | 'desc';

export type CommitSorter = (a: ParsedCommit, b: ParsedCommit) => -1 | 1;

export type GroupLabel = {
  title: string;
  types: string[];
};

export type GenerateChangelog = (params: {
  commits: ParsedCommit[];
  repositoryUrl: string | null;
  typeLabels: GroupLabel[];
  emptyMessage?: string;
  sortOrder?: CommitSortOrder;
}) => string;

export type Config = {
  typeLabels: GroupLabel[];
  sortOrder?: CommitSortOrder;
};
