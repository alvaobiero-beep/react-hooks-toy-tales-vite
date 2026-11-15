import React, { useState, useEffect } from "react"; // CHANGED: added useEffect

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]); // ADDED

  // ADDED: load all toys on page load
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // ADDED: create a toy
  function handleAddToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newToy, likes: 0 }),
    })
      .then((r) => r.json())
      .then((created) => setToys((prev) => [...prev, created]));
  }

  // ADDED: delete a toy
  function handleDonate(id) {
    fetch(`http://localhost:3001/toys/${id}`, { method: "DELETE" }).then(() =>
      setToys((prev) => prev.filter((toy) => toy.id !== id))
    );
  }

  // ADDED: like a toy (map keeps the order)
  function handleLike(toy) {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: toy.likes + 1 }),
    })
      .then((r) => r.json())
      .then((updated) =>
        setToys((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
      );
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null} {/* CHANGED: prop */}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDonate={handleDonate} onLike={handleLike} /> {/* CHANGED: props */}
    </>
  );
}

export default App;