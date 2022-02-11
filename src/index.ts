import { getInput, setFailed, setOutput } from '@actions/core';
import path from 'path';
import { generate } from './lib/generate';

const run = async () => {
  try {
    const from = getInput('from');
    const to = getInput('to');
    const configFile = path.join(__dirname, 'defaultConfig.json');

    const changelog = await generate({ from, to, configFile });
    setOutput('changelog', changelog);
  } catch (error: any) {
    setFailed(error.message);
  }
};

run();
