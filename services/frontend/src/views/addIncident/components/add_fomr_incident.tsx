import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../../service/api_axios";

interface IProps {
  id_truck: string;
  id_user: string;
}

export const AddFormIncident = (props: IProps) => {
  let navigator = useNavigate();

  const [Desc, setDesc] = useState("");

  const handlerAddIncident = async () => {
    try {
      await api.post("/api/truks/" + props.id_truck + "/incident", {
        idUser: props.id_user,
        desc: Desc,
      });
      navigator("/maquinaria/incidentes/" + props.id_truck);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Grid container style={{ marginTop: "2rem" }}>
        <TextField
          id="outlined-basic"
          label="Descripción incidente"
          variant="outlined"
          name="descTruck"
          fullWidth
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          value={Desc}
          required
        />
      </Grid>
      <Grid container style={{ marginTop: "2rem" }}>
        <Button
          variant="contained"
          fullWidth
          disabled={Desc === ""}
          onClick={() => handlerAddIncident()}
        >
          Confirmar
        </Button>
      </Grid>
    </>
  );
};
