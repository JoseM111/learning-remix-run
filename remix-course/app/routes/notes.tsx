// notes.tsx
import NewNotes, { links as newNoteLinks } from '~/components/new_notes/NewNotes';

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
