import { HelloPage } from '../components/HelloPage';

type DisplayTextResponse = {
  data: {
    text: string;
  };
};

export default async function Home() {
  const res = await fetch('http://backend:8080/v1/display-text', { cache: 'no-store' });
  const body = (await res.json()) as DisplayTextResponse;

  return <HelloPage text={body.data.text} />;
}
