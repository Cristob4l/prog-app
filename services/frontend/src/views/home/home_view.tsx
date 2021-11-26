import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";

export const HomeView = () => {
  let navigate = useNavigate();
  return (
    <Box pl={5} pr={5}>
      <Grid
        container
        direction="column"
        spacing={2}
        style={{ padding: "2rem 0rem 0rem 0rem" }}
      >
        <Button
          onClick={() => {
            navigate("/maquinaria");
          }}
          variant="contained"
        >
          Ver todos las maquinas
        </Button>
      </Grid>
      <Grid
        container
        direction="column"
        spacing={2}
        style={{ padding: "2rem 0rem 0rem 0rem" }}
      >
        <Button variant="contained">Ver todos los incidentes</Button>
      </Grid>
      <Grid
        container
        direction="column"
        spacing={2}
        style={{ padding: "2rem 0rem 0rem 0rem" }}
      >
        <Button variant="contained">Ver todo los usuarios</Button>
      </Grid>
    </Box>
  );
};
