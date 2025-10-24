import { useState, useEffect } from "react";
import { Center, Loader } from "@mantine/core";
import { useAuth } from "./AuthContext";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import Dashboard from "./Dashboard";

function App() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState("landing"); // 'landing', 'login', 'signup'

  useEffect(() => {
    // If the user logs out (user becomes null),
    // reset the view to the landing page.
    if (!user) {
      setCurrentPage("landing");
    }
  }, [user]); // This hook runs every time the 'user' state changes

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  // If user is logged in, always show dashboard
  if (user) {
    return <Dashboard />;
  }

  // If not logged in, show appropriate page based on navigation
  if (currentPage === "login") {
    return (
      <LoginPage
        onSwitchToSignup={() => setCurrentPage("signup")}
        onBackToHome={() => setCurrentPage("landing")}
      />
    );
  }

  if (currentPage === "signup") {
    return (
      <SignupPage
        onSwitchToLogin={() => setCurrentPage("login")}
        onBackToHome={() => setCurrentPage("landing")}
      />
    );
  }

  // Default: show landing page
  return (
    <LandingPage
      onNavigateToLogin={() => setCurrentPage("login")}
      onNavigateToSignup={() => setCurrentPage("signup")}
    />
  );
}

export default App;
