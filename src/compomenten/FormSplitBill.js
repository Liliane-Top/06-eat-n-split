import { useState } from "react";
import { Button } from "./Button";

export function FormSplitBill({ selectedFriend, onBalanceDifference }) {
  const [bill, setBill] = useState("");
  const [userExpenses, setUserExpenses] = useState("");
  const [selectedPayer, setSelectedPayer] = useState("user");

  const friendExpenses = bill - userExpenses;

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !userExpenses) return;

    const balanceDifference =
      selectedPayer === "user" ? friendExpenses : -userExpenses;

    onBalanceDifference(balanceDifference);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>{`Split a bill with  ${selectedFriend.name}`}</h2>
      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>💰 Your expense</label>
      <input
        type="text"
        value={userExpenses}
        onChange={(e) =>
          setUserExpenses(
            Number(e.target.value) > bill
              ? userExpenses
              : Number(e.target.value)
          )
        }
      />
      <label>💰 {selectedFriend.name}'s expense</label>
      <input type="text" value={friendExpenses} disabled />

      <label>🤑 Who is paying the bill?</label>
      <select onChange={(e) => setSelectedPayer(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
