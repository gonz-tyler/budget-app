import { useState, useEffect } from "react";
import TransactionForm from "./TransactionForm";
import {
  Container,
  Title,
  Paper,
  Loader,
  Center,
  Group,
  ActionIcon,
  Stack,
  Button,
  Modal,
  Badge,
  Box,
  Text,
  MultiSelect,
  Select,
} from "@mantine/core";
import { IconPencil, IconTrash, IconPlus } from "@tabler/icons-react";

const expenseCategories = [
  "Food",
  "Transport",
  "Utilities",
  "Housing",
  "Entertainment",
  "Health",
  "Shopping",
  "Other",
];

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  // --- STATE for Filtering & Sorting ---
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("date-desc");

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/transactions");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/transactions/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setModalOpened(true);
  };

  const handleAddClick = () => {
    setEditingTransaction(null);
    setModalOpened(true);
  };

  const handleActionComplete = () => {
    setEditingTransaction(null);
    setModalOpened(false);
    fetchTransactions();
  };

  const handleModalClose = () => {
    setModalOpened(false);
    setEditingTransaction(null);
  };

  const filteredTransactions =
    selectedCategories.length > 0
      ? transactions.filter((t) => selectedCategories.includes(t.category))
      : transactions;

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (sortBy) {
      case "date-asc":
        return new Date(a.date) - new Date(b.date);
      case "amount-desc":
        return b.amount - a.amount;
      case "amount-asc":
        return a.amount - b.amount;
      case "date-desc":
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  const groupedTransactions = sortedTransactions.reduce((acc, t) => {
    const date = t.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(t);
    return acc;
  }, {});
  const sortedDates = Object.keys(groupedTransactions); // .sort() is already handled by sortedTransactions

  const totalSpent = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

  // A helper function for formatting the date headings
  const formatDate = (dateString) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const transactionDate = new Date(dateString);

    // Set hours to 0 to compare dates only
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    transactionDate.setHours(0, 0, 0, 0);

    if (today.getTime() === transactionDate.getTime()) {
      return "Today";
    }
    if (yesterday.getTime() === transactionDate.getTime()) {
      return "Yesterday";
    }
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(transactionDate);
  };

  return (
    <Container size="md" my="xl">
      <Title align="center" order={1}>
        My Budget App
      </Title>

      {/* --- NEW SUMMARY & CONTROLS --- */}
      <Paper withBorder p="md" my="xl" radius="md">
        <Text size="xl" fw={700} align="center">
          Total Spent: £{totalSpent.toFixed(2)}
        </Text>
      </Paper>

      <Paper shadow="sm" p="lg" withBorder>
        <Group grow>
          <MultiSelect
            label="Filter by Category"
            placeholder="All Categories"
            data={expenseCategories}
            value={selectedCategories}
            onChange={setSelectedCategories}
            clearable
          />
          <Select
            label="Sort by"
            data={[
              { value: "date-desc", label: "Date (Newest First)" },
              { value: "date-asc", label: "Date (Oldest First)" },
              { value: "amount-desc", label: "Amount (High to Low)" },
              { value: "amount-asc", label: "Amount (Low to High)" },
            ]}
            value={sortBy}
            onChange={setSortBy}
          />
        </Group>
      </Paper>

      <Modal
        opened={modalOpened}
        onClose={handleModalClose}
        title={editingTransaction ? "Edit Transaction" : "Add New Transaction"}
        size="md"
      >
        <TransactionForm
          onTransactionAction={handleActionComplete}
          editingTransaction={editingTransaction}
          setEditingTransaction={setEditingTransaction}
          expenseCategories={expenseCategories}
        />
      </Modal>

      <Paper shadow="sm" p="lg" withBorder mt="xl">
        <Group justify="space-between" mb="md">
          <Title order={2}>Transaction List</Title>
          <Button leftSection={<IconPlus size={18} />} onClick={handleAddClick}>
            Add Transaction
          </Button>
        </Group>
        {loading ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          <Stack gap="sm">
            {sortedDates.length > 0 ? (
              sortedDates.map((date) => (
                <div key={date}>
                  <Title order={4} c="dimmed" mb="sm">
                    {formatDate(date)}
                  </Title>

                  {/* --- INNER LOOP FOR TRANSACTIONS --- */}
                  <Stack gap="xs">
                    {groupedTransactions[date].map((transaction) => (
                      <Paper withBorder p="sm" key={transaction.id}>
                        <Group justify="space-between">
                          <Stack gap={0}>
                            <Group gap="lg">
                              <Badge>{transaction.category}</Badge>
                              <Text fw={500}>{transaction.description}</Text>
                            </Group>

                            <Text size="sm" c="dimmed">
                              £{transaction.amount.toFixed(2)}
                            </Text>
                          </Stack>

                          <Group gap="xs" wrap="nowrap">
                            <ActionIcon
                              variant="subtle"
                              color="gray"
                              onClick={() => handleEditClick(transaction)}
                            >
                              <IconPencil size={18} />
                            </ActionIcon>
                            <ActionIcon
                              variant="subtle"
                              color="red"
                              onClick={() => handleDelete(transaction.id)}
                            >
                              <IconTrash size={18} />
                            </ActionIcon>
                          </Group>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                </div>
              ))
            ) : (
              <Text>No transactions found. Add one to get started!</Text>
            )}
          </Stack>
        )}
      </Paper>
    </Container>
  );
}

export default App;
