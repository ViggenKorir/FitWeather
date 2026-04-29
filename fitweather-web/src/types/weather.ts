export interface WeatherCondition {
  main: string
  description: string
}

export interface WeatherData {
  name: string
  weather: WeatherCondition[]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
    pressure: number
  }
  wind: {
    speed: number
  }
}

export interface FitnessRecommendation {
  activity: string
  description: string
  intensity: 'low' | 'moderate' | 'high'
  icon: string
  tips: string[]
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'
