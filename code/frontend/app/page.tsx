import { HelloPage } from '../components/HelloPage';

async function loadDisplayText() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? '/api';
  const res = await fetch(`${apiBase}/v1/display-text`, { cache: 'no-store' });

  if (!res.ok) {
    return '';
  }

  const body = (await res.json()) as { data?: { text?: string } };
  return body.data?.text ?? '';
}

export default async function Home() {
  const text = await loadDisplayText();

  return <HelloPage text={text} />;
}
