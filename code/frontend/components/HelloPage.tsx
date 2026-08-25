import styles from './HelloPage.module.css';
import { displayTextResponse } from '../lib/mock/build-hello-page-end-to-end';

export function HelloPage() {
  return (
    <main className={styles.helloPage} aria-label="Hello Word display">
      <h1 className={styles.text}>{displayTextResponse.data.text}</h1>
    </main>
  );
}
