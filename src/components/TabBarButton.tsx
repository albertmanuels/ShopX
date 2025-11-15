import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { icon } from "@/constants/Icon";

type TabBarLabel = ({
  focused,
  color,
  position,
  children,
}: {
  focused: boolean;
  color: string;
  position: "below-icon" | "beside-icon";
  children: string;
}) => React.ReactNode;

type Props = {
  onPress: PressableProps["onPress"];
  onLongPress: PressableProps["onLongPress"];
  isFocused: boolean;
  label: string | TabBarLabel;
  routeName: string;
};

const TabBarButton = (props: Props) => {
  const { onPress, onLongPress, isFocused, label, routeName } = props;
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabBarButton}
    >
      {routeName === "cart" && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>3</Text>
        </View>
      )}

      {icon.hasOwnProperty(routeName) &&
        icon[routeName as keyof typeof icon]({
          color: isFocused ? Colors.primary : Colors.black,
        })}
      <Text style={{ color: isFocused ? Colors.primary : Colors.black }}>
        {typeof label === "string"
          ? label
          : label({
              focused: isFocused,
              color: isFocused ? Colors.primary : Colors.black,
              position: "below-icon",
              children: "",
            })}
      </Text>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tabBarButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    gap: 5,
  },
  cartBadge: {
    position: "absolute",
    top: -7,
    right: 15,
    backgroundColor: Colors.highlight,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadgeText: {
    color: Colors.black,
    fontSize: 14,
  },
});
