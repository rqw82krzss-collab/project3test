// styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
  fontSize: 36,
  fontWeight: 'bold',
  marginBottom: 30,
  color: '#1E3A5F',
  letterSpacing: 2,
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

  button: {
  backgroundColor: '#1E90FF',
  paddingVertical: 12,
  paddingHorizontal: 40,
  borderRadius: 25,
  marginTop: 10,
  width: '80%',
  alignItems: 'center',
},
toggleButton: {
  backgroundColor: '#555',
  paddingVertical: 8,
  paddingHorizontal: 20,
  borderRadius: 25,
  marginTop: 8,
  width: '80%',
  alignItems: 'center',
},
buttonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 16,
},

forecastRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#f0f4ff',
  borderRadius: 12,
  padding: 10,
  marginTop: 8,
  width: '100%',
},
forecastDay: {
  fontWeight: 'bold',
  fontSize: 14,
  color: '#1E3A5F',
  flex: 1,
},
forecastTemps: {
  fontSize: 14,
  color: '#444',
},
});