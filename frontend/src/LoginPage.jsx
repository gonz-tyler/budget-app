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

function LoginPage({ onSwitchToSignup, onBackToHome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);

    if (!result.success) {
      setError(result.error || "Login failed. Please try again.");
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
          right: "-5%",
          width: "300px",
          height: "300px",
          borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
          backgroundColor: "rgba(77, 171, 247, 0.1)",
          zIndex: 0,
        }}
      />

      <Container size="xs" style={{ position: "relative", zIndex: 1 }}>
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
              backgroundColor: "#4dabf7",
              border: "5px solid #25262b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: "900",
              color: "#25262b",
              transform: "rotate(-10deg)",
              boxShadow: "6px 6px 0 #25262b",
              margin: "0 auto",
            }}
          >
            £
          </Box>

          <Title order={1} align="center" style={{ fontWeight: 900 }}>
            Welcome Back
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
                  label="Email"
                  placeholder="your@email.com"
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
                  placeholder="Your password"
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

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={loading}
                  style={{
                    backgroundColor: "#4dabf7",
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
                        backgroundColor: "#74c0fc",
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
                  Log In
                </Button>

                <Text size="sm" align="center" c="dimmed">
                  Don't have an account?{" "}
                  <Anchor
                    onClick={onSwitchToSignup}
                    component="button"
                    type="button"
                    fw={600}
                  >
                    Sign up
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

export default LoginPage;
