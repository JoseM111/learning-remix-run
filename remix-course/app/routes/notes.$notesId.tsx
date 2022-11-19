import { json } from '@remix-run/node';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import type { ReactElement } from 'react';
import { getStoredNotes } from '~/data/notes';
import noteDetailsStyles from '~/styles/note-details.css';
import type { DataArgParams, NotesType } from '~/types/types';
// =========================================================

// link to the dynamic route for notesId
export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: noteDetailsStyles }];
};

export const meta: MetaFunction = ({ data }) => ({
  title: data.title as NotesType['title'],
  description: 'Manage your notes with ease.',
});

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

export async function loader({ params }: DataArgParams): Promise<string> {
  // fetching all entries from the notes.json
  // file of with our notes entry list
  const notes = await getStoredNotes();
  // notesId has to be the same name as notes.`$notesId`.tsx
  // in the dynamic route page name
  const notesId = params.notesId;

  // check if the note is === to the id in the dynamic
  // url when the card is clicked.
  const selectedNote: string = notes.find((note: NotesType) => {
    return note.id === notesId;
  });

  // if the note with the proper id is selected then an error: 404
  // will be thrown. so like for example going to route localhost:3000/notes/notes-1
  // should return the error component with the logic in the if statement
  if (!selectedNote) {
    throw json(
      { message: `COULD NOT FIND NOTE FOR ID: ${notesId}` },
      { status: 404 },
    );
  }

  // finally then return the selectedNote in your loader
  return selectedNote;
}

// ########################################################
