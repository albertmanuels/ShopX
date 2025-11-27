import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ProductType } from "@/types/type";
import ProductItem from "./ProductItem";

type Props = {
  products: ProductType[];
};

const FlashSale = (props: Props) => {
  const { products } = props;

  const [timeUnits, setTimeUnits] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const saleEndDate = new Date();
  // saleEndDate.setFullYear(2025, 10, 25);
  saleEndDate.setDate(saleEndDate.getDate() + 2);
  saleEndDate.setHours(23, 59, 59);

  useEffect(() => {
    const calculateTimeUnits = (timeDifferent: number) => {
      const seconds = Math.floor(timeDifferent / 1000);

      setTimeUnits({
        days: Math.floor((seconds % (365 * 24 * 60 * 60)) / (24 * 60 * 60)),
        hours: Math.floor((seconds % (24 * 60 * 60)) / (60 * 60)),
        minutes: Math.floor((seconds % (60 * 60)) / 60),
        seconds: seconds % 60,
      });
    };

    const updateCountdown = () => {
      const currentDate = new Date().getTime();
      const expiryTime = saleEndDate.getTime();
      const timeDifference = expiryTime - currentDate;

      if (timeDifference <= 0) {
        calculateTimeUnits(0);
      } else {
        calculateTimeUnits(timeDifference);
      }
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <View style={styles.timeWrapper}>
          <Text style={styles.title}>Flash Sale</Text>
          <View style={styles.timer}>
            <Ionicons name="time-outline" size={16} color={Colors.black} />
            <Text style={styles.timerText}>{`${formatTime(
              timeUnits.days
            )}:${formatTime(timeUnits.hours)}:${formatTime(
              timeUnits.minutes
            )}:${formatTime(timeUnits.seconds)}`}</Text>
          </View>
        </View>

        <TouchableOpacity>
          <Text style={styles.titleBtn}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ marginLeft: 20, paddingRight: 20 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ index, item }) => (
          <View style={{ marginRight: 20 }}>
            <ProductItem item={item} index={index} productType="sale" />
          </View>
        )}
      />
    </View>
  );
};

export default FlashSale;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.6,
    color: Colors.gray,
  },
  titleBtn: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.gray,
  },
  timeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  timer: {
    flexDirection: "row",
    gap: 5,
    backgroundColor: Colors.highlight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timerText: {
    color: Colors.black,
    fontWeight: "500",
  },
});
