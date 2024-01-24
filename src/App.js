import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

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
        {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
      </div>
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <div>
        <h3>{friend.name}</h3>
        <p
          className={
            friend.balance === 0 ? "" : friend.balance > 0 ? "green" : "red"
          }
        >
          {friend.balance === 0
            ? "You and " + friend.name + " are even"
            : friend.balance > 0
            ? friend.name + " owes you " + friend.balance + "€"
            : "You owe " + friend.name + " " + Math.abs(friend.balance) + "€"}
        </p>
      </div>
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Closed" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = { id, name, image: `${image}?=${id}`, balance: 0 };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄 Image URL </label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormSplitBill({ selectedFriend }) {
  const [billAmount, setBillAmount] = useState("");

  return (
    <form className="form-split-bill">
      <h2>{`Split a bill with  ${selectedFriend.name}`}</h2>
      <label>💰 Bill Value</label>
      <input type="text" value={billAmount} onChange={setBillAmount} />
      <label>💰 Your expense</label>
      <input type="text" />
      <label>💰 {selectedFriend.name}'s expense</label>
      <input type="text" disabled />
      <label>🤑 Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
