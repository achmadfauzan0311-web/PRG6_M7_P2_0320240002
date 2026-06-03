import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-web";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [permission, requestPermisiion] = useCameraPermissions();

  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const { userData, logout } = useContext(AuthContext);

  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    console.log("QR RAW DATA =", data);

    if (!isScanning) return;
    setIsCheckedIn(false);

    try {
      const qrData = JSON.parse(data);
      setScannedData(qrData);

      Alert.alert(
        "QR Code Terdeteksi",
        `Mata Kuliah : ${qrData.kodeMk}
Pertemuan : ${qrData.pertemuanKe}
Ruangan : ${qrData.ruangan}

Lanjutkan Presensi (Check In)?`,
        [
          {
            text: "Batal",
            style: "cancel",
          },
          {
            text: "Ya, Check In",
            onPress: () => handleSumbitPresensi(qrData),
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        "QR tidak valid",
        "Pastikan Anda memindai QR Code Presensi Dosen ",
      );
      setIsScanning(true);
    }
  };

  const handleSumbitPresensi = async (qrData) => {
    const payload = {
      kodeMk: qrData.kodeMk,
      nimMhs: "0320240002",
      pertemuanKe: qrData.pertemuanKe,
      date: new Date().toISOString().split("T")[0],
      jamPresensi: new Date().toLocaleDateString("en-GB"),
      status: "Present",
      ruangan: qrData.ruangan,
    };

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (response.ok) {
        setIsCheckedIn(true);
        Alert.alert("Behasil!", "Presensi sukses dicatat ke Database", [
          {
            text: "Lihat Riwayat",
            onPress: () => navigation.navigate("History"),
          },
        ]);
      } else {
        Alert.alert("Gagal", result.message || "terjadi kesalahan di server");
      }
    } catch (error) {
      console.log("ERROR DETAIL =", error);
      Alert.alert(
        "Eror jaringan ",
        "pastikan IP laptop benar dan api berjalan",
      );
      console.error(error);
    } finally {
      setIsScanning(true);
      setScannedData(null);
    }
  };

  const [currentTime, setCurrentTime] = useState("Memuat jam...");
  const [note, setNote] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const noteInputRef = useRef(null);

  // Ganti dengan IP laptop Anda, jangan pakai localhost
  const BASE_URL = "http://192.168.1.12:8080/api/presensi";

  const attendanceStats = useMemo(() => {
    return { totalPresent: 12, totalAbsent: 2 };
  }, []);

  // Update waktu setiap detik
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("id-ID", { hour12: false });
      setCurrentTime(formatted);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!permission) {
    return (
      <View Style={styles.container}>
        <Text> Memuar Perizinan Kamera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>
          Aplikasi butuh akses kamera untuk memindai QR Code Presensi Dosen !
        </Text>
        <TouchableOpacity
          style={styles.buttonReuest}
          onPress={requestPermisiion}
        >
          <Text style={styles.buttonText}>Aktifkan Kamera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCheckIn = async () => {
    if (isCheckedIn) {
      return Alert.alert("Perhatian", "Anda sudah Check In.");
    }
    if (!note.trim()) {
      Alert.alert("Peringatan", "Catatan kehadiran wajib diisi!");
      noteInputRef.current?.focus();
      return;
    }

    setIsPosting(true);
    const now = new Date();

    // Payload sesuai DTO Java Spring
    const payload = {
      kodeMk: "TRPL205",
      course: "Mobile Programming",
      status: "Present",
      nimMhs: userData.mhsNim,
      pertemuanKe: 5,
      date: now.toISOString().split("T")[0],
      jamPresensi: now.toLocaleTimeString("id-ID", { hour12: false }),
      kode_qr: "AUTH-TRPL205-WS-XYZ987",
      ruangan: "Lab Komputer 3",
      dosenPengampu: "Tim Dosen TRPL",
      catatan: note,
    };

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setIsCheckedIn(true);
        Alert.alert("Berhasil!", "Presensi masuk ke Database Java Spring.", [
          { text: "OK" },
          {
            text: "Lihat Riwayat",
            onPress: () => navigation.navigate("History"),
          },
        ]);
      } else {
        Alert.alert("Gagal", result.message || "Terjadi kesalahan di server.");
      }
    } catch (error) {
      Alert.alert(
        "Error Jaringan",
        "Pastikan IP Laptop benar dan Spring Boot berjalan.",
      );
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsPosting(false);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.focusedContainer}>
            <View style={styles.borderCornerTopLeft} />
            <View style={styles.borderCornerTopRight} />
            <View style={styles.borderCornerBottomLeft} />
            <View style={styles.borderCornerBottomRight} />
          </View>
        </View>

        <View style={styles.unfocusedContainer}>
          <Text style={styles.scanText}>Arahkan Kamera ke QR Code Dosen</Text>

          {!isScanning && (
            <Button title="Scan Lagi" onPress={() => setIsScanning(true)} />
          )}
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  infoText: {
    color: "white",
    textAlign: "center",
    margin: 30,
    fontSize: 16,
  },

  buttonRequest: {
    backgroundColor: "#0056b3",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  unfocusedContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },

  focusedContainer: {
    width: 250,
    height: 250,
    position: "relative",
  },

  scanText: {
    color: "white",
    fontSize: 16,
    marginTop: 20,
    fontWeight: "bold",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 5,
  },

  borderCornerTopLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: "#007bff",
  },

  borderCornerTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderColor: "#007bff",
  },

  borderCornerBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: "#007bff",
  },

  borderCornerBottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: "#007bff",
  },
});

export default HomeScreen;
