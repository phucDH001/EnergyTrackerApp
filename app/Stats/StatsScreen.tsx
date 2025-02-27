import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import SelectDropdown from "react-native-select-dropdown";

const screenWidth = Dimensions.get("window").width;

const options = [  
  "Days", 
  "Months",
  "Years"
];

const StatsScreen = () => {
  const [selected, setSelected] = useState(null); 

  const data = [
    { value: 5, label: "Mon" },
    { value: 3.5, label: "Tue" },
    { value: 4.5, label: "Wed" },
    { value: 6, label: "Thu" },
    { value: 2, label: "Fri" },
    { value: 4.5, label: "Sat" },
    { value: 3.8, label: "Sun" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Stats</Text>


        <View style={styles.subHeader}>
          <Text style={styles.filterText}>All devices</Text>
          <SelectDropdown
            data={options}
            onSelect={(selectedItem) => setSelected(selectedItem)}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {selectedItem || 'Days'}
                  </Text>
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                  <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>
      </View>

      {/* Biểu đồ */}
      <BarChart
        data={data}
        barWidth={22}
        barBorderRadius={4}
        frontColor="#3894FF"
        yAxisTextStyle={{ color: "#000" }}
        xAxisLabelTextStyle={{ color: "#000" }}
        spacing={20}
        noOfSections={5}
        maxValue={7}
        isAnimated
        width={screenWidth - 32}
        height={250}
      />

      {/* Thống kê chi tiết */}
      <View style={styles.statsBox}>
        <Text style={styles.statsText}>This Week</Text>
        <View style={styles.statsRow}>
          <Text style={styles.label}>Run time:</Text>
          <Text style={styles.value}>15 Hrs 24 Mins</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.label}>Power usage:</Text>
          <Text style={styles.value}>48 KWh</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.label}>Most used:</Text>
          <Text style={styles.value}>Living room main</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.label}>Least used:</Text>
          <Text style={styles.value}>Garage</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.statsBox}>
        <Text style={styles.statsText}>Quick Actions</Text>
        <View style={styles.statsRow}>
          <Text style={styles.label}>Most used:</Text>
          <Text style={styles.value}>Home</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.label}>Least used:</Text>
          <Text style={styles.value}>Party</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerContainer: {
    alignItems: "flex-start",
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 5,
  },
  filterText: {
    fontSize: 16,
    color: "#000",
  },
  statsBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    elevation: 3,
  },
  statsText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdownButton: {
    width: 200,
    height: 50,
    backgroundColor: "#007bff",
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: "center",
  },
  dropdownButtonStyle: {
    width: 90,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },

  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
});

export default StatsScreen;
