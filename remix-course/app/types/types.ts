// types.ts
import type { DataFunctionArgs } from "@remix-run/node"

export type NotesType = {
	title: string;
	content: string;
}

// type for the remix action function
export type ActionParams = {
	request: DataFunctionArgs['request'];
};
