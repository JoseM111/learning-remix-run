import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react';
import MainNavigation from '~/components/main_nav/MainNavigation';
import mainStyles from '~/styles/main.css';

// links function for mainStyles
export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: mainStyles }];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});
// =========================================================

export default function App() {
  return (
    <html lang="en">
      <head>
        {/* Renders the <title> and <meta> tags for the current routes */}
        <Meta />
        {/* Renders the <link> tags for the current routes */}
        <Links />
        <title>Remix Run</title>
      </head>
      <body>
        {/* main-nav component */}
        <header>
          <MainNavigation />
        </header>

        {/* outlet for the content/children*/}
        <Outlet />

        {/* This component will emulate the browser's
         scroll restoration on location changes */}
        <ScrollRestoration />

        {/* Renders the <script> tags needed for the initial render.
         Bundles for additional routes are loaded later as needed */}
        <Scripts />

        {/* This component will reload the page when the server restarts */}
        <LiveReload />
      </body>
    </html>
  );
}
// ########################################################

export function CatchBoundary() {
  const caughtResponse = useCatch();

  return (
    <html lang="en">
      <head>
        {/* Renders the <title> and <meta> tags for the current routes */}
        <Meta />
        {/* Renders the <link> tags for the current routes */}
        <Links />
        <title>{caughtResponse.statusText}</title>
      </head>
      <body>
        {/* main-nav component */}
        <header>
          <MainNavigation />
        </header>

        {/* outlet an error instead of child components */}
        <main className="error">
          <h1>{caughtResponse.statusText}</h1>
          <p>{caughtResponse.data?.message || 'Something went wrong'}</p>
          <p>
            Back to <Link to="/">safety</Link>!
          </p>
        </main>

        {/* This component will emulate the browser's
         scroll restoration on location changes */}
        <ScrollRestoration />

        {/* Renders the <script> tags needed for the initial render.
         Bundles for additional routes are loaded later as needed */}
        <Scripts />

        {/* This component will reload the page when the server restarts */}
        <LiveReload />
      </body>
    </html>
  );
}
// ########################################################

// is a component that will render if an error is found in the app.
// It allows you to be able to customize your error page. You can add
// this component in any route file (server-file)
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html lang="en">
      <head>
        {/* Renders the <title> and <meta> tags for the current routes */}
        <Meta />
        {/* Renders the <link> tags for the current routes */}
        <Links />
        <title>An error occurred!</title>
      </head>
      <body>
        {/* main-nav component */}
        <header>
          <MainNavigation />
        </header>

        {/* outlet an error instead of child components */}
        <main className="error">
          <h1>"An error occurred!"</h1>
          <p> {error.message}</p>
          <p>
            Back to <Link to="/">safety</Link>!
          </p>
        </main>

        {/* This component will emulate the browser's
         scroll restoration on location changes */}
        <ScrollRestoration />

        {/* Renders the <script> tags needed for the initial render.
         Bundles for additional routes are loaded later as needed */}
        <Scripts />

        {/* This component will reload the page when the server restarts */}
        <LiveReload />
      </body>
    </html>
  );
}
