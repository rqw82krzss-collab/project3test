import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, ScrollView } from 'react-native';

export default function HomeScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const getCitySuggestions = async (text: string) => {
    setCity(text);
    if (text.length < 2) {
      setSuggestions([]);
      return;
    }
    
    try { 
      const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${text}&count=5`
    );
    const data = await response.json();
    if (data.results) {
      setSuggestions(data.results);
    } 
  } catch (error) {
      console.log(error);
    }
  };

  const getWeather = async (selectedCity: string = city) => {
    const cleanCity = selectedCity.trim();
    if (!cleanCity.trim()) {
      Alert.alert('Error', 'Please enter a city');
      return;
    }

    try {
      // Step 1: Get latitude and longitude from city name
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanCity)}&count=1`
      );
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        Alert.alert('Error', 'City not found');
        setWeather(null);
        return;
      }

      const location = geoData.results[0];
      const { latitude, longitude, name, country } = location;

      // Step 2: Get weather data using latitude and longitude
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=auto`
      );
      const weatherData = await weatherResponse.json();

      setWeather({
        city: name,
        country: country,
        temperature: weatherData.current.temperature_2m,
        feelsLike: weatherData.current.apparent_temperature,
        humidity: weatherData.current.relative_humidity_2m,
        weatherCode: weatherData.current.weather_code,
        
        dates: weatherData.daily.time,
        maxTemps: weatherData.daily.temperature_2m_max,
        minTemps: weatherData.daily.temperature_2m_min,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not fetch weather');
    }
  };

  const getWeatherDescription = (code: number) => {
    if (code === 0) return 'Clear sky';
    if (code === 1 || code === 2 || code === 3) return 'Partly cloudy';
    if (code === 45 || code === 48) return 'Fog';
    if (code === 51 || code === 53 || code === 55) return 'Drizzle';
    if (code === 61 || code === 63 || code === 65) return 'Rain';
    if (code === 71 || code === 73 || code === 75) return 'Snow';
    if (code === 95) return 'Thunderstorm';
    return 'Unknown';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weather App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a city"
        value={city}
        onChangeText={(text) => {
          void getCitySuggestions(text);
        }}
      />

      {suggestions.length > 0 && (
        <View style={styles.suggestionsBox}>
          {suggestions.map((item, index) => (
            <Text
              key={index}
              style={styles.suggestionItem}
              onPress={() => {
                setCity(item.name);
                setSuggestions([]);
                getWeather(item.name);
              }}
            >
              {item.name}, {item.country}
            </Text>
          ))}
        </View>
      )}  

      <Button 
        title="Search" 
        onPress ={() => {
          void getWeather()
         }}
      />

      {weather && (
        <View style={styles.card}>
          <Text style={styles.cityName}>
            {weather.city}, {weather.country}
          </Text>
          <Text style={styles.temp}>{weather.temperature}°F</Text>
          <Text>Feels like: {weather.feelsLike}°F</Text>
          <Text>Humidity: {weather.humidity}%</Text>
          <Text>Condition: {getWeatherDescription(weather.weatherCode)}</Text>
          <Text style={{marginTop:20,fontWeight:'bold'}}>Weekly Forecast</Text>
          {weather.dates.slice(0,7).map((date: string, index: number)=>(
            <View key={index} style={{marginTop:10}}>
              <Text>
                {new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}: High {weather.maxTemps[index]}°F / Low {weather.minTemps[index]}°F
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f2ff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 0,
    borderWidth: 1,
  },
  card: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  temp: {
    fontSize: 30,
    marginBottom: 10,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',  
  },
  suggestionsBox: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 5,
    borderColor: '#ddd',
  },
});