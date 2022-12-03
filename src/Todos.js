import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query/build/lib';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../supabase';

const Todos = () => {
  const queryClient = useQueryClient();
  const [text, setText] = useState('');

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => supabase.from('todos').select('*'),
  });

  const updateTodo = useMutation({
    mutationKey: ['todos'],
    onMutate: async () => {
      await queryClient.cancelQueries(['todos']);
    },
    onSettled: () => {
      setText('');
      queryClient.invalidateQueries(['todos']);
    },
  });
  const onTodoSubmit = () => {
    updateTodo.mutate({ todo: text });
  };
  const { data: todoData } = data || {};

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: '10%',
      }}
    >
      {!!todoData?.length ? (
        <View>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 5,
              textDecorationLine: 'underline',
            }}
          >
            My todos
          </Text>
          {todoData.map(({ todo }, idx) => {
            return <Text key={idx}>{todo}</Text>;
          })}
        </View>
      ) : (
        <Text style={{ marginBottom: 10 }}>I don't have any todos</Text>
      )}

      <View style={{ marginTop: 10 }}>
        <TextInput
          value={text}
          onChangeText={(inputText) => setText(inputText)}
          keyboardType='default'
          placeholder='Add todo..'
          style={{
            borderColor: 'black',
            borderWidth: 1,
            padding: 5,
            width: '100%',
          }}
        />
        <TouchableOpacity
          onPress={onTodoSubmit}
          style={{
            borderColor: 'black',
            backgroundColor: '#64b5f6',
            borderWidth: 1,
            padding: 10,
            marginTop: 10,
            borderRadius: 7,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Add todo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Todos;
