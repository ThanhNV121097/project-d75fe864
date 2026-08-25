import { HelloPage } from '../components/HelloPage';

export const dynamic = 'force-dynamic';

type DisplayTextResponse = {
  data: {
    text: string;
  };
};

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? '/api';

export default async function Home() {
  const res = await fetch(`${apiBase}/v1/display-text`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('failed to load display text');
  }

  const body = (await res.json()) as DisplayTextResponse;

  return <HelloPage text={body.data.text} />;
}
