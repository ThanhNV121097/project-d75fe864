import styles from './HelloPage.module.css';

export function HelloPage({ text }: { text: string }) {
  return (
    <main className={styles.helloPage} aria-label="Hello Word display">
      <h1 className={styles.text}>{text}</h1>
    </main>
  );
}
