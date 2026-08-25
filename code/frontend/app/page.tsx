import { HelloPage } from '../components/HelloPage';

type DisplayTextResponse = {
  data: {
    text: string;
  };
};

const apiBase = process.env.API_ORIGIN ?? 'http://backend:8080';

async function loadDisplayText() {
  const res = await fetch(`${apiBase}/v1/display-text`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('failed to load display text');
  }

  return (await res.json()) as DisplayTextResponse;
}

export default async function Home() {
  const body = await loadDisplayText();
  return <HelloPage text={body.data.text} />;
}
