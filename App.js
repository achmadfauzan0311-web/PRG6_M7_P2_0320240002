// import React, { Component, useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// import Home from './pages/Home';
// import { KartuClass, KartuFunction } from './pages/Components';
// import ClassLifeCycle from './pages/ClassLifeCycle';

// export default function App() {
//   return <Home />;
// }
// // export default function App() {
// //   return <ClassLifeCycle />;
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flexDirection: 'row',
// //     alignItems: 'flex-start',
// //     marginTop: 34
// //   },

// //   red: {
// //     width: 75,
// //     height: 40,
// //     backgroundColor: 'red'
// //   },

// //   blue: {
// //     width: 115,
// //     height: 80,
// //     backgroundColor: 'blue'
// //   },

// //   green: {
// //     width: 150,
// //     height: 120,
// //     backgroundColor: 'green'
// //   },

// //   orange: {
// //     width: 225,
// //     height: 160,
// //     backgroundColor: 'orange'
// //   }
// // });

// // ==========================================================
// // 1. CARA LAMA: CLASS COMPONENT (Panjang & Rumit)
// // ==========================================================

// // class TimerLama extends Component {
// //   constructor(props) {
// //     super(props);
// //     // Setup State
// //     this.state = { detik: 0 };
// //   }

// //   // Lifecycle: Lahir (Mounting)
// //   componentDidMount() {
// //     this.interval = setInterval(() => {
// //       this.setState({ detik: this.state.detik + 1 });
// //     }, 1000);
// //   }

// //   // Lifecycle: Mati (Unmounting) - Cleanup!
// //   componentWillUnmount() {
// //     clearInterval(this.interval);
// //   }

// //   // Wajib ada fungsi render
// //   render() {
// //     return (
// //       <View style={[styles.card, styles.cardOld]}>
// //         <Text style={styles.cardTitle}>👴 Class Component</Text>
// //         <Text style={styles.timerText}>{this.state.detik}</Text>
// //         <Text style={styles.subtitle}>Menggunakan this.state & Lifecycle</Text>
// //       </View>
// //     );
// //   }
// // }

// // // ==========================================================
// // // 2. CARA MODERN: FUNCTIONAL + HOOKS (Sihir yang Ringkas)
// // // ==========================================================

// // const TimerBaru = () => {
// //   // Setup State dengan Hooks (1 baris!)
// //   const [detik, setDetik] = useState(0);

// //   // Lifecycle digabung dalam 1 fungsi Hooks!
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setDetik((prevDetik) => prevDetik + 1); // Mengganti this.setState
// //     }, 1000);

// //     // Cleanup langsung ditaruh di sini
// //     return () => clearInterval(interval);
// //   }, []); // Array kosong = hanya jalan saat Mounting

// //   return (
// //     <View style={[styles.card, styles.cardNew]}>
// //       <Text style={styles.cardTitle}>👶 Functional + Hooks</Text>
// //       <Text style={styles.timerText}>{detik}</Text>
// //       <Text style={styles.subtitle}>Hanya pakai useState & useEffect</Text>
// //     </View>
// //   );
// // };

// // // ==========================================================
// // // KOMPONEN UTAMA (Pengendali Demo)
// // // ==========================================================

// // export default function App() {
// //   const [tampilkanTimer, setTampilkanTimer] = useState(true);

// //   return (
// //     <SafeAreaProvider>
// //       <SafeAreaView style={styles.container}>
// //         <Text style={styles.title}>Battle of Components!</Text>

// //         {/* Menampilkan kedua versi secara bersamaan */}
// //         {tampilkanTimer ? (
// //           <View style={styles.demoArea}>
// //             <TimerLama />
// //             <TimerBaru />
// //           </View>
// //         ) : (
// //           <View style={styles.demoArea}>
// //             <Text style={styles.infoText}>Semua Timer Dimatikan (Unmounted).</Text>
// //             <Text style={styles.infoText}>Tidak ada Memory Leak!</Text>
// //           </View>
// //         )}

