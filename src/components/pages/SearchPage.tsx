import React, { useEffect, useState } from "react";
import { getBreeds, searchDogs, fetchDogsByIds } from "../../utils/fetchAPI";
import { useNavigate } from "react-router-dom";
import DogCard from "../DogCard";
import { Dog } from "../../types"
import { motion, AnimatePresence } from "framer-motion";
import '../styles/SearchPage.css'

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
        <div className="search-container">
            
            <motion.h1 initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="search-title">
                Search the dog breed you have in your mind right now...
            </motion.h1>

            <div className="filters">

                <label htmlFor="breed-filter">Breed Filter: </label>
                <motion.select id="breed-filter" value={selectedBreed} onChange={e => {
                    setPageFrom(0)
                    setSelectedBreed(e.target.value)
                }}
                    whileHover={{ scale: 1.05 }}
                    whileFocus={{ scale: 1.02 }}
                >
                    <option value="">List of breeds...</option>
                    {allBreeds && allBreeds.map(breed => (
                        <option value={breed} key={breed}>{breed}</option>
                    ))}
                </motion.select>

                <label htmlFor="sort-order">Sort by breed: </label>
                <motion.select
                    id="sort-order"
                    value={sortOrder}
                    onChange={e => {
                        setSortOrder(e.target.value as "asc" | "desc")
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileFocus={{ scale: 1.02 }}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </motion.select>

            </div>

    

                <div className="pagination">
                    <motion.button whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }} onClick={handlePrevPage}
                        className="pagination-button"
                        disabled={pageFrom === 0}>Prev</motion.button>
                    <motion.button whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }} onClick={handleNextPage}
                        className="pagination-button"
                        disabled={pageFrom + PAGE_SIZE >= totalResults}>Next</motion.button>
                </div>

                {loading && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="loading-message"
                    >
                        Loading dogs...
                    </motion.p>
                )}

                <div className="dog-cards-container">
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
                </div>

                <div className="match-button-container">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }} 
                        className="match-button" 
                        onClick={handleMatch} disabled={favoriteDogIds.length === 0}
                        >
                            Generate Match
                    </motion.button>
                    <p>Favorites: {favoriteDogIds.length}</p>

                </div>
            
        </div>
    )
}

export default SearchPage