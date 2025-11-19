import React from "react";
import { Container, Paper, Typography, TextField, Button, Box } from "@mui/material";

const ApplicationStatus = () => (
  <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
    <Paper
      elevation={8}
      sx={{
        p: 5,
        background: "rgba(255,255,255,0.97)",
        borderRadius: 4,
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.13)"
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#1e293b", fontWeight: 700, mb: 3 }}
      >
        Solicitud de Ingreso
      </Typography>
      <Box component="form" autoComplete="off" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField label="Nombres" required variant="outlined" fullWidth />
        <TextField label="Apellido Paterno" required variant="outlined" fullWidth />
        <TextField label="Apellido Materno" required variant="outlined" fullWidth />
        <TextField label="Teléfono Celular" required variant="outlined" fullWidth />
        <TextField label="Dirección" required variant="outlined" fullWidth />
        <TextField label="Nombre de Usuario" required variant="outlined" fullWidth />
        <TextField label="Contraseña" required type="password" variant="outlined" fullWidth />
        <TextField label="Fecha de Nacimiento" required type="date" InputLabelProps={{ shrink: true }} variant="outlined" fullWidth />
        <TextField label="Explicación" multiline rows={3} variant="outlined" fullWidth />
        <TextField label="Último Grado Cursado" required variant="outlined" fullWidth />
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            bgcolor: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 3,
            boxShadow: "0 2px 12px rgba(25, 118, 210, 0.15)",
            "&:hover": { bgcolor: "#115293" }
          }}
          fullWidth
        >
          Enviar Solicitud
        </Button>
      </Box>
    </Paper>
  </Container>
);

export default ApplicationStatus;