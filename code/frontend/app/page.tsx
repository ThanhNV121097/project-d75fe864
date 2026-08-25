import { HelloPage } from '../components/HelloPage';

type DisplayTextResponse = {
  data: {
    text: string;
  };
};

export default async function Home() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://backend:8080';
  const res = await fetch(`${apiBase}/v1/display-text`, { cache: 'no-store' });
  const body = (await res.json()) as DisplayTextResponse;

  return <HelloPage text={body.data.text} />;
}
