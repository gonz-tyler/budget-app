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
} from "@mantine/core";
import { IconPencil, IconTrash, IconPlus } from "@tabler/icons-react";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

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

  return (
    <Container size="md" my="xl">
      <Title align="center" order={1}>
        My Budget App
      </Title>

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
            {transactions.map((transaction) => (
              <Group
                key={transaction.id}
                justify="space-between"
                align="center"
              >
                <span>
                  {transaction.date}: {transaction.description} - £
                  {transaction.amount}
                </span>

                <Group gap="xs" wrap="nowrap">
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    size="lg"
                    onClick={() => handleEditClick(transaction)}
                  >
                    <IconPencil size={18} stroke={1.5} />
                  </ActionIcon>

                  <ActionIcon
                    variant="subtle"
                    color="red"
                    size="lg"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <IconTrash size={18} stroke={1.5} />
                  </ActionIcon>
                </Group>
              </Group>
            ))}
          </Stack>
        )}
      </Paper>
    </Container>
  );
}

export default App;
