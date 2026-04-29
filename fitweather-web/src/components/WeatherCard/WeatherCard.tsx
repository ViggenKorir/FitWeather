import { WeatherData } from '../../types/weather'
import styles from './WeatherCard.module.css'

interface WeatherCardProps {
  weather: WeatherData
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const temp = Math.round(weather.main.temp)
  const feelsLike = Math.round(weather.main.feels_like)
  const humidity = weather.main.humidity
  const windSpeed = Math.round(weather.wind.speed * 10) / 10

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.city}>{weather.name}</h2>
        <p className={styles.condition}>
          {weather.weather[0].main} - {weather.weather[0].description}
        </p>
      </div>

      <div className={styles.mainTemp}>
        <div className={styles.temperature}>{temp}°C</div>
        <div className={styles.feelsLike}>Feels like {feelsLike}°C</div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.label}>💧 Humidity</span>
          <span className={styles.value}>{humidity}%</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>💨 Wind Speed</span>
          <span className={styles.value}>{windSpeed} m/s</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>🌡️ Min Temp</span>
          <span className={styles.value}>
            {Math.round(weather.main.temp_min)}°C
          </span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>🌡️ Max Temp</span>
          <span className={styles.value}>
            {Math.round(weather.main.temp_max)}°C
          </span>
        </div>
      </div>
    </div>
  )
}
