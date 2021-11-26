import { Card, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { ITruck } from "../interfaces/ITruck";

interface Props {
  truck: ITruck;
}

export const CardTruck = ({ truck }: Props) => {
  return (
    <Grid item xs={12} md={6} lg={3} style={{ margin: "1rem 0rem 0rem 0rem" }}>
      <Card style={{ height: "100%", padding: "0rem 2rem 0rem 2rem" }}>
        <Grid
          container
          style={{ height: "100%" }}
          direction="column"
          justifyContent="space-around"
        >
          <Grid>
            <Typography gutterBottom variant="h5" component="div">
              {truck.nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {truck.descripcion}
            </Typography>
          </Grid>
          <Box height={20} />

          <Typography align="right" variant="body2" color="text.secondary">
            Estado de la maquinaria: {truck.estado.estado}
          </Typography>
        </Grid>
      </Card>
    </Grid>
  );
};
