import React, { useState, useContext } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const BASE_URL = "http://192.168.1.12:8080/api/user";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);

  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { nim, password },
        {
          headers: {
            authcode: "astratech@123",
          },
        },
      );

      if (res.data.code === 200 && res.data.data) {
        login(res.data.data);
      } else {
        Alert.alert("Login Gagal", res.data.message);
      }
    } catch (err) {
      Alert.alert("Error", "Tidak bisa konek ke server");
    }
  };
  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="NIM"
        value={nim}
        onChangeText={setNim}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
