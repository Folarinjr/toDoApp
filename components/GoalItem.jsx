import React from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'

const GoalItem = ({itemData, deleteGoal, id}) => {
  return (
    <Pressable onPress={deleteGoal.bind(this, id)}>
      <View 
        //key={itemData.item.id} 
        style={styles.goalsItem}
      >
        <Text style={styles.goalText}>
          {itemData.item.text}
        </Text> 
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  goalsItem: {
    margin: 5,
    padding: 5,
    borderRadius: 4,
    backgroundColor: '#5e0acc'
  },
  goalText: {
    color: '#fff'
  }
});

export default GoalItem