# FitWeather Web - React TypeScript UI

A modern, responsive web application that provides personalized fitness recommendations based on current weather conditions. This web UI consumes the same OpenWeatherMap API as the Go CLI backend but offers a beautiful, interactive user experience.

## 🌟 Features

- **Weather Search**: Search for any city worldwide to get current weather conditions
- **Dynamic Recommendations**: AI-powered fitness recommendations based on weather
  - ⛅ Clear/Sunny weather → Outdoor Sprint
  - 🌧️ Rainy weather → Indoor HIIT Circuit
  - ☁️ Other conditions → General Mobility Workout
- **Detailed Weather Information**: Temperature, humidity, wind speed, and more
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatically adapts to system preferences
- **Fast & Optimized**: Built with Vite for lightning-fast development and production builds
- **TypeScript**: Fully typed for better development experience and reliability

## 🛠️ Tech Stack

- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Modern build tool and dev server
- **Axios**: HTTP client for API requests
- **CSS Modules**: Scoped, maintainable styling

## 📋 Prerequisites

- Node.js 16+ and npm (or yarn/pnpm)
- OpenWeatherMap API key ([Get one free here](https://openweathermap.org/api))

## 🚀 Getting Started

### 1. Installation

```bash
cd fitweather-web
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the `fitweather-web` directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your OpenWeatherMap API key:

```env
VITE_OPENWEATHERMAP_API_KEY=your_api_key_here
```

### 3. Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### 5. Preview Production Build

```bash
npm run preview
```

## 📦 Project Structure

```
fitweather-web/
├── src/
│   ├── components/          # React components
│   │   ├── SearchBar/       # City search input
│   │   ├── WeatherCard/     # Weather display
│   │   ├── RecommendationCard/  # Fitness recommendation
│   │   ├── ErrorMessage/    # Error display
│   │   └── LoadingSpinner/  # Loading state
│   ├── services/
│   │   └── weatherService.ts    # API integration & logic
│   ├── types/
│   │   └── weather.ts           # TypeScript interfaces
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── index.html               # HTML entry point
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── vercel.json              # Vercel deployment config
```

## 🎨 Component Overview

### SearchBar
- Input field for city names
- Search button with loading state
- Responsive design with clear visual feedback

### WeatherCard
- Displays current weather information
- Shows temperature, humidity, wind speed, and min/max temps
- Beautiful gradient design with hover effects

### RecommendationCard
- Shows personalized fitness recommendation
- Displays activity icon and intensity level
- Includes helpful tips for the recommended activity

### ErrorMessage
- User-friendly error notifications
- Dismissible alert with clear messaging

### LoadingSpinner
- Animated loading indicator
- Shows progress while fetching data

## 🚀 Deployment on Vercel

### Option 1: Using Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Using GitHub Integration

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variable: `VITE_OPENWEATHERMAP_API_KEY`
5. Deploy!

### Environment Variables on Vercel

Add the following environment variable in Vercel dashboard:
- `VITE_OPENWEATHERMAP_API_KEY`: Your OpenWeatherMap API key

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🌐 API Reference

### OpenWeatherMap API
- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Parameters**:
  - `q`: City name
  - `appid`: API key
  - `units`: Temperature units (metric for Celsius)

### Response Fields Used
- `name`: City name
- `weather[0].main`: Main weather condition
- `weather[0].description`: Weather description
- `main.temp`: Current temperature
- `main.feels_like`: "Feels like" temperature
- `main.temp_min`: Minimum temperature
- `main.temp_max`: Maximum temperature
- `main.humidity`: Humidity percentage
- `wind.speed`: Wind speed

## 🎯 Fitness Recommendation Logic

The app analyzes weather conditions to recommend activities:

| Weather | Activity | Intensity | Icon |
|---------|----------|-----------|------|
| Clear/Sunny | Outdoor Sprint | High | 🏃‍♂️ |
| Rain/Snow | Indoor HIIT | High | 💪 |
| Other | Mobility Workout | Low | 🧘 |

## 🌙 Dark Mode

The application automatically detects system preferences for dark mode via CSS media queries. No additional configuration needed!

## 📱 Responsive Design

- **Desktop**: Full-width layout with 2-column grids for results
- **Tablet**: Adjusted spacing and font sizes
- **Mobile**: Single-column layout with optimized touch targets

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🔗 Related

- [Go CLI Backend](../README.md) - FitWeather command-line application
- [OpenWeatherMap API](https://openweathermap.org/api) - Weather data provider

## 📞 Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ using React, TypeScript, and Vite
