import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { renderUrl } from "../../basicUrl";

function HomeImage({ item, index }) {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} key={index}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 300, // גובה קבוע לכל ריבוע
          cursor: "pointer",
          overflow: "hidden",
          border: "3px solid black", // מסגרת שחורה כהה
          "&:hover .overlay": { opacity: 1 },
        }}
        onClick={() => navigate(`/allbrands?gender=${item.name}`)}
      >
        <Box
          component="img"
          src={`${renderUrl}/${item.image}`}
          alt={item.name}
          sx={{
            width: "100%",
            height: "auto",
            objectFit: "cover", // מוודא שהתמונה ממלאת את כל הריבוע
            display: "block"
          
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
            bgcolor: "rgba(0, 0, 0, 0.7)", // כהה יותר
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <Typography variant="h3" sx={{ color: "white", fontWeight: "bold" }}>
            {item.name}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}

export default HomeImage;
