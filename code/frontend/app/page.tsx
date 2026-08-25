'use client';

import { useEffect, useState } from 'react';
import { HelloPage } from '../components/HelloPage';

export default function Home() {
  const [text, setText] = useState('');

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? '/api';
    fetch(`${apiBase}/v1/display-text`, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((body: { data?: { text?: string } } | null) => {
        setText(body?.data?.text ?? '');
      })
      .catch(() => setText(''));
  }, []);

  return <HelloPage text={text} />;
}
