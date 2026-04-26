import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import {styles } from './styles';

interface WeatherData{ 
  city: string;
  country: string;
  countryCode: string;
  state: string;
  temperature: number;
  feelsLike : number;
  humidity: number;
  weatherCode : number;
  dates: string[];
  maxTemps :  number[];
  minTemps : number[];
  dailyWeatherCodes : number[];
}
export default function HomeScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null >(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isCelsius, setIsCelsius] = useState(false);

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
    setSuggestions([]);
    if (!cleanCity.trim()) {
      Alert.alert('Error', 'Please enter a city');
      return;
    }

    try {
      //Get latitude and longitude from city name
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
      console.log('Location data:', JSON.stringify(location));
      const { latitude, longitude, name, country, country_code: countryCode, admin1 :state } = location;

      // Get weather data using latitude and longitude
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&temperature_unit=fahrenheit&timezone=auto`
      );
      const weatherData = await weatherResponse.json();

      setWeather({
        city: name,
        country: country,
        countryCode: countryCode,
        state: state,
        temperature: weatherData.current.temperature_2m,
        feelsLike: weatherData.current.apparent_temperature,
        humidity: weatherData.current.relative_humidity_2m,
        weatherCode: weatherData.current.weather_code,
        
        dates: weatherData.daily.time,
        maxTemps: weatherData.daily.temperature_2m_max,
        minTemps: weatherData.daily.temperature_2m_min,
        dailyWeatherCodes: weatherData.daily.weather_code,
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

  const getWeatherEmoji = (code: number) => {
    if (code === 0) return '☀️';
    if (code === 1 || code === 2 || code === 3) return '⛅';
    if (code === 45 || code === 48) return '🌫️';
    if (code === 51 || code === 53 || code === 55) return '🌦️';
    if (code === 61 || code === 63 || code === 65) return '🌧️';
    if (code === 71 || code === 73 || code === 75) return '❄️';
    if (code === 95) return '⛈️';
    return '🌡️';
  };

  const convertTemp = (f: number) => {
    if (isCelsius) return ((f-32) * 5/9).toFixed(1);
    return f.toFixed(1);
  };

  const tempUnit = isCelsius ? '°C' : '°F';

  const getBackgroundColor = (code : number) => {
    if (code === 0) return '#F7D046';
    if (code === 1 || code === 2 || code === 3) return '#A7D3F2';
    if (code === 45 || code === 48) return '#B7C9D6';
    if (code === 51 || code === 53 || code === 55) return '#B7C9D6'; 
    if (code === 61 || code === 63 || code === 65) return '#8FBBD9';
    if (code === 71 || code === 73 || code === 75) return '#C9D6DF';
    if (code === 95) return '#8E7CA6';
    return '#e6f2ff';
  };

  return (
    <ScrollView
    contentContainerStyle={[
    styles.container,
    {
      flexGrow: 1,
      backgroundColor: weather
        ? getBackgroundColor(weather.weatherCode)
        : '#e6f2ff',
    },
    ]}
  showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>🌤️SkyWatch</Text>

      {/*Search Bar */}
      <View style = {styles.searchContainer}>
        <Text style = {styles.searchIcon}>🔍</Text>
        <TextInput
          style = {styles.input}
          placeholder = "Search City"
          value = {city}
          onChangeText = {(text) => getCitySuggestions(text)}
          onSubmitEditing = {()=> getWeather()}
          />
      </View>

      {/*Suggestions */}
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
              {item.name}, {item.country_code === 'US' ? `${item.admin1}, United States` : item.country}
            </Text>
          ))}
        </View>
      )}  

      {/*Search and Switch Button */}
      <TouchableOpacity style={styles.button} onPress={() => { void getWeather(); }}>
      < Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      
      {/*Forecast */}
      {weather && (
        <View style={styles.card}>
          <Text style = {styles.watermark}>
            {getWeatherEmoji(weather.weatherCode)}
          </Text>

          <Text style={styles.cityName}>
            {weather.city}, {weather.countryCode === 'US' ? weather.state: weather.country} 
          </Text>

          <View style = {styles.centerBlock}>
            <View style = {styles.tempRow}>
              <Text style={styles.temp}>{convertTemp(weather.temperature)}</Text>
              <Text style = {styles.degree}>°</Text>
            </View>
            <TouchableOpacity 
              onPress = {() => setIsCelsius(!isCelsius)}
              style = {styles.unitToggle}
            >
              <Text style = {styles.unitText}>
                <Text style={{ fontWeight: !isCelsius ? '600' : '300' }}>°F</Text>
                  {' / '}
                  <Text style={{ fontWeight: isCelsius ? '600' : '300' }}>°C</Text>
              </Text>
              </TouchableOpacity>
            </View>


          <Text style = {styles.detailsText}>
            Feels like: {convertTemp(weather.feelsLike)}{tempUnit}
          </Text>
          <Text style = {styles.detailsText}>
            Humidity: {weather.humidity}%
          </Text>
          <Text style = {styles.detailsText}>
            Condition:{getWeatherEmoji(weather.weatherCode)}{getWeatherDescription(weather.weatherCode)}
          </Text>

          <Text style= {styles.forecastTitle}>7 Day Forecast</Text>
          {weather.dates.slice(0,7).map((date: string, index: number)=>(
          <View key={index} style={styles.forecastRow}>
          <Text style={styles.forecastDay}>
          {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
          </Text>
          
          <View key={index} style={styles.forecastRow}>
        <Text style={styles.forecastDay}>
        {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
        </Text>
        
        <Text style = {styles.forecastIcon}>
          {getWeatherEmoji(weather.dailyWeatherCodes[index])}
        </Text>
        
        <Text style={styles.forecastTemps}>
         H: {convertTemp(weather.maxTemps[index])}°  L: {convertTemp(weather.minTemps[index])}°
        </Text>
        </View>
      </View>
      ))}
        </View>
      )}
    </ScrollView>
  );
}
