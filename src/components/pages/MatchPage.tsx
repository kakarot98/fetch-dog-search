import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { matchDogs, fetchDogsByIds, logoutUser } from "../../utils/fetchAPI";
import { Dog } from "../../types";

const MatchPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
    const favorites = location.state?.favorites as string[];


    useEffect(() => {
        const fetchMatch = async () => {
            if (!favorites || favorites.length === 0) return;
            try {
                const matchResponse = await matchDogs(favorites);

                const [dog] = await fetchDogsByIds([matchResponse.match]);
                setMatchedDog(dog);
            } catch (error) {
                console.error("Error fetching match:", error);
            }
        };
        fetchMatch();
    }, [favorites]);

    if (!favorites || favorites.length === 0) {
        return (
            <div style={{ margin: "2rem" }}>
                <h1>No favorites selected!</h1>
                <button onClick={() => navigate("/search")}>Go Back</button>
            </div>
        );
    }


    return (
        <div>
            <h1>Your Matched Dog</h1>
            {matchedDog ? (
                <div>
                    <img
                        src={matchedDog.img}
                        alt={matchedDog.name}
                    />
                    <div>
                        <h2>{matchedDog.name}</h2>
                        <p>Breed: {matchedDog.breed}</p>
                        <p>Age: {matchedDog.age}</p>
                        <p>Zip Code: {matchedDog.zip_code}</p>
                        <button onClick={() => navigate("/search")}>Back to Search</button>
                    </div>
                </div>
            ) : (
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