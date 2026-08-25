import { HelloPage } from '../components/HelloPage';

type DisplayTextResponse = {
  data: {
    text: string;
  };
};

const apiOrigin = process.env.API_ORIGIN ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

export default async function Home() {
  const res = await fetch(`${apiOrigin}/v1/display-text`, { cache: 'no-store' });
  const body = (await res.json()) as DisplayTextResponse;

  return <HelloPage text={body.data.text} />;
}
