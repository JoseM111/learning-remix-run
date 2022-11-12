// notes.ts

import fs from 'fs/promises';
import type { NotesType } from '~/types/NotesType';

export async function getStoredNotes() {
  /**
   * @readFile: Asynchronously reads the entire contents of a file
   * */
  const rawFileContent = await fs.readFile('notes.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  //noinspection UnnecessaryLocalVariableJS
  const storedNotes = data.notes ?? [];
  return storedNotes;
}

export function storeNotes(notes: NotesType) {
  return fs.writeFile('notes.json', JSON.stringify({ notes: notes || [] }));
}
