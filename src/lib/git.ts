import simpleGit from 'simple-git';
import { IGetCommitParams } from '../types';

const git = simpleGit();

export const getCommits = async (params: IGetCommitParams) => {
  return git.log(params);
};
