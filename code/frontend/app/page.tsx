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
    return '';
  }

  const body = (await res.json()) as DisplayTextResponse;
  return body.data.text;
}

export default async function Home() {
  const text = await loadDisplayText();

  return <HelloPage text={text} />;
}
