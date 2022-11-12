import type { MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import MainNavigation from '~/components/main_nav/MainNavigation';
import mainStyles from '~/styles/main.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

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

// links function for mainStyles
export function links() {
  return [{ rel: 'stylesheet', href: mainStyles }];
}
