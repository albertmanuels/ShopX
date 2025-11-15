import { Ionicons } from "@expo/vector-icons";

type IconProps = {
  color: string;
};

export const icon = {
  index: ({ color }: IconProps) => (
    <Ionicons name="home-outline" size={22} color={color} />
  ),
  explore: ({ color }: IconProps) => (
    <Ionicons name="search-outline" size={22} color={color} />
  ),
  notifications: ({ color }: IconProps) => (
    <Ionicons name="notifications-outline" size={22} color={color} />
  ),
  cart: ({ color }: IconProps) => (
    <Ionicons name="cart-outline" size={22} color={color} />
  ),
  profile: ({ color }: IconProps) => (
    <Ionicons name="person-outline" size={22} color={color} />
  ),
};
