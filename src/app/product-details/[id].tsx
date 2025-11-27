import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { ProductType, ProductTypeUnion } from "@/types/type";
import ImageSlider from "@/components/ImageSlider";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useHeaderHeight } from "@react-navigation/elements";
import Animated, { FadeInDown, SlideInDown } from "react-native-reanimated";

const ProductDetails = () => {
  const { id, productType } = useLocalSearchParams();
  const [product, setProduct] = useState<ProductType>();
  const router = useRouter();

  const getProductDetails = async () => {
    const URL =
      (productType as ProductTypeUnion) === "sale"
        ? `http://localhost:8000/saleProducts/${id}`
        : `http://localhost:8000/products/${id}`;

    const response = await axios.get(URL);

    setProduct(response.data);
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const headerHeight = useHeaderHeight();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Product Details",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/cart")}>
              <Ionicons name="cart-outline" size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: headerHeight, marginBottom: 90 }}
      >
        {product && (
          <>
            <Animated.View entering={FadeInDown.delay(300).duration(500)}>
              <ImageSlider imageList={product.images} />
            </Animated.View>

            <View style={styles.container}>
              <Animated.View
                style={styles.topRow}
                entering={FadeInDown.delay(500).duration(500)}
              >
                <View style={styles.ratingWrapper}>
                  <Ionicons name="star" size={20} color="#D4AF37" />
                  <Text style={styles.rating}>
                    4.7 <Text>(328)</Text>
                  </Text>
                </View>
                <TouchableOpacity>
                  <Ionicons
                    name="heart-outline"
                    size={22}
                    color={Colors.black}
                  />
                </TouchableOpacity>
              </Animated.View>
              <Animated.Text
                style={styles.title}
                entering={FadeInDown.delay(700).duration(500)}
              >
                {product.title}
              </Animated.Text>

              <Animated.View
                style={styles.priceWrapper}
                entering={FadeInDown.delay(900).duration(500)}
              >
                <Text style={styles.price}>${product.price}</Text>
                <View style={styles.priceDiscount}>
                  <Text style={styles.priceDiscountText}>6% Off</Text>
                </View>
                <Text style={styles.oldPrice}>
                  ${Number(product.price) + 2}
                </Text>
              </Animated.View>

              <Animated.Text
                style={styles.description}
                entering={FadeInDown.delay(1100).duration(500)}
              >
                {product.description}
              </Animated.Text>

              <Animated.View
                style={styles.productVariationWrapper}
                entering={FadeInDown.delay(1300).duration(500)}
              >
                <View style={styles.productVariationType}>
                  <Text style={styles.productVariationTitle}>Color</Text>
                  <View style={styles.productVariationValueWrapper}>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderColor: Colors.primary,
                        borderRadius: 100,
                        padding: 2,
                      }}
                    >
                      <View
                        style={[
                          styles.productVariationColorValue,
                          { backgroundColor: "#D4AF37" },
                        ]}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.productVariationColorValue,
                        { backgroundColor: "#000000" },
                      ]}
                    />
                    <TouchableOpacity
                      style={[
                        styles.productVariationColorValue,
                        { backgroundColor: "#FFFFFF" },
                      ]}
                    />
                    <TouchableOpacity
                      style={[
                        styles.productVariationColorValue,
                        { backgroundColor: Colors.primary },
                      ]}
                    />
                    <TouchableOpacity
                      style={[
                        styles.productVariationColorValue,
                        { backgroundColor: Colors.extraLightGray },
                      ]}
                    />
                    <TouchableOpacity
                      style={[
                        styles.productVariationColorValue,
                        { backgroundColor: Colors.highlight },
                      ]}
                    />
                  </View>
                </View>
                <View style={styles.productVariationType}>
                  <Text style={styles.productVariationTitle}>Size</Text>
                  <View style={styles.productVariationValueWrapper}>
                    <TouchableOpacity
                      style={[
                        styles.productVariationSizeValue,
                        { borderColor: Colors.primary, borderWidth: 1 },
                      ]}
                    >
                      <Text
                        style={[
                          styles.productVariationSizeValueText,
                          { fontWeight: "bold" },
                        ]}
                      >
                        S
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.productVariationSizeValue}>
                      <Text style={styles.productVariationSizeValueText}>
                        M
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.productVariationSizeValue}>
                      <Text style={styles.productVariationSizeValueText}>
                        L
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.productVariationSizeValue}>
                      <Text style={styles.productVariationSizeValueText}>
                        XL
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Animated.View>
            </View>
          </>
        )}
      </ScrollView>
      <Animated.View
        style={styles.buttonWrapper}
        entering={SlideInDown.delay(500).duration(500)}
      >
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: Colors.white,
              borderColor: Colors.primary,
              borderWidth: 1,
            },
          ]}
        >
          <Ionicons name="cart-outline" size={20} color={Colors.primary} />
          <Text style={[styles.buttonText, { color: Colors.primary }]}>
            Add to Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "400",
    color: Colors.gray,
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
    color: Colors.black,
    letterSpacing: 0.6,
    lineHeight: 32,
  },
  priceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
  },
  priceDiscount: {
    backgroundColor: Colors.extraLightGray,
    padding: 5,
    borderRadius: 5,
  },
  priceDiscountText: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.primary,
  },
  oldPrice: {
    fontSize: 16,
    fontWeight: "400",
    textDecorationLine: "line-through",
    color: Colors.gray,
  },
  description: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "400",
    color: Colors.black,
    letterSpacing: 0.6,
    lineHeight: 24,
  },
  productVariationWrapper: {
    flexDirection: "row",
    marginTop: 20,
    // flexWrap: "wrap",
    gap: 20,
    justifyContent: "space-between",
  },
  productVariationType: {
    maxWidth: "50%",
    gap: 5,
    marginBottom: 10,
  },
  productVariationTitle: {
    color: Colors.black,
    fontWeight: "500",
    fontSize: 16,
  },
  productVariationValueWrapper: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    flexWrap: "wrap",
  },
  productVariationColorValue: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.extraLightGray,
  },
  productVariationSizeValue: {
    width: 50,
    height: 30,
    backgroundColor: Colors.extraLightGray,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: Colors.lightGray,
    borderWidth: 1,
  },
  productVariationSizeValueText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.black,
  },
  buttonWrapper: {
    position: "absolute",
    height: 90,
    bottom: 0,
    width: "100%",
    padding: 20,
    backgroundColor: Colors.white,
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.primary,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    gap: 5,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.white,
  },
});
