import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../service/api_axios";
import { AddFormIncident } from "./components/add_fomr_incident";

interface user {
  cargo: { cargo: string; id_cargo: number };
  id: number;
  nombre: string;
}

export const AddIncidentView = () => {
  const { id } = useParams();

  const [Users, setUsers] = useState([]);

  const [SelectedUser, setSelectedUser] = useState<string | undefined>();

  useEffect(() => {
    let mounted = true;
    const getUsers = async () => {
      const users = await api("/api/users");
      setUsers(users.data.data);
      console.log(users.data.data);
    };
    if (mounted) {
      getUsers();
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <>
      <Container>
        <Typography variant="h3">Añadir incidente</Typography>
        <Grid container>
          <FormControl fullWidth required>
            <InputLabel id="state-truck-selected">Elegir usuario</InputLabel>
            <Select
              labelId="state-truck-selected"
              value={SelectedUser ?? ""}
              label="Elegir usuario"
              name="stateTruck"
              onChange={(e) => {
                console.log(e.target.value);
                setSelectedUser(e.target.value);
              }}
            >
              {Users.map((user: user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid container>
          {SelectedUser === undefined ? (
            <></>
          ) : (
            <AddFormIncident id_truck={id ?? ""} id_user={SelectedUser ?? ""} />
          )}
        </Grid>
      </Container>
    </>
  );
};
