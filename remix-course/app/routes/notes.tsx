// notes.tsx
import { redirect } from "@remix-run/node"
import type { ActionFunction } from '@remix-run/node';
import NewNotes, { links as newNoteLinks } from '~/components/new_notes/NewNotes';
import { getStoredNotes, storeNotes } from '~/data/notes';

// action will only run in the server.
// not in the browser. remix will only
// execute & store this function in the server.
export const action: ActionFunction = async ({ request }) => {
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
};

function NotesPage(): JSX.Element {
  return (
    <main>
      {/*new-note component*/}
      <NewNotes />
    </main>
  );
}

export default NotesPage;

// links function for NewNotesStyles
export function links() {
  // merging the links from the NewNotes component
  // also called surfacing the links
  return [...newNoteLinks()];
}
