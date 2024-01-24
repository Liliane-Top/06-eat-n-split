import { Button } from "./Button";

export function Friend({ friend, onSelection, selectedFriend }) {
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
