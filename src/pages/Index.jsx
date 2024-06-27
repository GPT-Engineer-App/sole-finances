import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: new Date(), amount: 100, type: "income", brand: "Nike" },
    { id: 2, date: new Date(), amount: 200, type: "expense", brand: "Adidas" },
  ]);
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    amount: "",
    type: "income",
    brand: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const addTransaction = () => {
    setTransactions([
      ...transactions,
      { ...newTransaction, id: transactions.length + 1, date: new Date(newTransaction.date) },
    ]);
    setNewTransaction({ date: "", amount: "", type: "income", brand: "" });
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Sneaker Accounting App</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add New Transaction</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="date"
              name="date"
              value={newTransaction.date}
              onChange={handleInputChange}
              placeholder="Date"
            />
            <Input
              type="number"
              name="amount"
              value={newTransaction.amount}
              onChange={handleInputChange}
              placeholder="Amount"
            />
            <Select
              value={newTransaction.type}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              name="brand"
              value={newTransaction.brand}
              onChange={handleInputChange}
              placeholder="Brand"
            />
            <Button onClick={addTransaction}>Add Transaction</Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="mt-4 space-y-4">
        {transactions.map((transaction) => (
          <Card key={transaction.id}>
            <CardHeader>
              <CardTitle>{transaction.brand}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {format(new Date(transaction.date), "yyyy-MM-dd")}</p>
              <p>Amount: ${transaction.amount}</p>
              <p>Type: {transaction.type}</p>
              <Button variant="destructive" onClick={() => deleteTransaction(transaction.id)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;