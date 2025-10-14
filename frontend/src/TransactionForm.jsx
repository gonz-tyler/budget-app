import { useState, useEffect } from "react";
import { TextInput, NumberInput, Button, Box, Stack } from "@mantine/core";

function TransactionForm({
  onTransactionAction,
  editingTransaction,
  setEditingTransaction,
}) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingTransaction) {
      setDescription(editingTransaction.description);
      setAmount(editingTransaction.amount);
      setDate(editingTransaction.date);
      setCategory(editingTransaction.category);
    } else {
      clearForm();
    }
  }, [editingTransaction]);

  const clearForm = () => {
    setDescription("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { description, amount, date, category };

    const isEditing = !!editingTransaction;
    const url = isEditing
      ? `http://localhost:8080/api/transactions/${editingTransaction.id}`
      : "http://localhost:8080/api/transactions";
    const method = isEditing ? "PUT" : "POST";

    try {
      await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      onTransactionAction();
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextInput
        label="Description"
        value={description}
        onChange={(event) => setDescription(event.currentTarget.value)}
        required
      />
      <NumberInput
        label="Amount"
        value={amount}
        onChange={setAmount}
        required
        mt="md"
      />
      <TextInput
        type="date"
        label="Date"
        value={date}
        onChange={(event) => setDate(event.currentTarget.value)}
        required
        mt="md"
      />
      <TextInput
        label="Category"
        value={category}
        onChange={(event) => setCategory(event.currentTarget.value)}
        required
        mt="md"
      />
      <Stack gap="sm" mt="md">
        <Button type="submit" fullWidth>
          {editingTransaction ? "Update Transaction" : "Add Transaction"}
        </Button>
        {editingTransaction && (
          <Button
            variant="default"
            fullWidth
            onClick={() => setEditingTransaction(null)}
          >
            Cancel Edit
          </Button>
        )}
      </Stack>
    </Box>
  );
}

export default TransactionForm;
