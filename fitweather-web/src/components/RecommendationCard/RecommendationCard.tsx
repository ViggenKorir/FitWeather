import { FitnessRecommendation } from '../../types/weather'
import styles from './RecommendationCard.module.css'

interface RecommendationCardProps {
  recommendation: FitnessRecommendation
}

export function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  const intensityColors = {
    low: '#10b981',
    moderate: '#f59e0b',
    high: '#ef4444',
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconSection}>
          <span className={styles.icon}>{recommendation.icon}</span>
        </div>
        <div>
          <h2 className={styles.activity}>{recommendation.activity}</h2>
          <p className={styles.description}>{recommendation.description}</p>
        </div>
      </div>

      <div className={styles.intensityBadge}>
        <span
          className={styles.badge}
          style={{ backgroundColor: intensityColors[recommendation.intensity] }}
        >
          Intensity: {recommendation.intensity.charAt(0).toUpperCase() + recommendation.intensity.slice(1)}
        </span>
      </div>

      <div className={styles.tipsSection}>
        <h3 className={styles.tipsTitle}>💡 Tips for this workout:</h3>
        <ul className={styles.tipsList}>
          {recommendation.tips.map((tip, index) => (
            <li key={index} className={styles.tipItem}>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
