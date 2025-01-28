import React, { useEffect, useState } from "react";
import { getBreeds, searchDogs, fetchDogsByIds } from "../../utils/fetchAPI";
import { useNavigate } from "react-router-dom";
import DogCard from "../DogCard";

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
    try {
      const query = {
        breeds: selectedBreed ? [selectedBreed] : [],
        size: PAGE_SIZE,
        from: pageFrom,
        sort: `breed:${sortOrder}`, // by default we are sorting by breed
      };

      const { resultIds, total } = await searchDogs(query);
      setTotalResults(total);

      // fetch actual dog objects
      const dogs = await fetchDogsByIds(resultIds);
      setDogResults(dogs);
    } catch (err) {
      console.error("Error searching dogs:", err);
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
    <div>
        <h1>Search the dog breed you have in your mind right now...</h1>

        <label htmlFor="">Breed Filter: </label>
        <select name="" id="" value={selectedBreed} onChange={e => {
            setPageFrom(0)
            setSelectedBreed(e.target.value)
        }}>
            <option value="">List of breeds...</option>
            {allBreeds && allBreeds.map(breed => (
                <option value={breed} key={breed}>{breed}</option>
            ))}
        </select>


        <div>
            <label htmlFor="">Sort by breed: </label>
            <select name="" id="" value={sortOrder} onChange={e => {
                setSortOrder(e.target.value as "asc" | "desc")
            }}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>

        <div>
            <button onClick={handlePrevPage} disabled={pageFrom===0}>Prev</button>
            <button onClick={handleNextPage} disabled={pageFrom + PAGE_SIZE >= totalResults}>Next</button>
        </div>

        <div>
        {dogResults.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            isFavorite={favoriteDogIds.includes(dog.id)}
            onToggleFavorite={handleFavoriteToggle}
          />
        ))}
        </div>

        <div>
            <button onClick={handleMatch} disabled={favoriteDogIds.length === 0}>Generate Match</button>
            <p>Favorites: {favoriteDogIds.length}</p>

        </div>
    </div>
  )
}

export default SearchPage