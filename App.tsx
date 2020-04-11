import 'react-native-gesture-handler'
import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  )
}

const DetailsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  )
}

const Stack = createStackNavigator()

const App = () => {
  const [isReady, setIsReady] = React.useState<boolean>(false)
  const _cacheResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
      })
    ])
    setIsReady(true)
  }

  React.useEffect(() => {
    _cacheResourcesAsync()
  }, [])

  return !isReady ? (
    <View style={styles.container}>
      <Image
        source={require('./assets/images/robot-dev.png')}
      />
    </View>)
  : (<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: "space-mono"
  }
})

export default App
