import type { LinksFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/server-runtime/dist/router';
import type { ReactElement } from 'react';
import { getStoredNotes } from '~/data/notes';
import noteDetailsStyles from '~/styles/note-details.css';
import type { LoadParams, NotesType } from '~/types/types';

// link to the dynamic route for notesId
export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: noteDetailsStyles }];
};
// =========================================================

function NotesDetailPage(): ReactElement {
  // accessing the data from the load function
  const loadedNotesData = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all notes</Link>
        </nav>

        {/* NOTES-TITLE */}
        <h1>{loadedNotesData?.title ?? 'NO TITLE'}</h1>

        <p id="note-details-content">{loadedNotesData?.content ?? 'NO CONTENT'}</p>
      </header>
    </main>
  );
}

export default NotesDetailPage;
// ########################################################

export async function loader({ params }: LoadParams): Promise<string> {
  // fetching all entries from the notes.json
  // file of with our notes entry list
  const notes = await getStoredNotes();
  // notesId has to be the same name as notes.`$notesId`.tsx
  // in the dynamic route page name
  const notesId = params.notesId;

  // check if the note is === to the id in the dynamic
  // url when the card is clicked.
  const selectedNote: string = notes.find((note: NotesType) => note.id === notesId);

  // finally then return the selectedNote in your loader
  return selectedNote;
}
// ########################################################
