// types.ts
import type { DataFunctionArgs } from '@remix-run/node';

export type NotesType = {
  id: string;
  title: string;
  content: string;
};

export type NotesListType = {
  notes: Array<NotesType>;
};

// type for the remix action function
export type ActionParams = {
  request: DataFunctionArgs['request'];
};
