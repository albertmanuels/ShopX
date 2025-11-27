import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ProductItem from "@/components/ProductItem";
import { Colors } from "@/constants/Colors";
import { ProductType } from "@/types/type";

type Props = {
  products: ProductType[];
  flatList: boolean;
};

const ProductList = (props: Props) => {
  const { products, flatList } = props;

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>For You</Text>
        <TouchableOpacity>
          <Text style={styles.titleBtn}>See All</Text>
        </TouchableOpacity>
      </View>
      {flatList ? (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 20,
          }}
          numColumns={2}
          renderItem={({ index, item }) => (
            <ProductItem item={item} index={index} productType="regular" />
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.itemsWrapper}>
          {products.map((item, index) => (
            <View key={index} style={styles.productWrapper}>
              <ProductItem item={item} index={index} productType="regular" />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  textWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
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
  itemsWrapper: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  productWrapper: {
    width: "50%",
    marginBottom: 20,
    paddingLeft: 5,
  },
});
