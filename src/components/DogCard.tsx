import React from "react";
import { Dog } from "../types";

interface DogCardProps {
  dog: Dog;
  isFavorite: boolean;
  onToggleFavorite: (dogId: string) => void;
}

const DogCard: React.FC<DogCardProps> = ({ dog, isFavorite, onToggleFavorite }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: "1rem",
        margin: "0.5rem",
        width: 200,
      }}
    >
      <img
        src={dog.img}
        alt={dog.name}
        style={{ width: "100%", height: "auto", borderRadius: 4 }}
      />
      <h4>{dog.name}</h4>
      <p>Breed: {dog.breed}</p>
      <p>Age: {dog.age}</p>
      <p>Zip Code: {dog.zip_code}</p>
      <button onClick={() => onToggleFavorite(dog.id)}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default DogCard;