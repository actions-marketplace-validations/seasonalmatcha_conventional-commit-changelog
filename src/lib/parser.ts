import { parser, toConventionalChangelogFormat } from '@conventional-commits/parser';
import { CommitLog, ParsedCommit } from '../types';

const parseCommit = ({ author_name, date, body, hash, message }: CommitLog): ParsedCommit => {
  try {
    const parsedMessage = parser(`${message}${body && `\n${body}`}`);
    const formattedLog = toConventionalChangelogFormat(parsedMessage);

    return {
      author: author_name,
      date: new Date(date),
      hash,
      ...formattedLog,
    };
  } catch (_) {
    return {
      author: author_name,
      date: new Date(date),
      hash,
      type: 'commit',
      body,
      scope: null,
      subject: message,
      merge: null,
      header: message,
      footer: null,
      notes: [],
      references: [],
      mentions: [],
      revert: null,
    };
  }
};

export const parseCommmits = (commits: CommitLog[]): ParsedCommit[] => {
  return commits.map(parseCommit);
};
