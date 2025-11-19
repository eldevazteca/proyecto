import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import esLocale from 'date-fns/locale/es';

const StudentApplication = () => {
  const [formData, setFormData] = useState({
    names: '',
    last_name: '',
    last_second_name: '',
    celphone: '',
    address: '',
    username: '',
    passwd: '',
    date_of_birth: null,
    explanation: '',
    last_grade: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date_of_birth: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:5000/client/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date_of_birth: formData.date_of_birth.toISOString().split('T')[0],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Solicitud enviada exitosamente');
        setFormData({
          names: '',
          last_name: '',
          last_second_name: '',
          celphone: '',
          address: '',
          username: '',
          passwd: '',
          date_of_birth: null,
          explanation: '',
          last_grade: '',
        });
      } else {
        setError(data.error || 'Error al enviar la solicitud');
      }
    } catch (error) {
      setError('Error de conexión al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Solicitud de Ingreso
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              required
              label="Nombres"
              name="names"
              value={formData.names}
              onChange={handleChange}
              disabled={loading}
            />

            <TextField
              required
              label="Apellido Paterno"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              disabled={loading}
            />

            <TextField
              required
              label="Apellido Materno"
              name="last_second_name"
              value={formData.last_second_name}
              onChange={handleChange}
              disabled={loading}
            />

            <TextField
              required
              label="Teléfono Celular"
              name="celphone"
              value={formData.celphone}
              onChange={handleChange}
              inputProps={{ maxLength: 10 }}
              disabled={loading}
            />

            <TextField
              required
              label="Dirección"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={loading}
            />

            <TextField
              required
              label="Nombre de Usuario"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
            />

            <TextField
              required
              label="Contraseña"
              name="passwd"
              type="password"
              value={formData.passwd}
              onChange={handleChange}
              disabled={loading}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
              <DatePicker
                label="Fecha de Nacimiento"
                value={formData.date_of_birth}
                onChange={handleDateChange}
                disabled={loading}
                renderInput={(params) => <TextField {...params} required />}
              />
            </LocalizationProvider>

            <TextField
              required
              label="Explicación"
              name="explanation"
              value={formData.explanation}
              onChange={handleChange}
              multiline
              rows={4}
              disabled={loading}
            />

            <TextField
              required
              label="Último Grado Cursado"
              name="last_grade"
              type="number"
              value={formData.last_grade}
              onChange={handleChange}
              inputProps={{ min: 1, max: 12 }}
              disabled={loading}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Enviar Solicitud'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default StudentApplication; 