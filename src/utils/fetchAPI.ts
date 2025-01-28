import axios from "axios";
import { Dog, MatchResponse } from "../types";

const BASE_URL = "https://frontend-take-home-service.fetch.com"

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  //for authentication
  export const loginUser = async (name: string, email: string) => {
    await api.post('/auth/login', {name, email})
  }

  export const logoutUser = async () => {
    await api.post("/auth/logout");
  };


  export const getBreeds = async (): Promise<string[]> => {
    const response = await api.get("/dogs/breeds");
    return response.data; // array of breed names
  };

  interface DogSearchQuery {
    breeds?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    size?: number; 
    from?: number; 
    sort?: string; 
  }

  interface DogSearchResponse {
    resultIds: string[];
    total: number;
    next?: string;
    prev?: string; 
  }


  export const searchDogs = async (
    query: DogSearchQuery
  ): Promise<DogSearchResponse> => {

    const params = new URLSearchParams();
  
    if (query.breeds && query.breeds.length > 0) {
      query.breeds.forEach((breed) => params.append("breeds", breed));
    }

    if (query.zipCodes && query.zipCodes.length > 0) {
      query.zipCodes.forEach((zip) => params.append("zipCodes", zip));
    }

    if (query.ageMin !== undefined) params.append("ageMin", query.ageMin.toString());
    if (query.ageMax !== undefined) params.append("ageMax", query.ageMax.toString());
    if (query.size !== undefined) params.append("size", query.size.toString());
    if (query.from !== undefined) params.append("from", query.from.toString());
    if (query.sort !== undefined) params.append("sort", query.sort);
  
    const response = await api.get(`/dogs/search?${params.toString()}`);
    return response.data;
  };

  export const fetchDogsByIds = async (dogIds: string[]): Promise<Dog[]> => {
    const response = await api.post("/dogs", dogIds);
    return response.data; // array of dog objects
  };
  
  export const matchDogs = async (dogIds: string[]): Promise<MatchResponse> => {
    const response = await api.post("/dogs/match", dogIds);
    return response.data; // { match: "someDogId" }
  };


  