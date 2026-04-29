import styles from './ErrorMessage.module.css'

interface ErrorMessageProps {
  message: string
  onDismiss?: () => void
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.icon}>⚠️</span>
        <p className={styles.message}>{message}</p>
        {onDismiss && (
          <button className={styles.dismissButton} onClick={onDismiss}>
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
