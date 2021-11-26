import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { InputStateTruck } from "./input_state_truck";

import { Formik, FormikProps } from "formik";
import { ITruck } from "../interfaces/ITruck";
import api from "../../../service/api_axios";

export const AddTruck = ({ callback }: { callback: any }) => {
  const initialValues: FormValues = {
    nameTruck: "",
    descTruck: "",
    stateTruck: -1,
  };

  const [AddTruckSelected, setAddTruckSelected] = useState(false);

  const callBackClosedInputAdd = () => {
    setAddTruckSelected(false);
  };

  const insertTruck = async (truck: ITruck) => {
    try {
      await api.post("/api/truks/add", {
        truck: truck,
      });
      callBackClosedInputAdd();
      callback();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      style={{ height: "100%", cursor: "pointer" }}
      onClick={() => {
        if (AddTruckSelected === false) {
          setAddTruckSelected(true);
        }
      }}
    >
      {AddTruckSelected ? (
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            if (values.stateTruck != null) {
              insertTruck({
                id_maquina: undefined,
                nombre: values.nameTruck,
                descripcion: values.descTruck,
                estado: {
                  id_estado: values.stateTruck,
                  estado: "",
                  descripcion: "",
                },
              });
            }
          }}
        >
          {(props) => (
            <InputAddTruck
              formikProp={props}
              callback={callBackClosedInputAdd}
            />
          )}
        </Formik>
      ) : (
        <TextDefaultAddTruck />
      )}
    </Card>
  );
};
interface InputProp {
  formikProp: FormikProps<FormValues>;
  callback: any;
}
interface FormValues {
  nameTruck: string;
  descTruck: string;
  stateTruck: number | undefined | null;
}

const InputAddTruck = ({ formikProp, callback }: InputProp) => (
  <form onSubmit={formikProp.handleSubmit}>
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      justifyItems="center"
      style={{ height: "100%", padding: "2rem" }}
    >
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        align="center"
        color="text.secondary"
      >
        Agregar máquina
      </Typography>
      <Box height={10} />

      <TextField
        id="outlined-basic"
        label="Nombre maquina"
        variant="outlined"
        name="nameTruck"
        onChange={formikProp.handleChange}
        value={formikProp.values.nameTruck}
        required
      />
      <Box height={10} />
      <TextField
        id="outlined-basic"
        label="Descripción maquina"
        variant="outlined"
        name="descTruck"
        onChange={formikProp.handleChange}
        value={formikProp.values.descTruck}
        required
      />
      <Box height={10} />
      <Grid container style={{ padding: "0rem 1.5rem 0rem 1.5rem" }}>
        <InputStateTruck
          hanlderChange={formikProp.handleChange}
          hanlderValue={formikProp.values.stateTruck}
        />
      </Grid>
      <Box height={10} />

      <Grid container justifyContent="space-around">
        <Button
          size="small"
          color="error"
          onClick={() => {
            callback();
          }}
        >
          Cancelar
        </Button>
        <Button size="small" color="primary" type="submit">
          Agregar
        </Button>
      </Grid>
    </Grid>
  </form>
);

const TextDefaultAddTruck = () => (
  <Grid
    container
    direction="column"
    justifyContent="center"
    alignContent="center"
    alignItems="center"
    justifyItems="center"
    style={{ height: "100%" }}
  >
    <Typography
      gutterBottom
      variant="h5"
      component="div"
      align="center"
      color="text.secondary"
    >
      +
    </Typography>
    <Typography
      gutterBottom
      variant="h5"
      component="div"
      align="center"
      color="text.secondary"
    >
      Agregar nueva maquina
    </Typography>
  </Grid>
);
