import { GenerateChangelog, ParsedCommit } from '../types';
import { indexCommitByType, sortCommitBy } from '../utils';

const generateDetailBody = (body: string | null, refs: string[]) => {
  return `
  <details>
  <summary>Details</summary>
  ${body && `<p>${body}</p>\n`}  
  ${refs.length ? '<p>Notes:</p>\n' : ''}
  ${refs.length > 0 ? refs.map((ref) => `* ${ref}`).join('\n\n') : ''}
`;
};

const convertCommitToString = (
  { author, body, hash, references, scope: _scope, subject }: ParsedCommit,
  repoUrl: string | null,
) => {
  const commitUrl = repoUrl ? ` ([${author}](${repoUrl}/commit/${hash}))` : `(${author})`;
  const scope = _scope ? `**${_scope}:** ` : '';
  const refs = references.map(({ action, issue, prefix }) => `${action}: ${prefix}${issue}`);
  const details = generateDetailBody(body, refs);

  return `* ${scope}${subject}${commitUrl}${commitUrl}${details}`;
};

export const generateChangelog: GenerateChangelog = ({
  commits,
  typeLabels,
  repositoryUrl,
  sortOrder = 'desc',
  emptyMessage = 'No Changes',
}) => {
  const indexedByType = indexCommitByType(commits);
  const mapCommit = (commit: ParsedCommit) => convertCommitToString(commit, repositoryUrl);

  const changelog = typeLabels
    .map(({ title, types }) => {
      const typeCommits = types
        .map((type) => indexedByType[type] || [])
        .flat()
        .sort(sortCommitBy[sortOrder]);

      if (!typeCommits.length) {
        return null;
      }

      return [`## ${title}`, ...typeCommits.map(mapCommit)].join('\n');
    })
    .filter((block) => block !== null)
    .join('\n\n');

  return changelog || emptyMessage;
};
