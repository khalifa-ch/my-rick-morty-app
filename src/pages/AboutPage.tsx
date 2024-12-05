import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Pour récupérer l'ID depuis l'URL
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";
import { fetchSingleCharacter } from "../services/apiService";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: { name: string };
  origin: { name: string };
  gender: string;
}
export const AboutPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const data = await fetchSingleCharacter(Number(id));
        setCharacter(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching character:", error);
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!character) {
    return <Typography variant="h6">Character not found!</Typography>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "200vh",
        padding: "20px",
      }}
    >
      <Card sx={{ maxWidth: "600px", padding: "20px" }}>
        <CardMedia
          component="img"
          alt={character.name}
          height="300"
          image={character.image}
        />
        <CardContent>
          <Typography variant="h4">{character.name}</Typography>
          <Typography variant="h6">Status: {character.status}</Typography>
          <Typography variant="body1">Species: {character.species}</Typography>
          <Typography variant="body1">Gender: {character.gender}</Typography>
          <Typography variant="body1">
            Origin: {character.origin.name}
          </Typography>
          <Typography variant="body1">
            Location: {character.location.name}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
