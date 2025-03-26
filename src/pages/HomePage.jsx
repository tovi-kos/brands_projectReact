import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import { httpGetBrandByBrand } from "../api/brandService"; // קריאה לפונקציה
import { useNavigate } from "react-router-dom";
import { renderUrl } from "../../basicUrl";

const brands = [
  { name: "Adidas", image: "Adidas.png" },
  { name: "Nautica", image: "nautica.jpg" },
  { name: "Tous", image: "Tous.png" },
  { name: "Nike", image: "Nike.png" },
  { name: "Gant", image: "Gant.png" },
  { name: "Levis", image: "Levis.png" },
  { name: "Pandora", image: "Pandora.png" },
  { name: "Tommy", image: "Tommy.png" },
  { name: "Lacost", image: "Lacoste.jpg" },
];

const HomePage = () => {
  const [arr, setArr] = useState([]);
  const navigate = useNavigate();

  const brandClick = (brandName) => {
    httpGetBrandByBrand(brandName)
      .then((res) => {
        console.log(res.data);
        setArr(res.data);
        navigate(`/byBrand/?brand=${brandName}`);
      })
      .catch((error) => {
        console.error("Error fetching products by brand:", error);
      });
  };

  return (
    <Grid container spacing={2}>
      {/* הצגת המותגים בשלושה תורים */}
      {brands.map((brand, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 200,
              cursor: "pointer",
              overflow: "hidden",
              border: "1px solid #ccc", // מסגרת קלה
              borderRadius: "8px", // עיגול פינות קל
              '&:hover .overlay': { opacity: 1 },
            }}
            onClick={() => brandClick(brand.name)}
          >
            <Box
              component="img"
              src={`${renderUrl}/${brand.image}`}
              alt={brand.name}
              sx={{
                width: "100%", // תתפוס את כל הרוחב
                height: "100%", // תתפוס את כל הגובה
                objectFit: "cover", // התמונה תתאים למידות המלבן מבלי לעוות
                display: "block", // לוודא שהתמונה תוצג כבלוק
              }}
            />
            <Box
              className="overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "rgba(0, 0, 0, 0.5)", // צל כהה
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              <h3 style={{ color: "white", fontWeight: "bold" }}>{brand.name}</h3>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default HomePage;
