import axios from 'axios'
import { WeatherData, FitnessRecommendation } from '../types/weather'

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY
const OPENWEATHERMAP_API_URL = 'https://api.openweathermap.org/data/2.5/weather'

export async function fetchWeather(city: string): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error('OpenWeatherMap API key is not configured')
  }

  try {
    const response = await axios.get<WeatherData>(OPENWEATHERMAP_API_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error(`City "${city}" not found`)
    }
    throw new Error('Failed to fetch weather data. Please try again.')
  }
}

export function generateFitnessRecommendation(
  weatherMain: string,
  weatherDescription: string
): FitnessRecommendation {
  const condition = (weatherMain + ' ' + weatherDescription).toLowerCase()

  if (condition.includes('clear') || condition.includes('sunny')) {
    return {
      activity: 'Outdoor Sprint',
      description: 'Perfect weather for high-intensity outdoor running',
      intensity: 'high',
      icon: '🏃‍♂️',
      tips: [
        'Stay hydrated - bring plenty of water',
        'Apply sunscreen for protection',
        'Warm up properly before sprinting',
        'Run during cooler parts of the day',
      ],
    }
  }

  if (
    condition.includes('rain') ||
    condition.includes('drizzle') ||
    condition.includes('thunderstorm') ||
    condition.includes('snow')
  ) {
    return {
      activity: 'Indoor HIIT Circuit',
      description: 'High-Intensity Interval Training for rainy weather',
      intensity: 'high',
      icon: '💪',
      tips: [
        'Use minimal space - perfect for home workouts',
        'Alternate 30 seconds high intensity with 30 seconds rest',
        'Keep water nearby for hydration',
        'Have a mat for floor exercises',
      ],
    }
  }

  return {
    activity: 'General Mobility Workout',
    description: 'Flexible low-intensity exercises that adapt to any weather',
    intensity: 'low',
    icon: '🧘',
    tips: [
      'Focus on flexibility and stretching',
      'Great for recovery days',
      'Helps prevent injuries',
      'Can be done indoors or outdoors',
    ],
  }
}
