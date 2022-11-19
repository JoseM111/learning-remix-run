import type { LinksFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import type { ReactElement } from 'react';
import noteDetailsStyles from '~/styles/note-details.css';

// link to the dynamic route for notesId
export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: noteDetailsStyles }];
};
// =========================================================

function NotesDetailPage(): ReactElement {
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all notes</Link>
        </nav>

        {/* NOTES-TITLE */}
        <h1>NOTES TITLE</h1>

        <p id="note-details-content">NOTE CONTENT</p>
      </header>
    </main>
  );
}

export default NotesDetailPage;
// ########################################################
