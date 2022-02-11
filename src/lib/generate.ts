import { getCommits, getRepositoryUrl, parseCommmits } from '.';
import { CommitLog, Generate } from '../types';
import { generateChangelog } from './changelog';
import { getConfig } from './config';

export const generate: Generate = async ({ from, to, configFile }) => {
  const config = getConfig(configFile);
  const commits = await getCommits({ from, to });
  const parsedCommits = parseCommmits(commits.all as CommitLog[]);
  const repositoryUrl = await getRepositoryUrl();
  return generateChangelog({ ...config, commits: parsedCommits, repositoryUrl });
};