// //         {/* Tombol untuk men-trigger Unmount/Mount */}
// //         <TouchableOpacity
// //           style={[styles.button, tampilkanTimer ? styles.btnStop : styles.btnStart]}
// //           onPress={() => setTampilkanTimer(!tampilkanTimer)}
// //         >
// //           <Text style={styles.buttonText}>
// //             {tampilkanTimer ? "Hancurkan Kedua Timer!" : "Lahirkan Kembali!"}
// //           </Text>
// //         </TouchableOpacity>
// //       </SafeAreaView>
// //     </SafeAreaProvider>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F0F4F8',
// //     alignItems: 'center',
// //     paddingTop: 50,
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     color: '#333',
// //     marginBottom: 20,
// //   },
// //   demoArea: {
// //     width: '100%',
// //     paddingHorizontal: 20,
// //     minHeight: 350,
// //     justifyContent: 'center',
// //   },
// //   card: {
// //     padding: 20,
// //     borderRadius: 15,
// //     alignItems: 'center',
// //     marginBottom: 20,
// //     elevation: 5,
// //     shadowColor: '#000',
// //     shadowOpacity: 0.2,
// //     shadowRadius: 5,
// //   },
// //   cardOld: {
// //     backgroundColor: '#FFE0B2', // Orange pucat (kesan jadul)
// //     borderLeftWidth: 5,
// //     borderLeftColor: '#F57C00',
// //   },
// //   cardNew: {
// //     backgroundColor: '#C8E6C9', // Hijau segar (kesan modern)
// //     borderLeftWidth: 5,
// //     borderLeftColor: '#388E3C',
// //   },
// //   cardTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //     color: '#333',
// //   },
// //   timerText: {
// //     fontSize: 50,
// //     fontWeight: '900',
// //     color: '#222',
// //     fontVariant: ['tabular-nums'],
// //   },
// //   subtitle: {
// //     fontSize: 12,
// //     color: '#666',
// //     marginTop: 5,
// //     fontStyle: 'italic',
// //   },
// //   infoText: {
// //     fontSize: 16,
// //     textAlign: 'center',
// //     color: '#555',
// //     marginBottom: 10,
// //   },
// //   button: {
// //     paddingVertical: 15,
// //     paddingHorizontal: 30,
// //     borderRadius: 30,
// //     marginTop: 20,
// //     width: '80%',
// //     alignItems: 'center',
// //   },
// //   btnStart: {
// //     backgroundColor: '#0056A0',
// //   },
// //   btnStop: {
// //     backgroundColor: '#D32F2F',
// //   },
// //   buttonText: {
// //     color: '#FFF',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// // });

// import { StyleSheet, Text, View, SafeAreaView } from "react-native";
// import P5Map from "./pages/MapScreen";
// import P5Flat from "./pages/FlatScreen";
// export default function App() {
//   return (
//     <View>
//       <P5Map />
//       <P5Flat />
//     </View>
//   );
// }

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { MaterialIcons } from "@expo/vector-icons";

// import HomeScreen from "./pages/HomeScreen";
// import HistoryScreen from "./pages/HistoryScreen";
// import DetailScreen from "./pages/DetailScreen";

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// // Membuat sub-rute Stack untuk area History
// function HistoryStack() {
//   return (
//     <Stack.Navigator>
//       {/* Layar pertama di tab history adalah daftar absensi */}
//       <Stack.Screen
//         name="HistoryList"
//         component={HistoryScreen}
//         options={{ title: "Riwayat Absensi" }}
//       />
//       {/* Layar kedua adalah detail (menumpuk di atas list) */}
//       <Stack.Screen
//         name="Detail"
//         component={DetailScreen}
//         options={{ title: "Detail Informasi" }}
//       />
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={{ tabBarActiveTintColor: "#0056A0", headerShown: false }}
//       >
//         <Tab.Screen
//           name="HomeTab"
//           component={HomeScreen}
//           options={{
//             tabBarLabel: "Beranda",
//             tabBarIcon: ({ color }) => (
//               <MaterialIcons name="home" size={24} color={color} />
//             ),
//           }}
//         />

//         <Tab.Screen
//           name="HistoryTab"
//           component={HistoryStack}
//           options={{
//             tabBarLabel: "Riwayat",
//             tabBarIcon: ({ color }) => (
//               <MaterialIcons name="history" size={24} color={color} />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

import React, { useContext } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";
import HistoryScreen from "./pages/HistoryScreen";
import DetailScreen from "./pages/DetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ================ HISTORY STACK ================
function HistoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HistoryList"
        component={HistoryScreen}
        options={{ title: "Riwayat Absensi" }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: "Detail Informasi" }}
      />
    </Stack.Navigator>
  );
}

// ================ TAB ================
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#0056A0",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Beranda",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryStack}
        options={{
          tabBarLabel: "Riwayat",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="history" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// ================ AUTH STACK ================
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// ================ MAIN APP ================
function MainApp() {
  const { userData, loading } = useContext(AuthContext);

  if (loading) return <Text>Loading...</Text>;

  return (
    <NavigationContainer>
      {userData ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

// ================ ROOT ================
export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
