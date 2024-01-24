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

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList data={initialFriends} />

        {openAddFriend && (
          <FormAddFriend friends={friends} onsetFriends={setFriends} />
        )}
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

function FriendsList() {
  const friends = initialFriends;
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

function FormAddFriend({ friends, onsetFriends }) {
  return (
    <form className="form-add-friend">
      <label>👫 Friend name </label>
      <input
        type="text"
        value={friends.name}
        onChange={(e) => onsetFriends(e)}
      />
      <label>🌄 image URL </label>
      <input
        type="text"
        value={friends.image}
        onChange={(e) => onsetFriends(e)}
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
