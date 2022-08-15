import { useState } from 'react';
import { StyleSheet, View,FlatList } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

const App = () => {

  const [listGoals, setListGoals] = useState([]);

  //function to add the goal
  const addGoal = (enteredText) => {
    setListGoals((currentGoal) =>
      [...currentGoal, { text: enteredText, id: Math.random().toString()}]
    );
  }
  /*
  This will also work but its not a better way of updating 
  a state that depends on the existing state
  const addGoal = () => setListGoals([...listGoals, enteredText]);
  */

  //function to delete goal
  const deleteGoal = (id) => {
    setListGoals(currentGoal => {
      return currentGoal.filter((goal) => goal.id !== id)
    });
  }

  return (
    <View style={styles.container}>
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