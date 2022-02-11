import simpleGit from 'simple-git';
import { IGetCommitParams } from '../types';

const git = simpleGit();

export const getCommits = async (params: IGetCommitParams) => {
  return git.log(params);
};

export const getRepositoryUrl = async (): Promise<string | null> => {
  const {
    values: {
      '.git/config': { 'remote.origin.url': remotes },
    },
  } = await git.listConfig();

  const remote = Array.isArray(remotes) ? remotes[0] : remotes;
  const sshRegex = /git@github\.com:(.+)\.git/;
  const httpRegex = /https:\/\/github\.com\/(.+)/;
  const replace = 'https://github.com/$1';

  for (const testRegex of [sshRegex, httpRegex]) {
    if (testRegex.test(remote)) {
      return remote.replace(sshRegex, replace);
    }
  }

  return null;
};
