import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { focusManager, QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { StyleSheet, View } from 'react-native';
import Todos from './src/Todos';
import { useAppState } from './src/useAppState';
import { useOnlineManager } from './src/useOnlineManager';
import { supabase } from './supabase';
import { useState } from 'react';

function onAppStateChange(status) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: 0,
    },
    queries: {
      retry: 2,
      cacheTime: 1000 * 10,
    },
  },
});

const asyncPersist = createAsyncStoragePersister({
  storage: AsyncStorage,
  dehydrateOptions: {
    dehydrateMutations: true,
    dehydrateQueries: false,
  },
  throttleTime: 1000,
});

queryClient.setMutationDefaults(['todos'], {
  mutationFn: async ({ todo }) => {
    return supabase.from('todos').insert({ todo });
  },
});

export default function App() {
  useAppState(onAppStateChange);
  useOnlineManager();

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        maxAge: Infinity,
        persister: asyncPersist,
      }}
      onSuccess={() =>
        queryClient
          .resumePausedMutations()
          .then(() => queryClient.invalidateQueries())
      }
    >
      <View style={styles.container}>
        <Todos />
      </View>
    </PersistQueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
