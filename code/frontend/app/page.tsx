import { HelloPage } from '../components/HelloPage';

export const dynamic = 'force-dynamic';

type DisplayTextResponse = {
  data: {
    text: string;
  };
};

const apiOrigin = process.env.API_ORIGIN;

export default async function Home() {
  if (!apiOrigin) {
    throw new Error('API_ORIGIN is required');
  }

  const res = await fetch(`${apiOrigin}/v1/display-text`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('failed to load display text');
  }

  const body = (await res.json()) as DisplayTextResponse;

  return <HelloPage text={body.data.text} />;
}
