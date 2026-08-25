import { useEffect, useState } from 'react';

import { HelloPage } from '../components/HelloPage';

type DisplayTextResponse = {
  data: {
    text: string;
  };
};

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? '/api';

export default function Home() {
  const [text, setText] = useState('');

  useEffect(() => {
    let alive = true;

    async function loadDisplayText() {
      const res = await fetch(`${apiBase}/v1/display-text`, {
        cache: 'no-store',
      });

      if (!res.ok) {
        return;
      }

      const body = (await res.json()) as DisplayTextResponse;
      if (alive) {
        setText(body.data.text);
      }
    }

    void loadDisplayText();

    return () => {
      alive = false;
    };
  }, []);

  return <HelloPage text={text} />;
}
