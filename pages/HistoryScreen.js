import React, { useState, useCallback, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

export default function HistoryScreen({ navigation }) {
  const { userData } = useContext(AuthContext);

  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Pagination State
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  // GANTI DENGAN IP LAPTOP MASING-MASING
  const BASE_URL = "http://192.168.1.12:8080/api/presensi";

  // FUNGSI GET API DENGAN PAGINATION
  const fetchAttendanceData = async (targetPage = 0) => {
    if (isLoading || (isLastPage && targetPage !== 0)) return;

    setIsLoading(true);

    try {
      // Memanggil API Spring Boot
      const response = await fetch(
        `${BASE_URL}/history/${userData.mhsNim}?page=${targetPage}&size=10`,
      );
      const json = await response.json();

      // Spring Boot Pageable menyimpan array di dalam properti 'content'
      const newItems = json.content;

      if (targetPage === 0) {
        setHistoryData(newItems); // Refresh halaman awal
      } else {
        setHistoryData((prev) => [...prev, ...newItems]); // Append (Load More)
      }

      setPage(targetPage);
      setIsLastPage(json.last); // 'last' adalah boolean dari Spring Boot
    } catch (error) {
      console.error("Gagal tarik data:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Otomatis refresh saat layar dibuka
  useFocusEffect(
    useCallback(() => {
      fetchAttendanceData(0);
    }, []),
  );

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchAttendanceData(0);
  };

  const handleLoadMore = () => {
    if (!isLastPage && !isLoading) {
      fetchAttendanceData(page + 1);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("Detail", { dataPresensi: item })}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.course}>{item.course}</Text>
        <Text style={styles.date}>
          {item.date} | {item.jamPresensi}
        </Text>
      </View>
      <Text style={item.status === "Present" ? styles.present : styles.absent}>
        {item.status}
      </Text>
      <MaterialIcons
        name="chevron-right"
        size={24}
        color="#999"
        style={{ marginLeft: 10 }}
      />
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#0056A0" />
        <Text style={styles.loaderText}>Menarik data dari server...</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          !isLoading && (
            <Text style={styles.emptyText}>Tidak ada riwayat absensi.</Text>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  content: {
    padding: 16,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    elevation: 2,
  },
  course: {
    fontWeight: "bold",
    fontSize: 14,
  },
  date: {
    color: "#555",
    fontSize: 12,
  },
  present: {
    color: "green",
    fontWeight: "bold",
  },
  absent: {
    color: "red",
    fontWeight: "bold",
  },
  footerLoader: {
    padding: 15,
    alignItems: "center",
  },
  loaderText: {
    marginTop: 5,
    color: "#555",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },
});
