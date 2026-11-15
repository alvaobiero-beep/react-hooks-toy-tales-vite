import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onDonate, onLike }) { // CHANGED: props
  return (
    <div id="toy-collection">
      {/* Render the collection of ToyCards */}
      {toys.map((toy) => (
        <ToyCard key={toy.id} toy={toy} onDonate={onDonate} onLike={onLike} />
      ))}
    </div>
  );
}

export default ToyContainer;