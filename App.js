import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';
import Row from './components/Row';
import Add from './components/Add';
import { useCallback, useReducer } from 'react';

const generateId = () => {
  return Date.now().toString();
};

// Määritellään reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: generateId(), name: action.payload }];
    case 'REMOVE_TASK':
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

export default function App() {
  const [data, dispatch] = useReducer(reducer, []);

  // Funktio tehtävän lisäämiseen
  const add = useCallback((name) => {
    dispatch({ type: 'ADD_TASK', payload: name });
  }, []);

  // Funktio tehtävän poistamiseen
  const removeTask = (id) => {
    dispatch({ type: 'REMOVE_TASK', payload: id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Todo list</Text>
      <Add add={add} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Row item={item} removeTask={removeTask} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  heading: {
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    alignItems: 'flex-start',
  },
});