import React from "react";
import { Dog } from "../types";
import { motion } from "framer-motion";

interface DogCardProps {
  dog: Dog;
  isFavorite: boolean;
  onToggleFavorite: (dogId: string) => void;
}

const DogCard: React.FC<DogCardProps> = ({ dog, isFavorite, onToggleFavorite }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.95 }}
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
      <motion.button whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }} style={{
          padding: "0.5rem",
          backgroundColor: isFavorite ? "#805252" : "#6e2626",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }} onClick={() => onToggleFavorite(dog.id)}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </motion.button>
    </motion.div>
  );
};

export default DogCard;