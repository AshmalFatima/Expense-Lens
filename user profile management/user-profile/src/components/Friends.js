import React, { useState } from "react";

function Friends() {
  // List of random image URLs
  const randomImages = [
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
  ];

  // Static list of friends with profile pictures (initial list)
  const initialFriends = [
    { name: "John Doe", image: randomImages[0] },
    { name: "Jane Smith", image: randomImages[1] },
    { name: "Alice Johnson", image: randomImages[2] },
  ];

  // State to manage the list of friends
  const [friends, setFriends] = useState(initialFriends);

  // State for the input field to add new friends
  const [newFriend, setNewFriend] = useState("");

  // Function to handle adding a new friend
  const handleAddFriend = () => {
    if (newFriend.trim() === "") {
      alert("Please enter a friend's name.");
      return;
    }

    // Randomly select an image for the new friend
    const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];

    // Add the new friend with their name and random image
    const newFriendData = {
      name: newFriend,
      image: randomImage,
    };

    setFriends([...friends, newFriendData]);
    setNewFriend(""); // Clear input after adding friend
  };

  return (
    <div className="p-4">
      <h2>Friends</h2>

      {/* Input field and button to add a new friend */}
      <div>
        <input
          type="text"
          value={newFriend}
          onChange={(e) => setNewFriend(e.target.value)}
          placeholder="Enter friend's name"
          className="form-control"
        />
        <button onClick={handleAddFriend} className="btn btn-primary mt-2">
          Add Friend
        </button>
      </div>

      {/* Displaying the list of friends with profile cards */}
      <div className="mt-3">
        <h3>Your Friends</h3>
        <div className="friends-container">
          {friends.map((friend, index) => (
            <div key={index} className="friend-card">
              <img
                src={friend.image}
                alt={friend.name}
                className="friend-img"
              />
              <h5 className="friend-name">{friend.name}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Friends;
