import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../../../service/api_axios";
import { IStateTruck } from "../interfaces/IState";

export const InputStateTruck = ({
  hanlderValue,
  hanlderChange,
}: {
  hanlderValue: number | undefined | null;
  hanlderChange: any;
}) => {
  const [StateTrucks, setStateTrucks] = useState([]);

  useEffect(() => {
    let mounted = true;
    const getTrucksApi = async () => {
      try {
        const resp = await api("/api/truks/states");
        setStateTrucks(resp.data.data);
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
      <FormControl fullWidth required>
        <InputLabel id="state-truck-selected">Estado maquina</InputLabel>
        <Select
          labelId="state-truck-selected"
          value={hanlderValue?.toString()}
          label="Estado maquina"
          name="stateTruck"
          onChange={hanlderChange}
        >
          {StateTrucks.map((state: IStateTruck) => (
            <MenuItem key={state.id_estado} value={state.id_estado}>
              {state.estado}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
