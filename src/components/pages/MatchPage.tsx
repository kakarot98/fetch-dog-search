import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { matchDogs, fetchDogsByIds, logoutUser } from "../../utils/fetchAPI";
import { Dog } from "../../types";
import { motion } from "framer-motion";

const MatchPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const favorites = location.state?.favorites as string[];


    useEffect(() => {
        const fetchMatch = async () => {
            if (!favorites || favorites.length === 0) return;
            setLoading(true);
            try {
                const matchResponse = await matchDogs(favorites);

                const [dog] = await fetchDogsByIds([matchResponse.match]);
                setMatchedDog(dog);
            } catch (error) {
                console.error("Error fetching match:", error);
            } finally {
                setLoading(false)
            }
        };
        fetchMatch();
    }, [favorites]);

    if (!favorites || favorites.length === 0) {
        return (
            <div style={{ margin: "2rem", textAlign: "center" }}>
                <h1>No favorites selected!</h1>
                <motion.button whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ padding: "0.75rem 1.5rem", cursor: "pointer", marginTop: "1rem" }} onClick={() => navigate("/search")}>Go Back</motion.button>
            </div>
        );
    }


    return (
        <div style={{ margin: "2rem", textAlign: "center" }}>
            <motion.h1 initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}>Your Matched Dog</motion.h1>
            {matchedDog ? (
                <motion.div initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2rem" }}>
                    <img
                        src={matchedDog.img}
                        alt={matchedDog.name}
                        style={{ width: 200, height: "auto", borderRadius: 8, marginRight: 16 }}
                    />
                    <div>
                        <motion.h2 initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}>{matchedDog.name}</motion.h2>
                        <p>Breed: {matchedDog.breed}</p>
                        <p>Age: {matchedDog.age}</p>
                        <p>Zip Code: {matchedDog.zip_code}</p>
                        <motion.button whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ padding: "0.5rem 1rem", marginTop: "1rem", cursor: "pointer", border: "none", borderRadius: "4px" }} onClick={() => navigate("/search")}>Back to Search</motion.button>
                    </div>
                </motion.div>
            ) : (loading &&
                <>
                    <p>Matching your dog...</p>
                    <button onClick={() => {
                        logoutUser().then(() => {
                            navigate("/");
                        });
                    }}>
                        Logout
                    </button>
                </>
            )}
        </div>
    )
}

export default MatchPage