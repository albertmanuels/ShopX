import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { CategoryType } from "@/types/type";
import { Colors } from "@/constants/Colors";
type Props = {
  categories: CategoryType[];
};

const Categories = (props: Props) => {
  const { categories } = props;
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.titleBtn}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ index, item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.itemImg} />
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 10,
  },
  textWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
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
  item: {
    marginVertical: 10,
    alignItems: "center",
    marginLeft: 20,
    gap: 5,
  },
  itemImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.lightGray,
  },
});
