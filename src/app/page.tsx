import { Alert } from "@chakra-ui/react";

export default function Home() {
  return (
    <Alert.Root>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title />
        <Alert.Description />
      </Alert.Content>
    </Alert.Root>
  );
}
