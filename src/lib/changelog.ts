import { GenerateChangelog, ParsedCommit } from '../types';
import { indexCommitByType, sortCommitBy } from '../utils';

const generateDetailBody = (_body: string | null, _refs: string[]) => {
  if (!_body && !_refs.length) return '';

  const body = _body ? `<p>${_body}</p>${_refs.length > 0 ? '\n' : ''}` : '';
  const note = _refs.length ? '\n  <p>Notes:</p>\n' : '';
  const refs = _refs.length > 0 ? _refs.map((ref) => `  * ${ref}`).join('\n\n') : '';

  return `
  <details>
  <summary>Details</summary>
  ${body}${note}${refs}
  </details>
`;
};

const convertCommitToString = (
  { author, body, hash, references, scope: _scope, subject }: ParsedCommit,
  repoUrl: string | null,
) => {
  const commitUrl = repoUrl ? ` ([${author}](${repoUrl}/commit/${hash}))` : ` (${author})`;
  const scope = _scope ? `**${_scope}**: ` : '';
  const refs = references.map(({ action, issue, prefix }) => `${action}: ${prefix}${issue}`);
  const details = generateDetailBody(body, refs) || '';

  return `* ${scope}${subject}${commitUrl}${details}`;
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
