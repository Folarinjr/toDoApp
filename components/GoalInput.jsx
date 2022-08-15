import React, {useState} from 'react'
import {TextInput, Button, View, StyleSheet} from 'react-native'

const GoalInput = ({addGoal}) => {

    const [enteredText, setEnteredText] = useState('');
    
    //handle the text input
    const goalHandle = (enteredText) => {
        setEnteredText(enteredText)
    }

    //handle add function
    const handleAdd = () => {
        if(enteredText !== ''){
            addGoal(enteredText);
        }else{
            return;
        }
        setEnteredText('')
    }

  return (
    <View style={styles.inputContainer}>
        <TextInput 
            style={styles.textInput} 
            placeholder='Today goals'
            onChangeText={goalHandle}
            value={enteredText}
        />
        <Button 
            title='Add Goal'
            onPress={handleAdd}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },

    textInput: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 4,
        marginRight: 5,
      },
});

export default GoalInput