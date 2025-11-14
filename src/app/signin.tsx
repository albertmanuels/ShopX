import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link, router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import InputField from "@/components/InputField";
import SocialLoginButtons from "@/components/SocialLoginButtons";

type Props = {};

const SignInScreen = (props: Props) => {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Sign Up",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Login to your account</Text>
        <InputField
          inputMode="email"
          placeholder="Email address"
          placeholderTextColor={Colors.gray}
          keyboardType="email-address"
        />
        <InputField
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={Colors.gray}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.dismissAll();
            router.push("/(tabs)");
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Don't have an account?{" "}
          <Link href={"/signup"} asChild>
            <TouchableOpacity>
              <Text style={styles.loginTextSpan}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </Text>
        <View style={styles.divider} />
        <SocialLoginButtons emailHref={"/signin"} />
      </View>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 1.2,
    color: Colors.black,
    marginBottom: 50,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 5,
    alignSelf: "stretch",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  loginText: {
    color: Colors.black,
    lineHeight: 24,
    fontSize: 14,
    marginTop: 30,
  },
  loginTextSpan: {
    color: Colors.primary,
    fontWeight: "600",
  },
  divider: {
    width: "30%",
    backgroundColor: Colors.gray,
    borderTopWidth: StyleSheet.hairlineWidth,
    marginBottom: 30,
  },
});
