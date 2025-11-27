import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stack } from "expo-router";
import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import { CategoryType, ProductType } from "@/types/type";
import Categories from "@/components/Categories";
import FlashSale from "@/components/FlashSale";

type Props = {};

const HomeScreen = (props: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [saleProducts, setSaleProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts();
    getCategories();
    getSaleProducts();
  }, []);

  const getProducts = async () => {
    const URL = `http://localhost:8000/products`;
    const response = await axios.get(URL);
    setProducts(response.data);
  };

  const getCategories = async () => {
    const URL = `http://localhost:8000/categories`;
    const response = await axios.get(URL);
    setCategories(response.data);
  };

  const getSaleProducts = async () => {
    const URL = `http://localhost:8000/saleProducts`;
    const response = await axios.get(URL);

    setSaleProducts(response.data);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <Header />,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories categories={categories} />
        <FlashSale products={saleProducts} />
        <View style={styles.bannerWrapper}>
          <Image
            source={require("@/assets/images/sale-banner.jpg")}
            style={{ width: "100%", height: 150, borderRadius: 15 }}
          />
        </View>
        <ProductList products={products} flatList={false} />
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bannerWrapper: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
});
