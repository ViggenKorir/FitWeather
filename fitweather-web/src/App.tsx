import { useState } from 'react'
import { SearchBar } from './components/SearchBar/SearchBar'
import { WeatherCard } from './components/WeatherCard/WeatherCard'
import { RecommendationCard } from './components/RecommendationCard/RecommendationCard'
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage'
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner'
import { fetchWeather, generateFitnessRecommendation } from './services/weatherService'
import { WeatherData, FitnessRecommendation, LoadingState } from './types/weather'
import styles from './App.module.css'

export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [recommendation, setRecommendation] = useState<FitnessRecommendation | null>(null)
  const [loadingState, setLoadingState] = useState<LoadingState>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (city: string) => {
    setLoadingState('loading')
    setError(null)

    try {
      const weatherData = await fetchWeather(city)
      const fitnessRec = generateFitnessRecommendation(
        weatherData.weather[0].main,
        weatherData.weather[0].description
      )

      setWeather(weatherData)
      setRecommendation(fitnessRec)
      setLoadingState('success')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      setLoadingState('error')
      setWeather(null)
      setRecommendation(null)
    }
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            <span className={styles.titleIcon}>⛅</span>
            FitWeather
          </h1>
          <p className={styles.subtitle}>
            Personalized fitness recommendations based on your weather
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <SearchBar onSearch={handleSearch} isLoading={loadingState === 'loading'} />

          <div className={styles.content}>
            {error && (
              <ErrorMessage
                message={error}
                onDismiss={() => setError(null)}
              />
            )}

            {loadingState === 'loading' && <LoadingSpinner />}

            {weather && recommendation && loadingState === 'success' && (
              <div className={styles.resultsGrid}>
                <WeatherCard weather={weather} />
                <RecommendationCard recommendation={recommendation} />
              </div>
            )}

            {loadingState === 'idle' && !error && (
              <div className={styles.welcome}>
                <div className={styles.welcomeIcon}>🏋️</div>
                <h2>Welcome to FitWeather</h2>
                <p>
                  Enter a city name to get weather-based fitness recommendations
                  tailored just for you!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Weather data provided by{' '}
          <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">
            OpenWeatherMap
          </a>
        </p>
      </footer>
    </div>
  )
}
