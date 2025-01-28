import React, { useEffect, useState } from "react";
import { getBreeds, searchDogs, fetchDogsByIds } from "../../utils/fetchAPI";
import { useNavigate } from "react-router-dom";
import DogCard from "../DogCard";
import { Dog } from "../../types"
import { motion, AnimatePresence } from "framer-motion";

const PAGE_SIZE = 10;

const SearchPage: React.FC = () => {

    const navigate = useNavigate();

    const [allBreeds, setAllBreeds] = useState<string[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [pageFrom, setPageFrom] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [dogResults, setDogResults] = useState<Dog[]>([]);
    const [favoriteDogIds, setFavoriteDogIds] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchAllBreeds = async () => {
            try {
                const breeds = await getBreeds();
                setAllBreeds(breeds);
            } catch (err) {
                console.error("Error fetching breeds:", err);
            }
        };
        fetchAllBreeds();
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const query = {
                breeds: selectedBreed ? [selectedBreed] : [],
                size: PAGE_SIZE,
                from: pageFrom,
                sort: `breed:${sortOrder}`,
            };

            const { resultIds, total } = await searchDogs(query);
            setTotalResults(total);

            // fetch actual dog objects
            const dogs = await fetchDogsByIds(resultIds);
            setDogResults(dogs);
        } catch (err) {
            console.error("Error searching dogs:", err);
        } finally {
            setLoading(false)
        }
    };


    useEffect(() => {
        handleSearch();
    }, [selectedBreed, sortOrder, pageFrom]);


    const handleNextPage = () => {
        setPageFrom((prev) => prev + PAGE_SIZE);
    };


    const handleMatch = () => {
        navigate("/match", { state: { favorites: favoriteDogIds } });
    };


    const handlePrevPage = () => {
        setPageFrom((prev) => Math.max(prev - PAGE_SIZE, 0));
    };


    const handleFavoriteToggle = (dogId: string) => {
        setFavoriteDogIds((prev) =>
            prev.includes(dogId) ? prev.filter((id) => id !== dogId) : [...prev, dogId]
        );
    };


    return (
        <div style={{ margin: "2rem" }}>
            <motion.div initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }} style={{ display: "flex", gap: "1rem", alignItems: "center", flexDirection: "column" }}>
                <motion.h1 initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: "center" }}>Search the dog breed you have in your mind right now...</motion.h1>

                <label htmlFor="">Breed Filter: </label>
                <motion.select name="" id="" value={selectedBreed} onChange={e => {
                    setPageFrom(0)
                    setSelectedBreed(e.target.value)
                }} whileHover={{ scale: 1.05 }}
                    whileFocus={{ scale: 1.02 }}
                    style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}>
                    <option value="">List of breeds...</option>
                    {allBreeds && allBreeds.map(breed => (
                        <option value={breed} key={breed}>{breed}</option>
                    ))}
                </motion.select>


                <div>
                    <label htmlFor="">Sort by breed: </label>
                    <motion.select name="" id="" value={sortOrder} onChange={e => {
                        setSortOrder(e.target.value as "asc" | "desc")
                    }} whileHover={{ scale: 1.05 }}
                        whileFocus={{ scale: 1.02 }} style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </motion.select>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }} style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <motion.button whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }} onClick={handlePrevPage}
                        style={{
                            padding: "0.5rem 1rem",
                            marginRight: "1rem",
                            cursor: pageFrom === 0 ? "not-allowed" : "pointer",
                            border: "none",
                            borderRadius: "4px",
                        }}
                        disabled={pageFrom === 0}>Prev</motion.button>
                    <motion.button whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }} onClick={handleNextPage}
                        style={{
                            padding: "0.5rem 1rem",
                            marginLeft: "1rem",
                            cursor: pageFrom + PAGE_SIZE >= totalResults ? "not-allowed" : "pointer",
                            border: "none",
                            borderRadius: "4px",
                        }}
                        disabled={pageFrom + PAGE_SIZE >= totalResults}>Next</motion.button>
                </motion.div>

                {loading && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{ textAlign: "center", marginTop: "1rem" }}
                    >
                        Loading dogs...
                    </motion.p>
                )}

                <motion.div style={{ display: "flex", flexWrap: "wrap", marginTop: "1rem" }}>
                    <AnimatePresence>
                        {dogResults.map((dog) => (
                            <motion.div key={dog.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}>
                                <DogCard
                                    dog={dog}
                                    isFavorite={favoriteDogIds.includes(dog.id)}
                                    onToggleFavorite={handleFavoriteToggle}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{ marginTop: "2rem", textAlign: "center" }}>
                    <motion.button whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }} style={{
                            padding: "0.75rem 1.5rem",
                            cursor: favoriteDogIds.length === 0 ? "not-allowed" : "pointer",
                            borderRadius: "4px",
                        }} onClick={handleMatch} disabled={favoriteDogIds.length === 0}>Generate Match</motion.button>
                    <p>Favorites: {favoriteDogIds.length}</p>
                    <motion.div initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }} style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <motion.button whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }} onClick={handlePrevPage}
                        style={{
                            padding: "0.5rem 1rem",
                            marginRight: "1rem",
                            cursor: pageFrom === 0 ? "not-allowed" : "pointer",
                            border: "none",
                            borderRadius: "4px",
                        }}
                        disabled={pageFrom === 0}>Prev</motion.button>
                    <motion.button whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }} onClick={handleNextPage}
                        style={{
                            padding: "0.5rem 1rem",
                            marginLeft: "1rem",
                            cursor: pageFrom + PAGE_SIZE >= totalResults ? "not-allowed" : "pointer",
                            border: "none",
                            borderRadius: "4px",
                        }}
                        disabled={pageFrom + PAGE_SIZE >= totalResults}>Next</motion.button>
                </motion.div>

                </motion.div>
            </motion.div>
        </div>
    )
}

export default SearchPage