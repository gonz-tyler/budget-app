import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Group,
  Paper,
  SimpleGrid,
  Box,
} from "@mantine/core";
import {
  IconChartLine,
  IconWallet,
  IconReportMoney,
  IconShieldCheck,
} from "@tabler/icons-react";

function LandingPage({ onNavigateToLogin, onNavigateToSignup }) {
  const features = [
    {
      icon: IconWallet,
      title: "Track Expenses",
      description: "Easily track all your daily expenses in one place",
      color: "#ff6b6b",
    },
    {
      icon: IconChartLine,
      title: "Visual Analytics",
      description: "See your spending patterns with beautiful charts",
      color: "#4dabf7",
    },
    {
      icon: IconReportMoney,
      title: "Budget Planning",
      description: "Set budgets and stay on track with your financial goals",
      color: "#51cf66",
    },
    {
      icon: IconShieldCheck,
      title: "Secure & Private",
      description: "Your financial data is encrypted and secure",
      color: "#ffd43b",
    },
  ];

  return (
    <Box style={{ overflow: "hidden" }}>
      {/* Playful background shapes */}
      <Box
        style={{
          position: "fixed",
          top: "-10%",
          right: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
          backgroundColor: "rgba(255, 107, 107, 0.1)",
          zIndex: 0,
          transform: "rotate(15deg)",
        }}
      />
      <Box
        style={{
          position: "fixed",
          bottom: "-5%",
          left: "-5%",
          width: "350px",
          height: "350px",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          backgroundColor: "rgba(77, 171, 247, 0.1)",
          zIndex: 0,
          transform: "rotate(-20deg)",
        }}
      />

      {/* Hero Section */}
      <Container size="md" style={{ position: "relative", zIndex: 1 }} my="xl">
        <Stack align="center" gap="xl" py={60}>
          {/* Quirky coin illustration */}
          <Box
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: "#ffd43b",
              border: "6px solid #25262b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "60px",
              fontWeight: "900",
              color: "#25262b",
              transform: "rotate(-15deg)",
              boxShadow: "8px 8px 0 #25262b",
            }}
          >
            £
          </Box>

          <Title
            order={1}
            size="3.5rem"
            align="center"
            style={{
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            My Budget App
          </Title>

          <Text
            size="xl"
            c="dimmed"
            align="center"
            maw={600}
            style={{ lineHeight: 1.6 }}
          >
            Take control of your finances. Track expenses, manage budgets, and
            achieve your financial goals with ease.
          </Text>

          <Group gap="md">
            <Button
              size="lg"
              onClick={onNavigateToSignup}
              style={{
                backgroundColor: "#ff6b6b",
                border: "3px solid #25262b",
                borderRadius: "12px",
                boxShadow: "4px 4px 0 #25262b",
                transform: "translate(0, 0)",
                transition: "all 0.1s",
                fontWeight: 700,
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
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onNavigateToLogin}
              style={{
                border: "3px solid #25262b",
                borderRadius: "12px",
                color: "#c1c2c5",
                fontWeight: 700,
              }}
            >
              Log In
            </Button>
          </Group>
        </Stack>

        {/* Features Section */}
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" mt={80}>
          {features.map((feature, index) => (
            <Paper
              key={feature.title}
              p="xl"
              radius="md"
              style={{
                border: "3px solid #25262b",
                borderRadius: "16px",
                boxShadow: "6px 6px 0 #25262b",
                backgroundColor: "#1a1b1e",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative corner element */}
              <Box
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: feature.color,
                  opacity: 0.15,
                }}
              />

              <Box
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "12px",
                  backgroundColor: feature.color,
                  border: "3px solid #25262b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                  transform: `rotate(${index % 2 === 0 ? "-5deg" : "5deg"})`,
                }}
              >
                <feature.icon size={30} color="#25262b" stroke={2.5} />
              </Box>

              <Title order={3} mb="sm" style={{ fontWeight: 800 }}>
                {feature.title}
              </Title>
              <Text c="dimmed" style={{ lineHeight: 1.6 }}>
                {feature.description}
              </Text>
            </Paper>
          ))}
        </SimpleGrid>

        {/* CTA Section */}
        <Paper
          p="xl"
          radius="md"
          mt={80}
          mb={40}
          style={{
            border: "3px solid #25262b",
            borderRadius: "16px",
            boxShadow: "8px 8px 0 #25262b",
            backgroundColor: "#4dabf7",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Playful shapes in CTA */}
          <Box
            style={{
              position: "absolute",
              top: "20px",
              right: "40px",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#25262b",
              opacity: 0.1,
            }}
          />
          <Box
            style={{
              position: "absolute",
              bottom: "30px",
              left: "60px",
              width: "40px",
              height: "40px",
              backgroundColor: "#25262b",
              opacity: 0.1,
              transform: "rotate(45deg)",
            }}
          />

          <Stack align="center" gap="md" style={{ position: "relative" }}>
            <Title order={2} c="#25262b" style={{ fontWeight: 900 }}>
              Ready to start managing your money?
            </Title>
            <Text c="#25262b" align="center" size="lg" fw={500}>
              Join thousands of users already taking control of their finances
            </Text>
            <Button
              size="lg"
              onClick={onNavigateToSignup}
              style={{
                backgroundColor: "#25262b",
                border: "3px solid #25262b",
                borderRadius: "12px",
                boxShadow: "4px 4px 0 #1a1b1e",
                transform: "translate(0, 0)",
                transition: "all 0.1s",
                fontWeight: 700,
                color: "#fff",
              }}
              styles={{
                root: {
                  "&:hover": {
                    backgroundColor: "#373a40",
                    transform: "translate(2px, 2px)",
                    boxShadow: "2px 2px 0 #1a1b1e",
                  },
                },
              }}
            >
              Create Your Free Account
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default LandingPage;
