import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api/character";

// export const fetchCharacters = async (page: number = 1) => {
//   try {
//     const response = await axios.get(`${BASE_URL}?page=${page}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching characters:", error);
//     throw error;
//   }
// };
export const fetchCharacters = async (page: number = 1, name: string = "") => {
  try {
    const response = await axios.get(
      `${BASE_URL}/?page=${page}&name=${name}` // `name` n'est utilisé que s'il est fourni
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

export const fetchSingleCharacter = async (id: number = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};


