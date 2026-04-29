# FitWeather CLI - A Beginner's Guide to Weather-Based Fitness Recommendations in Go

## 1. Title & Objective

**Technology chosen:** Go, also called Golang.

**Why Go?** Go is a good fit for command-line tools because it has a simple syntax, fast builds, strong standard-library support, and built-in packages for HTTP requests and JSON parsing. This project uses only Go's standard library, including `net/http`, `encoding/json`, `os`, and `strings`.

**End goal:** Build a CLI application that accepts a city name, fetches current weather data from the OpenWeatherMap API, and prints a fitness recommendation:

- Clear or sunny weather: `Outdoor Sprint`
- Rain, drizzle, thunderstorm, or snow: `Indoor HIIT Circuit`
- Other weather: `General Mobility Workout`

## 2. Quick Summary of the Technology

Go is a statically typed programming language created by Google. It is commonly used for backend services, cloud tools, APIs, DevOps utilities, and command-line applications.

Go is used where developers need reliable, fast, and easy-to-deploy software. A real-world example is the Docker CLI and engine ecosystem, where Go is widely used to build command-line and infrastructure tooling.

In this project, Go is used to:

- Read terminal arguments.
- Call the OpenWeatherMap API.
- Decode a JSON response.
- Print a recommendation in the terminal.

## 3. System Requirements

Supported operating systems:

- Linux
- macOS
- Windows

Required tools:

- Go 1.22 or newer
- A terminal or command prompt
- A code editor such as VS Code, GoLand, IntelliJ IDEA, or Vim
- An OpenWeatherMap API key

Packages:

- No external Go packages are required.
- The project uses Go standard-library packages only.

## 4. Installation & Setup Instructions

### Step 1: Install Go

Download and install Go from:

https://go.dev/dl/

Verify the installation:

```bash
go version
```

Expected terminal output will look similar to:

```text
go version go1.22.0 linux/amd64
```

### Step 2: Get an OpenWeatherMap API Key

1. Create an account at https://openweathermap.org/
2. Go to the API keys section in your account.
3. Copy your API key.

### Step 3: Set the API Key as an Environment Variable

Linux or macOS:

```bash
export OPENWEATHERMAP_API_KEY="your_api_key_here"
```

Windows PowerShell:

```powershell
$env:OPENWEATHERMAP_API_KEY="your_api_key_here"
```

### Step 4: Run the Application

From the project folder:

```bash
go run . Nairobi
```

For city names with spaces, either pass the words normally or use quotes:

```bash
go run . "New York"
```

## 5. Minimal Working Example

This example calls the OpenWeatherMap current weather endpoint, checks the first weather condition returned, and prints a workout recommendation.

```go
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

type WeatherResponse struct {
	Name    string `json:"name"`
	Weather []struct {
		Main string `json:"main"`
	} `json:"weather"`
}

func main() {
	// Read the city name from the first terminal argument.
	city := os.Args[1]

	// Read the API key from an environment variable.
	apiKey := os.Getenv("OPENWEATHERMAP_API_KEY")

	// Build the OpenWeatherMap API URL.
	url := "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey

	// Send an HTTP GET request.
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("Request failed:", err)
		return
	}
	defer resp.Body.Close()

	// Decode the JSON response into a Go struct.
	var weather WeatherResponse
	if err := json.NewDecoder(resp.Body).Decode(&weather); err != nil {
		fmt.Println("Could not parse response:", err)
		return
	}

	// Choose a recommendation based on the weather condition.
	condition := weather.Weather[0].Main
	if condition == "Clear" {
		fmt.Println("Fitness Recommendation: Outdoor Sprint")
	} else if condition == "Rain" || condition == "Snow" {
		fmt.Println("Fitness Recommendation: Indoor HIIT Circuit")
	} else {
		fmt.Println("Fitness Recommendation: General Mobility Workout")
	}
}
```

The complete project version improves this minimal example by handling missing arguments, missing API keys, API errors, city names with spaces, request timeouts, and additional rainy conditions such as drizzle and thunderstorms.

Expected output:

```text
City: Nairobi
Condition: Clear
Fitness Recommendation: Outdoor Sprint
```

Rainy or snowy expected output:

```text
City: London
Condition: Rain
Fitness Recommendation: Indoor HIIT Circuit
```

## 6. AI Prompt Journal

### Prompt 1

**Prompt used:**

```text
generate a Go CLI application that takes a city name as an argument. The app should use the net/http package to fetch current weather data from the OpenWeatherMap API. Parse the JSON response and print a fitness recommendation to the terminal: if it's clear/sunny, suggest 'Outdoor Sprint'; if it's raining or snowing, suggest 'Indoor HIIT Circuit'
```

**Link to the curriculum for the prompt:**

Add your course, assignment, or curriculum link here.

**AI response summary:**

The AI created a Go CLI application with `main.go` and `go.mod`. It used `net/http` to fetch current weather data, `encoding/json` to parse the response, and environment variables to keep the API key out of the source code.

**Brief part of the response that addresses the problem:**

The recommendation logic checks the current weather condition and returns `Outdoor Sprint` for clear or sunny weather, and `Indoor HIIT Circuit` for rain, drizzle, thunderstorm, or snow.

**Evaluation of helpfulness:**

The response was helpful because it produced a working project structure and included basic error handling for missing city names, missing API keys, failed API requests, and invalid weather responses.

### Prompt 2

**Prompt used:**

```text
Update the readme file with the adding the following details...
```

**Link to the curriculum for the prompt:**

Add your course, assignment, or curriculum link here.

**AI response summary:**

The AI expanded the README into a beginner-friendly guide with objectives, technology summary, system requirements, setup instructions, a minimal working example, troubleshooting notes, and references.

**Brief part of the response that addresses the problem:**

The README now explains how to install Go, configure the OpenWeatherMap API key, run the CLI, and understand the expected terminal output.

**Evaluation of helpfulness:**

The response was helpful because it turned the project into a documented learning artifact that another beginner can follow.

## 7. Common Issues & Fixes

### `go: command not found`

Go is not installed or is not available in your terminal path.

Fix:

```bash
go version
```

If the command fails, install Go from https://go.dev/dl/ and restart the terminal.

### `OPENWEATHERMAP_API_KEY environment variable is required`

The app could not find your API key.

Fix:

```bash
export OPENWEATHERMAP_API_KEY="your_api_key_here"
```

On Windows PowerShell:

```powershell
$env:OPENWEATHERMAP_API_KEY="your_api_key_here"
```

### `openweathermap returned 401 Unauthorized`

The API key is missing, incorrect, or not active yet.

Fix:

- Confirm that the key was copied correctly.
- Wait a few minutes if the key was newly created.
- Check your OpenWeatherMap account dashboard.

### `openweathermap returned 404 Not Found`

The city name was not found.

Fix:

```bash
go run . "New York"
```

Use quotes for city names with spaces.

### Weather condition does not match the two main categories

Some weather conditions are cloudy, misty, foggy, hazy, or smoky. In those cases, the app prints:

```text
General Mobility Workout
```

## 8. References

- Go official documentation: https://go.dev/doc/
- Go `net/http` package: https://pkg.go.dev/net/http
- Go `encoding/json` package: https://pkg.go.dev/encoding/json
- OpenWeatherMap Current Weather API: https://openweathermap.org/current
- OpenWeatherMap API keys guide: https://openweathermap.org/appid
- VS Code Go extension: https://marketplace.visualstudio.com/items?itemName=golang.Go
