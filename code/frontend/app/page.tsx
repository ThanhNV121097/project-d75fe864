'use client';

import { useEffect, useState } from 'react';
import { HelloPage } from '../components/HelloPage';

export default function Home() {
  const [text, setText] = useState('');

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? '/api';
    fetch(`${apiBase}/v1/display-text`)
      .then((res) => res.json())
      .then((body) => setText(body.data.text))
      .catch(() => setText(''));
  }, []);

  return <HelloPage text={text} />;
}
