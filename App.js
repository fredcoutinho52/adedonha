import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, StatusBar } from 'react-native'
import * as Font from 'expo-font'

export default function App() {
  const [alphabet, setAlphabet] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S','T', 'U', 'V', 'W', 'X', 'Y', 'Z'])
  const [letter, setLetter] = useState('A')
  const [time, setTime] = useState(105)
  const [timeText, setTimeText] = useState('01:45')
  const [isClockRunning, setIsClockRunning] = useState(false)
  const [buttonText, setButtonText] = useState('Sortear')

  const [loaded] = Font.useFonts({ Lilita: require('./assets/fonts/LilitaOne-Regular.ttf') })
  if(!loaded) return null

  function startGame() {
    switch(buttonText) {
      case 'Sortear':
        randomLetter()
        break
      case 'Começar':
        setIsClockRunning(true)
        setButtonText('Parar')
        break
      case 'Parar':
        setIsClockRunning(false)
        setButtonText('Resetar')
        break
      case 'Resetar':
        resetGame()
    }
  }

  function randomLetter() {
    const i = alphabet.length - 1
    const item = Math.floor(Math.random() * i)

    setLetter(alphabet[item])
    removeItem([...alphabet], item)
    setButtonText('Começar')
  }

  function formatTime() {
    let txt;
    if(time >= 60) {
      const seconds = time - 60
      if(seconds >= 10) {
        txt = `01:${seconds}`
      } else {
        txt = `01:0${seconds}`
      }
    } else {
      if(time >= 10) {
        txt = `00:${time}`
      }
      else {
        txt = `00:0${time}`
      }
    }
    setTimeText(txt)
  }

  function removeItem(arr, index) {
    let middleRight = arr.splice(index)
    middleRight.shift()

    let result = [...arr, ...middleRight].concat()
    setAlphabet(result)
  }

  function resetGame() {
    setIsClockRunning(false)
    setTime(105)
    setTimeText('01:45')
    setButtonText('Sortear')
  }

  setTimeout(() => {
    if(time > 0 && isClockRunning) {
      setTime(time - 1)
      formatTime()
    } else if(isClockRunning) {
      clearTimeout()
      Alert.alert(
        "TEMPO ESGOTADO",
        "Pressione OK para reiniciar",
        [{
          text: "OK",
          onPress: resetGame
        }]
      )
    } 
  }, 1000)

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#024296"/>
      <View style={styles.canvas}>
        <Text style={styles.canvasText}>{letter}</Text>
      </View>

      <View style={styles.clock}>
        <Text style={styles.clockText}>{timeText}</Text>
      </View>

      <TouchableOpacity onPress={startGame} style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#026fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  canvas: {
    width: '90%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },

  canvasText: {
    fontSize: 150,
    fontFamily: 'Lilita',
  },

  clock: {
    width: '90%',
    height: 100,
    marginVertical: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },

  clockText: {
    fontSize: 40,
    fontFamily: 'Lilita'
  },

  button: {
    width: '90%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderRadius: 5,
  },

  buttonText: {
    fontSize: 32,
    fontFamily: 'Lilita',
    textTransform: 'uppercase',
  },
})
