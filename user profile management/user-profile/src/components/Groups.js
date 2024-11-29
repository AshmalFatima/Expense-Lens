import React, { useState } from "react";

function Groups() {
  const randomGroupImages = [
    "https://via.placeholder.com/100x100.png?text=Family",
    "https://via.placeholder.com/100x100.png?text=Friends",
    "https://via.placeholder.com/100x100.png?text=Work",
    "https://via.placeholder.com/100x100.png?text=Hobbies",
    "https://via.placeholder.com/100x100.png?text=Travel",
  ];

  const initialGroups = [
    { name: "Family", image: randomGroupImages[0] },
    { name: "Friends", image: randomGroupImages[1] },
    { name: "Work", image: randomGroupImages[2] },
  ];

  const [groups, setGroups] = useState(initialGroups);
  const [newGroup, setNewGroup] = useState("");

  const handleAddGroup = () => {
    if (newGroup.trim() === "") {
      alert("Please enter a group name.");
      return;
    }

    const randomImage = randomGroupImages[Math.floor(Math.random() * randomGroupImages.length)];

    const newGroupData = {
      name: newGroup,
      image: randomImage,
    };

    setGroups([...groups, newGroupData]);
    setNewGroup("");
  };

  return (
    <div className="groups">
      <h2>Groups</h2>

      <div>
        <input
          type="text"
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          placeholder="Enter group name"
        />
        <button onClick={handleAddGroup}>Add Group</button>
      </div>

      <div className="groups-container">
        {groups.map((group, index) => (
          <div key={index} className="group-card">
            <img src={group.image} alt={group.name} className="group-img" />
            <h5 className="group-name">{group.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Groups;
