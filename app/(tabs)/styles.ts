// styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
  fontSize: 32,
  fontWeight: '600',
  marginBottom: 20,
  color: '#1E3A5F',
  letterSpacing: 1,
},

  searchContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },

  searchIcon: {
    marginRight: 8,
    fontSize: 16,
  },

  input: {
    width: '80%',
    height: 44,
    backgroundColor: 'rgba(255,255,255,0.6)',
    paddingHorizontal: 16,
    borderRadius: 22,
    marginBottom: 12,
    borderWidth: 0,
  },

  centerBlock:{
    alignItems: 'center',
  },

  card: {
    marginTop: 30,
    backgroundColor: 'rgba(255,255,255,0.75)',
    padding: 24,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {width:0, height:4},

  },
  cityName: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
    color: '#1E3A5F',
  },

  tempRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  temp: {
    fontSize: 72,
    fontWeight: '300',
    marginVertical: 10,
    letterSpacing: -1,
    color: '#1E3A5F',
  },

  degree: {
    fontSize: 24,
    marginTop: 10,
  },

  unitToggle: {
    marginTop: 4,
  },

  unitText: {
    fontSize:16,
  },

  detailsText: {
    fontSize: 14,
    color: '#555',
    marginTop:4,
  },
  
  
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  suggestionsBox: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 5,
    borderColor: '#eee',
  },

  button: {
  borderColor: 'rgba(30,58,95,0.2)',
  backgroundColor: 'rgba(255,255,255,0.4)',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  borderWidth: 1,
  marginTop: 16,
  width: '55%',
  alignItems: 'center',
},
toggleButton: {
  backgroundColor: '#4A90D9',
  borderColor: 'rgba(30,58,95,0.2)',
  paddingVertical: 8,
  paddingHorizontal: 18,
  borderRadius: 20,
  borderWidth: 1,
  marginTop: 6,
  width: '55%',
  alignItems: 'center',
},
buttonText: {
  color:  '#1E3A5F',
  fontWeight: '500',
  fontSize: 14,
},
forecastTitle:{
  marginTop : 20,
  fontWeight: '600',
},

forecastRow: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f0f4ff',
  borderRadius: 18,
  padding: 14,
  marginTop: 8,
  marginVertical: 6,
  width: '100%',
},
forecastDay: {
  fontWeight: '600',
  fontSize: 14,
  color: '#1E3A5F',
  flex: 1,
},

forecastIcon: {
  fontSize: 18,
  marginHorizontal :10,
},

forecastTemps: {
  fontSize: 14,
  color: '#444',
},

watermark: {
  position: 'absolute',
  right: -10,
  top: -10,
  fontSize: 120,
  opacity: 0.08,
},
});