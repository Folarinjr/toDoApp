import { StatusBar } from 'expo-status-bar';

import { useState, useEffect, useCallback } from 'react';
import { StyleSheet,View,FlatList } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

//Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App = () => {

  const [appIsReady, setAppIsReady] = useState(false);
  const [listGoals, setListGoals] = useState([]);

  useEffect(() => {
    const prepare = () => {
     setAppIsReady(true);
    }
    prepare();
  },[]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
      loadGoals()
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  //function to load storage
  const loadGoals = () => {
    AsyncStorage.getItem('storedGoals').then(data => {
      if(data !== null){
        setListGoals(JSON.parse(data))
      }
    }).catch((error)=> console.log(error))
  }

  //function to add the goal
  const addGoal = (enteredText) => {
    const newGoal= [...listGoals, { text: enteredText, id: Math.random().toString()}]
    AsyncStorage.setItem('storedGoals', JSON.stringify(newGoal)).then(()=>{
      setListGoals(newGoal);
    })
    
  }
  /*
  This will also work but its not a better way of updating 
  a state that depends on the existing state
  const addGoal = () => setListGoals([...listGoals, enteredText]);
  */

  //function to delete goal
  const deleteGoal = async(id) => {
    try {
      let goalJSON = await AsyncStorage.getItem('storedGoals');
      let goalArray = JSON.parse(goalJSON);
      alteredGoal = goalArray.filter((goal) => goal.id !== id);
      AsyncStorage.setItem('storedGoals', JSON.stringify(alteredGoal)).then(()=>{
        setListGoals(alteredGoal);
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View 
      style={styles.container}
      onLayout={onLayoutRootView}
    >
      <StatusBar style='dark'/>
      <GoalInput addGoal={addGoal}/>
      <View style={styles.goalsContainer}>
        <FlatList 
          alwaysBounceVertical={false}
          data={listGoals}
          renderItem={(itemData)=>(
            <GoalItem itemData={itemData} deleteGoal={deleteGoal} id={itemData.item.id}/>
          )}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
          
          
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});

export default App;