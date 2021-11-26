import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../service/api_axios";
import { AddTruck } from "./components/add_truck";
import { CardTruck } from "./components/card_truck";
import { ITruck } from "./interfaces/ITruck";

export const TruckView = () => {
  const [Trucks, setTrucks] = useState([]);

  const resetGetTrucksApi = async () => {
    try {
      const resp = await api("/api/truks");
      setTrucks(resp.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let mounted = true;
    const getTrucksApi = async () => {
      try {
        const resp = await api("/api/truks");
        setTrucks(resp.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (mounted) {
      getTrucksApi();
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="stretch"
        style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
      >
        {Trucks.map((truck: ITruck) => (
          <CardTruck key={truck.id_maquina} truck={truck} />
        ))}
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
          style={{ margin: "1rem 0rem 0rem 0rem" }}
        >
          <AddTruck callback={resetGetTrucksApi} />
        </Grid>
      </Grid>
    </>
  );
};
