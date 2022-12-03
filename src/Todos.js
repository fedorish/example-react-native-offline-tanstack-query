import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query/build/lib';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
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
  const { mutate } = updateTodo;
  const onTodoSubmit = () => {
    mutate({ todo: text });
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
      {todoData?.length &&
        todoData.map(({ todo }, idx) => <Text key={idx}>{todo}</Text>)}
      <View style={{ marginTop: 10 }}>
        {!todoData?.length && <Text>Add todo..</Text>}
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
        <Button title='Add todo' onPress={onTodoSubmit} />
      </View>
    </View>
  );
};

export default Todos;
