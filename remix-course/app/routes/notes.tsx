// notes.tsx
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { ReactElement } from 'react';
import NewNotes, { links as newNoteLinks } from '~/components/new_notes/NewNotes';
import NotesList, { links as notesListLinks } from '~/components/notes_list/NotesList';
import { getStoredNotes, storeNotes } from '~/data/notes';
import type { ActionParams, NotesType } from '~/types/types';

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

// links function for NewNotesStyles
export function links() {
  // merging the links from the NewNotes component
  // also called surfacing the links
  return [...newNoteLinks(), ...notesListLinks()];
}
