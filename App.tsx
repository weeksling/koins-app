import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Button, StyleSheet } from "react-native";
import { View, Text } from "./components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useKoinsState = () => {
  const [koins, setKoins] = React.useState<number>(0);

  React.useEffect(() => {
    AsyncStorage.getItem("kount").then((kount) => {
      if (kount) {
        setKoins(parseInt(kount));
      }
    });
  }, []);

  React.useEffect(() => {
    AsyncStorage.setItem("kount", JSON.stringify(koins));
  }, [koins]);

  return {
    koins,
    incrementKoins: () => {
      setKoins(koins + 10);
    },
  };
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const { koins, incrementKoins } = useKoinsState();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {/* <Navigation colorScheme={colorScheme} /> */}
        <StatusBar />
        <View style={styles.container}>
          <Text>You've earned {koins} koins!</Text>
        </View>
        <Button
          style={styles.button}
          onPress={incrementKoins}
          title="Did you workout today?"
        />
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    height: 30,
  },
});
