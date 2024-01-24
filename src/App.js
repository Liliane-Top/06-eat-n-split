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

  function onToggle() {
    setOpenAddFriend(!openAddFriend);
  }

  function handleAddFriend(friend) {
    console.log(friends.length);
    setFriends((friends) => [...friends, friend]);
    console.log(friends.length);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {openAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={onToggle}>
          {openAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <div>
        <FormSplitBill friends={friends} />
      </div>
    </div>
  );
}

function FriendsList({ friends }) {
  // const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
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
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  function handleNewFriend(e) {
    e.preventDefault();
    if (!name) return;

    const newFriend = { name, url, balance: 0, id: Date.now() };
    onAddFriend(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={handleNewFriend}>
      <label>👫 Friend name </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄 Image URL </label>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />

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

function FormSplitBill({ friends }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <label>💰 Bill Value</label>
      <input type="text" value={friends.balance} />
      <label>💰 Your expense</label>
      <input type="text" />
      <label>💰 X's expense</label>
      <input type="text" disabled />
      <label>🤑 Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
