import React from "react";
import { Dog } from "../types";
import { motion } from "framer-motion";
import './styles/DogCard.css'

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
      className="dog-card"
    >
      <img
        src={dog.img}
        alt={dog.name}
        className="dog-card-image"
      />
      <h4>{dog.name}</h4>
      <p>Breed: {dog.breed}</p>
      <p>Age: {dog.age}</p>
      <p>Zip Code: {dog.zip_code}</p>
      <motion.button
        className="favorite-button" 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onToggleFavorite(dog.id)}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </motion.button>
    </motion.div>
  );
};

export default DogCard;