import React, { useEffect, useState } from "react";
import { fetchCharacters } from "../services/apiService";
import { TextField, AppBar, Toolbar, Button } from "@mui/material";

import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: { name: string };
}

const CharactersPage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>(""); // État pour la recherche

  // Fonction pour récupérer les personnages
  const getCharacters = async () => {
    try {
      const data = await fetchCharacters(page); // Appel API
      const limitedCharacters = data.results.slice(0, 10); // Limite à 10 personnages
      setCharacters(limitedCharacters);
      setTotalPages(data.info.pages); // Garde les pages totales
    } catch (err) {
      console.error("Failed to fetch characters", err);
    }
  };

  // Fonction pour gérer la recherche
  const handleSearch = async () => {
    try {
      const data = await fetchCharacters(page, searchTerm); // Inclure `searchTerm`
      const limitedCharacters = data.results.slice(0, 10); // Limite à 10 personnages
      setCharacters(limitedCharacters);
      setTotalPages(Math.min(data.info.pages, 1)); // Limite les pages totales à 1 pour éviter confusion
    } catch (err) {
      console.error("Failed to fetch searched characters", err);
    }
  };

  useEffect(() => {
    getCharacters();
  }, [page]); 

  const handleCardClick = (id: number) => {
    navigate(`/about/${id}`);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value); // Met à jour la page courante
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Barre de recherche */}
      <AppBar position="sticky" color="default" sx={{ marginBottom: "20px" }}>
        <Toolbar>
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for characters"
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1, marginRight: "10px" }}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Toolbar>
      </AppBar>
      {/* Titre */}
      <Typography variant="h4" gutterBottom>
        Characters
      </Typography>
      {/* Liste des personnages */}
      <Grid container spacing={3}>
        {characters.map((character) => (
          <Grid item xs={12} sm={6} md={4} key={character.id}>
            <Card
              onClick={() => handleCardClick(character.id)}
              style={{ cursor: "pointer" }}
            >
              <CardMedia
                component="img"
                height="300"
                image={character.image}
                alt={character.name}
              />
              <CardContent>
                <Typography variant="h6">{character.name}</Typography>
                <Typography variant="body2">
                  Status: {character.status}
                </Typography>
                <Typography variant="body2">
                  Species: {character.species}
                </Typography>
                <Typography variant="body2">
                  Location: {character.location.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Pagination */}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default CharactersPage;
