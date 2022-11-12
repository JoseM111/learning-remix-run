// notes.tsx
import { redirect } from '@remix-run/node';
import type { ReactElement } from "react"
import NewNotes, { links as newNoteLinks } from '~/components/new_notes/NewNotes';
import { getStoredNotes, storeNotes } from '~/data/notes';
import type { ActionParams } from '~/types/types';

function NotesPage(): ReactElement {
  return (
    <main>
      {/*new-note component*/}
      <NewNotes />
    </main>
  );
}

export default NotesPage;
// ########################################################

// action will only run in the server.
// not in the browser. remix will only
// execute & store this function in the server.
export async function action({ request }: ActionParams) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);

  // get the existing notes
  const existingNotes = await getStoredNotes();
  // add a new prototype property to the noteData object
  noteData.id = new Date().toISOString();

  // add the new note to the existing notes
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);

  // if all goes well, redirect to the notes page
  return redirect('/notes');
}

// links function for NewNotesStyles
export function links() {
  // merging the links from the NewNotes component
  // also called surfacing the links
  return [...newNoteLinks()];
}
