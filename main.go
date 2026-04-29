package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"
)

const openWeatherURL = "https://api.openweathermap.org/data/2.5/weather"

type weatherResponse struct {
	Name    string `json:"name"`
	Weather []struct {
		Main        string `json:"main"`
		Description string `json:"description"`
	} `json:"weather"`
	Message string `json:"message"`
}

func main() {
	if err := run(os.Args[1:]); err != nil {
		fmt.Fprintln(os.Stderr, "Error:", err)
		os.Exit(1)
	}
}

func run(args []string) error {
	if len(args) == 0 {
		return errors.New("usage: fitweather <city name>")
	}

	apiKey := os.Getenv("OPENWEATHERMAP_API_KEY")
	if apiKey == "" {
		return errors.New("OPENWEATHERMAP_API_KEY environment variable is required")
	}

	city := strings.Join(args, " ")
	weather, err := fetchWeather(city, apiKey)
	if err != nil {
		return err
	}
	if len(weather.Weather) == 0 {
		return errors.New("weather response did not include current conditions")
	}

	current := weather.Weather[0]
	recommendation := fitnessRecommendation(current.Main, current.Description)

	location := weather.Name
	if location == "" {
		location = city
	}

	fmt.Printf("City: %s\n", location)
	fmt.Printf("Condition: %s\n", current.Main)
	fmt.Printf("Fitness Recommendation: %s\n", recommendation)

	return nil
}

func fetchWeather(city, apiKey string) (weatherResponse, error) {
	endpoint, err := url.Parse(openWeatherURL)
	if err != nil {
		return weatherResponse{}, err
	}

	query := endpoint.Query()
	query.Set("q", city)
	query.Set("appid", apiKey)
	query.Set("units", "metric")
	endpoint.RawQuery = query.Encode()

	client := http.Client{Timeout: 10 * time.Second}
	resp, err := client.Get(endpoint.String())
	if err != nil {
		return weatherResponse{}, fmt.Errorf("fetch weather: %w", err)
	}
	defer resp.Body.Close()

	var weather weatherResponse
	if err := json.NewDecoder(resp.Body).Decode(&weather); err != nil {
		return weatherResponse{}, fmt.Errorf("decode weather response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		if weather.Message != "" {
			return weatherResponse{}, fmt.Errorf("openweathermap returned %s: %s", resp.Status, weather.Message)
		}
		return weatherResponse{}, fmt.Errorf("openweathermap returned %s", resp.Status)
	}

	return weather, nil
}

func fitnessRecommendation(main, description string) string {
	condition := strings.ToLower(main + " " + description)

	if strings.Contains(condition, "clear") || strings.Contains(condition, "sunny") {
		return "Outdoor Sprint"
	}

	if strings.Contains(condition, "rain") ||
		strings.Contains(condition, "drizzle") ||
		strings.Contains(condition, "thunderstorm") ||
		strings.Contains(condition, "snow") {
		return "Indoor HIIT Circuit"
	}

	return "General Mobility Workout"
}
