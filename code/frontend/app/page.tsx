"use client";

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
    const controller = new AbortController();

    fetch(`${apiBase}/v1/display-text`, { cache: 'no-store', signal: controller.signal })
      .then((res) => res.json() as Promise<DisplayTextResponse>)
      .then((body) => setText(body.data.text))
      .catch(() => {});

    return () => controller.abort();
  }, []);

  return <HelloPage text={text} />;
}
