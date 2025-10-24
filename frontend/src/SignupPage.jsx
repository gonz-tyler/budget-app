import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Stack,
  Text,
  Anchor,
  Box,
} from "@mantine/core";
import { useAuth } from "./AuthContext";

function SignupPage({ onSwitchToLogin, onBackToHome }) {
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

    if (!result.success) {
      setError(result.error || "Signup failed. Please try again.");
      setLoading(false);
    }
    // If successful, AuthContext will update and App will redirect to Dashboard
  };

  return (
    <Box style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      {/* Background shapes */}
      <Box
        style={{
          position: "fixed",
          top: "-10%",
          left: "-5%",
          width: "300px",
          height: "300px",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          backgroundColor: "rgba(255, 107, 107, 0.1)",
          zIndex: 0,
        }}
      />

      <Container size="xs" style={{ position: "relative", zIndex: 1 }} py="xl">
        <Stack gap="xl">
          {/* Back to home link */}
          <Anchor
            onClick={onBackToHome}
            size="sm"
            style={{ alignSelf: "flex-start" }}
          >
            ← Back to home
          </Anchor>

          {/* Decorative element */}
          <Box
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "#ff6b6b",
              border: "5px solid #25262b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: "900",
              color: "#25262b",
              transform: "rotate(10deg)",
              boxShadow: "6px 6px 0 #25262b",
              margin: "0 auto",
            }}
          >
            £
          </Box>

          <Title order={1} align="center" style={{ fontWeight: 900 }}>
            Create Account
          </Title>

          <Paper
            p="xl"
            radius="md"
            style={{
              border: "3px solid #25262b",
              borderRadius: "16px",
              boxShadow: "6px 6px 0 #25262b",
              backgroundColor: "#1a1b1e",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Stack>
                {error && (
                  <Paper
                    p="sm"
                    style={{
                      backgroundColor: "rgba(255, 107, 107, 0.1)",
                      border: "2px solid #ff6b6b",
                      borderRadius: "8px",
                    }}
                  >
                    <Text c="#ff6b6b" size="sm" fw={500}>
                      {error}
                    </Text>
                  </Paper>
                )}

                <TextInput
                  label="Name"
                  placeholder="Your name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  size="md"
                  styles={{
                    input: {
                      border: "2px solid #25262b",
                      borderRadius: "8px",
                    },
                  }}
                />

                <TextInput
                  label="Email"
                  placeholder="your@email.com"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="md"
                  styles={{
                    input: {
                      border: "2px solid #25262b",
                      borderRadius: "8px",
                    },
                  }}
                />

                <PasswordInput
                  label="Password"
                  placeholder="At least 6 characters"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="md"
                  styles={{
                    input: {
                      border: "2px solid #25262b",
                      borderRadius: "8px",
                    },
                  }}
                />

                <PasswordInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  size="md"
                  styles={{
                    input: {
                      border: "2px solid #25262b",
                      borderRadius: "8px",
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={loading}
                  style={{
                    backgroundColor: "#ff6b6b",
                    border: "3px solid #25262b",
                    borderRadius: "10px",
                    boxShadow: "4px 4px 0 #25262b",
                    transform: "translate(0, 0)",
                    transition: "all 0.1s",
                    fontWeight: 700,
                    color: "#25262b",
                  }}
                  styles={{
                    root: {
                      "&:hover": {
                        backgroundColor: "#ff5252",
                        transform: "translate(2px, 2px)",
                        boxShadow: "2px 2px 0 #25262b",
                      },
                      "&:active": {
                        transform: "translate(4px, 4px)",
                        boxShadow: "0px 0px 0 #25262b",
                      },
                    },
                  }}
                >
                  Sign Up
                </Button>

                <Text size="sm" align="center" c="dimmed">
                  Already have an account?{" "}
                  <Anchor
                    onClick={onSwitchToLogin}
                    component="button"
                    type="button"
                    fw={600}
                  >
                    Log in
                  </Anchor>
                </Text>
              </Stack>
            </form>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}

export default SignupPage;
