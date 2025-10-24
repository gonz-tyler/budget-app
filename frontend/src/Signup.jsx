import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Text,
  Anchor,
} from "@mantine/core";
import { useAuth } from "./AuthContext";

function Signup({ onSwitchToLogin, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const result = await signup(email, password, name);

    if (result.success) {
      onClose();
    } else {
      setError(result.error || "Signup failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        {error && (
          <Text c="red" size="sm">
            {error}
          </Text>
        )}

        <TextInput
          label="Name"
          placeholder="Your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextInput
          label="Email"
          placeholder="your@email.com"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          label="Password"
          placeholder="At least 6 characters"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button type="submit" fullWidth loading={loading}>
          Sign Up
        </Button>

        <Text size="sm" align="center">
          Already have an account?{" "}
          <Anchor onClick={onSwitchToLogin} component="button" type="button">
            Log in
          </Anchor>
        </Text>
      </Stack>
    </form>
  );
}

export default Signup;
