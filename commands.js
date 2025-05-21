import 'dotenv/config';
import { capitalize, InstallGlobalCommands } from './utils.js';

function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

const QUOTE_COMMAND = {
  name: 'quote_challenge',
  description: 'Challenge to guess who said the quote',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
}

const ALL_COMMANDS = [QUOTE_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
