import { View , Text , SafeAreaView , StyleSheet, TouchableOpacity , ScrollView , FlatList, Alert, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect, useMemo, useRef  } from 'react';

// Data Awal
const initialHistory = [
    {id: 1, course: 'Mobile Programming', date: '2026-03-01', status: 'Present'},
    {id: 2, course: 'Database System', date: '2026-03-02', status: 'Present'},
    {id: 3, course: 'Operating System', date: '2026-03-03', status: 'Absent'},
    {id: 4, course: 'Computer Network', date: '2026-03-04', status: 'Present'},
    {id: 5, course: 'Web Programming', date: '2026-03-05', status: 'Present'},
    {id: 6, course: 'Software Engineering', date: '2026-03-06', status: 'Absent'},
    {id: 7, course: 'Data Structures', date: '2026-03-07', status: 'Present'},
    {id: 8, course: 'Artificial Intelligence', date: '2026-03-08', status: 'Present'},
    {id: 9, course: 'Cloud Computing', date: '2026-03-09', status: 'Absent'},
    {id: 10, course: 'Cyber Security', date: '2026-03-10', status: 'Present'},
];

const Home = () => {
    const [historyData, setHistoryData] = useState(initialHistory);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [currentTime, setCurrentTime] = useState('Memuat Jam...');
    const [note, setNote] = useState('');
    const noteInputRef = useRef(null);

    const attendanceStats = useMemo(() => {
        console.log("Menghitung ulang statistik kehadiran...");
        const presentCount = historyData.filter(item => item.status === 'Present').length;
        const absentCount = historyData.filter(item => item.status === 'Absent').length;

        return { totalPresent: presentCount, totalAbsent: absentCount };
    }, [historyData]);

    useEffect(() => {
        const timer = setInterval(() => {
            const timeString = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            setCurrentTime(timeString);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleCheckIn = () => {
        if (isCheckedIn) {
            Alert.alert('Perhatian', 'Anda sudah melakukan check-in untuk kelas ini.');
            return;
        }

        if (note.trim() === '') {
            Alert.alert('Perhatian', 'Silakan tambahkan catatan sebelum check-in.');
            noteInputRef.current?.focus();
            return;
        }

        const newAttendance = {
            id: Date.now().toString(),
            course: 'Mobile Programming',
            date: new Date().toLocaleDateString('id-ID'),
            status: 'Present',
        };

        setHistoryData([newAttendance, ...historyData]);
        setIsCheckedIn(true);
        Alert.alert('Sukses', `Berhasil Check-in pada pukul ${currentTime}!`);
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View>
                <Text style={styles.course}>{item.course}</Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>

            <View style={styles.statusContainer}>
                <MaterialIcons
                    name={item.status === "Present" ? "check-circle" : "cancel"}
                    size={20}
                    color={item.status === "Present" ? "green" : "red"}
                />

                <Text style={item.status === "Present" ? styles.present : styles.absent}>
                    {item.status}
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.tittle}>Attendance App</Text>
                    <Text style={styles.clockText}>{currentTime}</Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.icon}>
                        <MaterialIcons name="person" size={40} color="#555" />
                    </View>
                    
                    <View>
                        <Text style={styles.name}>Achmad Fauzan Alfitrah </Text>
                        <Text>NIM : 0320240002</Text>
                        <Text>Class : Informatika 2-A</Text>
                    </View>
                </View>

                <View style={styles.classcard}>
                        <Text style={styles.subtitle}>Today's Class</Text>
                        <Text>Mobile Programming</Text>
                        <Text>08:00 - 10:00</Text>
                        <Text>Lab 3</Text>

                        {!isCheckedIn && (
                            <TextInput
                                ref={noteInputRef}
                                style={styles.inputCatatan}
                                placeholder="Tulis catatan (cth: Hadir Lab)"
                                value={note}
                                onChangeText={setNote}
                            />
                        )}

                        <TouchableOpacity 
                            style={[styles.button, isCheckedIn ? styles.buttonDisabled : styles.buttonActive]}
                            onPress={handleCheckIn}
                            disabled={isCheckedIn}
                        >

                            <Text style={styles.buttonText}>
                                {isCheckedIn ? 'CHECKED IN' : 'CHECK IN'}
                            </Text>
                        </TouchableOpacity>
                </View>

                <View style={styles.statsCard}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{attendanceStats.totalPresent}</Text>
                        <Text style={styles.statLabel}>Total Present</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={[styles.statNumber, { color: 'red' }]  }>{attendanceStats.totalAbsent}</Text>
                        <Text style={styles.statLabel}>Total Absent</Text>
                    </View>
                </View>

                <View style={styles.classcard}>
                    <Text style={styles.subtitle}>Attendance Summary</Text>
                </View>

                <View style={styles.classcard}>
                    <Text style={styles.subtitle}>Attendance History</Text>

                    <FlatList
                        data={historyData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
        
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
        backgroundColor: 'white',
    },
    tittle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    classcard: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
        paddingBottom: 40
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    course: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        color: '#555',
    },
    present: {
        color: 'green',
        fontWeight: 'bold',
    },
    absent: {
        color: 'red',
        fontWeight: 'bold',
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    clockText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
        fontVariant: ['tabular-nums'],
    },
    buttonActive: {
        backgroundColor: '#007AFF',
    },
    buttonDisabled: {
        backgroundColor: '#d5e0f3',
    },
    inputCatatan: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginTop: 15,
        backgroundColor: '#fafafa',
    },
    statsCard: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    statBox: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'green',
    },
    statLabel: {
        fontSize: 14,
        color: 'gray',
    },
});
