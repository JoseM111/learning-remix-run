// notes.tsx
import { json, redirect } from '@remix-run/node';
import type { LinksFunction } from '@remix-run/node';
import { Link, useCatch, useLoaderData } from '@remix-run/react';
import type { ReactElement } from 'react';
import NewNotes, { links as newNoteLinks } from '~/components/new_notes/NewNotes';
import NotesList, {
  links as notesListLinks,
} from '~/components/notes_list/NotesList';
import { getStoredNotes, storeNotes } from '~/data/notes';
import type { ActionParams, NotesType } from '~/types/types';

// links function for NewNotesStyles
export const links: LinksFunction = () => {
  // merging the links from the NewNotes component
  // also called surfacing the links
  return [...newNoteLinks(), ...notesListLinks()];
};
// =========================================================

function NotesPage(): ReactElement {
  // Returns the JSON parsed data from the current route's loader data
  const loaderNotesData = useLoaderData();

  return (
    <main>
      {/*new-note component*/}
      <NewNotes />
      <NotesList notes={loaderNotesData} />
    </main>
  );
}

export default NotesPage;
// ########################################################

export async function loader() {
  const currentNotes = await getStoredNotes();

  if (!currentNotes || currentNotes.length === 0) {
    throw json(
      { message: '[ERROR:/notes]: NO NOTES WERE FOUND...' },
      { status: 404, statusText: 'NOT FOUND' },
    );
  }

  return json(currentNotes);
}

// action will only run in the server.
// not in the browser. remix will only
// execute & store this function in the server.
export async function action({ request }: ActionParams) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData) as NotesType;

  // validation of title length
  if (noteData.title.trim().length >= 5) {
    // get the existing notes
    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toISOString();

    // add the new note to the existing notes
    const updatedNotes = existingNotes.concat(noteData);

    // Since the reload is so fast we want t set a time-out
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 2000);
    });

    await storeNotes(updatedNotes);
    // if all goes well, redirect to the notes page
    return redirect('/notes');
  }

  // if the length is less than five characters, return an error message
  return {
    message: 'Title must be at least 5 characters long',
  };
}
// ########################################################

// @CatchBoundary: Catches any errors responses. Just like ErrorBoundary,
// you can add it on the route level or the root level (root.tsx)
export function CatchBoundary() {
  /** @useCatch: Returns the status code and thrown response data. */
  const caughtResponse = useCatch();
  const responseMessage = caughtResponse.data.message || 'No data found...';

  return (
    <main>
      {/* always shows the note card, if empty list or not */}
      <NewNotes />

      {/* if there is no notes, the response message will output */}
      <p className="info-message">{responseMessage}</p>
    </main>
  );
}
// ########################################################

// error boundary component. this component will only be
// used for this route. it will not be used globally unless
// the `ErrorBoundary` component is used in the `root.tsx` file
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <main className="error">
      <h1>[NOTES PAGE]: AN ERROR OCCURRED</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to="/">safety</Link>!
      </p>
    </main>
  );
}
// ########################################################
