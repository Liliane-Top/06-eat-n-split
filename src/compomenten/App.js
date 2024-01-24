import { useState } from "react";
import { FriendsList } from "./FriendsList";
import { FormSplitBill } from "./FormSplitBill";
import { Button } from "./Button";
import { FormAddFriend } from "./FormAddFriend";
import { initialFriends } from "../data/initialFriends";

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [openAddFriend, setOpenAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleOpenAddFriendForm() {
    setOpenAddFriend(!openAddFriend);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setOpenAddFriend(false);
  }

  function handleSelectedFriend(friend) {
    setSelectedFriend((current) => (current?.id === friend.id ? null : friend));
    setOpenAddFriend(false);
  }

  function handleUpdateBalance(balanceDifference) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + balanceDifference }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {openAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleOpenAddFriendForm}>
          {openAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <div>
        {selectedFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}
            onBalanceDifference={handleUpdateBalance}
          />
        )}
      </div>
    </div>
  );
}
