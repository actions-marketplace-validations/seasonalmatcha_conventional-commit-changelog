import { Note } from '@conventional-commits/parser';
import { CommitSorter, CommitSortOrder, IndexedByType, ParsedCommit } from '../types';

const BREAKING_TYPE = 'breaking';
const BREAKING_CHANGE_TITLE = 'BREAKING CHANGE';

export const indexCommitByType = (commits: ParsedCommit[]) => {
  const indexedType = commits.reduce<IndexedByType>((indexed, commit) => {
    const { type, notes } = commit;
    const isBreaking = notes.some(({ title }: Note) => title === BREAKING_CHANGE_TITLE);
    const getType = isBreaking ? BREAKING_TYPE : type;
    const typeArray = [...(indexed[getType] || []), commit];
    return {
      ...indexed,
      [getType]: typeArray,
    };
  }, {});

  return indexedType;
};

export const sortCommitBy: Record<CommitSortOrder, CommitSorter> = {
  asc: ({ date: dateA }, { date: dateB }) => (dateA < dateB ? -1 : 1),
  desc: ({ date: dateA }, { date: dateB }) => (dateA > dateB ? -1 : 1),
};
