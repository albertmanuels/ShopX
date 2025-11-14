import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

type InputFieldProps = React.ComponentProps<typeof TextInput>;

const InputField = (props: InputFieldProps) => {
  return (
    <TextInput
      style={styles.inputField}
      autoCapitalize={props.autoCapitalize ?? "none"}
      {...props}
    />
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: Colors.white,
    alignSelf: "stretch",
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 16,
    color: Colors.black,
    borderRadius: 5,
  },
});
