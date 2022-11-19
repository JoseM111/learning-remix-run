// types.ts
import type { DataFunctionArgs } from '@remix-run/node';
import type { LoaderFunctionArgs } from "@remix-run/server-runtime/dist/router"

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

// type for the remix action function
export type LoadParams = {
  params: DataFunctionArgs['params'];
};


