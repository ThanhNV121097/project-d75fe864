import styles from './HelloPage.module.css';

type DisplayTextResponse = {
  data: {
    text: string;
  };
};

export async function getDisplayText() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? '/api';
  const res = await fetch(`${apiBase}/v1/display-text`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('failed to load display text');
  }

  return (await res.json()) as DisplayTextResponse;
}

export function HelloPage({ text }: { text: string }) {
  return (
    <main className={styles.helloPage} aria-label="Hello Word display">
      <h1 className={styles.text}>{text}</h1>
    </main>
  );
}
