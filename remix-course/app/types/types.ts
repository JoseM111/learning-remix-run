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

// type for the remix DataFunctionArgs inside remix server functions
export type DataArgParams = {
  request: DataFunctionArgs['request'];
  params: DataFunctionArgs['params'];
  
};

