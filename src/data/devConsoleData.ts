import { contactInfo } from './contactInfo';

export interface DevConsoleCommand {
  command: string;
  response: string;
}

export const devConsoleCommands: Record<'en' | 'es', DevConsoleCommand[]> = {
  en: [
    {
      command: 'whoami',
      response: `Eng. ${contactInfo.shortName} · Full-Stack Software Engineer`,
    },
    {
      command: 'cat stack.txt',
      response: 'React · TypeScript · Node.js · Docker · Python',
    },
    {
      command: 'cat contact.txt',
      response: `${contactInfo.email} · ${contactInfo.phoneDisplay}`,
    },
    {
      command: 'ls ./portfolio',
      response: 'web apps · landing pages · automation · AI',
    },
  ],
  es: [
    {
      command: 'whoami',
      response: `Ing. ${contactInfo.shortName} · Ingeniero de Software Full-Stack`,
    },
    {
      command: 'cat stack.txt',
      response: 'React · TypeScript · Node.js · Docker · Python',
    },
    {
      command: 'cat contacto.txt',
      response: `${contactInfo.email} · ${contactInfo.phoneDisplay}`,
    },
    {
      command: 'ls ./portfolio',
      response: 'web apps · landing pages · automatización · IA',
    },
  ],
};
