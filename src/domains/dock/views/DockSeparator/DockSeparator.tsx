import * as styles from './DockSeparator.css.ts';

export function DockSeparator() {
  return (
    <div className={styles.separator_container}>
      <div className={styles.separator} />
    </div>
  );
}
