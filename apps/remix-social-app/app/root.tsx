import type {
  LoaderFunction,
  MetaFunction,
  LinksFunction,
} from "@remix-run/node";
import * as React from "react";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import { getUser } from "./session.server";
import ClientStyleContext from "./styles/client.context";
import { styled } from "./styles/stitches.config";

/** container component for error & catch boundary */
const Container = styled("div", {
  backgroundColor: "#ff0000",
  padding: "1em",
});

/** links function for page external <link> tag */
export const links: LinksFunction = () => {
  return [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap",
    },
  ];
};

/** meta function for page global metadata */
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Social",
  viewport: "width=device-width,initial-scale=1",
});

/** type for loader data */
type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

/** type for document prop */
interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

/** loader function to get user data */
export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

/** document component as a main page layout with stitches style injected */
const Document = ({ children, title }: DocumentProps) => {
  const clientStyleData = React.useContext(ClientStyleContext);

  // Only executed on client
  React.useEffect(() => {
    // reset cache to re-apply global styles
    clientStyleData.reset();
  }, [clientStyleData]);

  return (
    <html lang="en">
      <head>
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: clientStyleData.sheet }}
          suppressHydrationWarning
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

/** main starting point for the app */
export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

/** catch boundary */
export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Container>
        <p>
          [CatchBoundary]: {caught.status} {caught.statusText}
        </p>
      </Container>
    </Document>
  );
}

/** error boundary */
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Error!">
      <Container>
        <p>[ErrorBoundary]: There was an error: {error.message}</p>
      </Container>
    </Document>
  );
}
