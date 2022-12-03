# React Native Offline First with TanStack React Query
This is an example on how you can use [TanStack Query](https://tanstack.com/query/v4/) with React Native (Expo) to keep your backend and frontend in sync, even when the mobile device doesn't have an internet connection. 

## Get started
To get started with this example you will need to setup a [Supabase](https://supabase.com/) project. It's very easy to setup a project and add it to this example, you can follow the steps I've outlined in my [blogpost](https://dev.to/fedorish/react-native-offline-first-with-tanstack-query-1pe5) where I explain a bit more in detail. 

Install packages
```
yarn install
# or 
npm install
```

Run project
```
yarn start
# or 
npm run start
```

## Troubleshooting
I've experienced some issues with iPhone and Android simulators not reconnecting properly to the internet after being offline, and not persisting the mutations correctly. Therefore I suggest trying this out with a physical device. 
