import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import TabNavigator from "./src/components/TabNavigator/index";
import MediaListContainer from "./src/pages/MediaList";
import { NavigationContainer } from "@react-navigation/native";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co/",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </ApolloProvider>
  );
}
