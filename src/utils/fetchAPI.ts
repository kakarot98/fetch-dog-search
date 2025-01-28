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



  