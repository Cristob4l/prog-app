import { Card, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { ITruck } from "../interfaces/ITruck";
import WarningIcon from "@mui/icons-material/Warning";
import { useNavigate } from "react-router";
import AddModeratorIcon from "@mui/icons-material/AddModerator";

interface Props {
  truck: ITruck;
}

export const CardTruck = ({ truck }: Props) => {
  let navigator = useNavigate();
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
            <Grid container justifyContent="space-between">
              <Typography gutterBottom variant="h5" component="div">
                {truck.nombre}
              </Typography>
              <Grid>
                <Grid
                  onClick={() => {
                    navigator("/maquinaria/incidentes/" + truck.id_maquina);
                  }}
                >
                  <WarningIcon color="warning" />
                </Grid>
                <Grid
                  onClick={() => {
                    navigator("/maquinaria/add/incidente/" + truck.id_maquina);
                  }}
                >
                  <AddModeratorIcon color="error" />
                </Grid>
              </Grid>
            </Grid>
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
