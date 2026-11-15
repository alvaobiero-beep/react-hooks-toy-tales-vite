import React, { useState } from "react"; // CHANGED: added useState

function ToyForm({ onAddToy }) { // CHANGED: prop
  const [name, setName] = useState(""); // ADDED
  const [image, setImage] = useState(""); // ADDED

  // ADDED
  function handleSubmit(e) {
    e.preventDefault();
    onAddToy({ name, image });
    setName("");
    setImage("");
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}> {/* CHANGED: onSubmit */}
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={name} // ADDED
          onChange={(e) => setName(e.target.value)} // ADDED
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={image} // ADDED
          onChange={(e) => setImage(e.target.value)} // ADDED
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;