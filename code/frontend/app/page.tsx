import { HelloPage } from '../components/HelloPage';

async function loadDisplayText() {
  const res = await fetch('http://backend:8080/v1/display-text', { cache: 'no-store' });

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
