import { ConventionalChangelogCommit } from '@conventional-commits/parser';
import { DefaultLogFields, ListLogLine } from 'simple-git';

export type CommitLog = DefaultLogFields & ListLogLine;

export type ParsedCommit = {
  author: string;
  date: Date;
  hash: string;
} & ConventionalChangelogCommit;
