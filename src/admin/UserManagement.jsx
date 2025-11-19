import React, { useState, useEffect } from 'react';
import { IoMdCreate, IoMdTrash} from "react-icons/io";
import { 
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import esLocale from 'date-fns/locale/es';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    names: '',
    last_name: '',
    last_second_name: '',
    celphone: '',
    address: '',
    username: '',
    passwd: '',
    date_of_birth: '',
    explanation: '',
    last_grade: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/admin/users');
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        setError(data.error || 'Error al cargar usuarios');
      }
    } catch (error) {
      setError('Error de conexión al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setFormData({
        ...user,
        date_of_birth: new Date(user.date_of_birth),
      });
    } else {
      setSelectedUser(null);
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
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setError(null);
  };

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
      const url = selectedUser
        ? `http://localhost:5000/admin/users/${selectedUser.id}`
        : 'http://localhost:5000/admin/users';
      
      const method = selectedUser ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
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
        setSuccess(data.message || 'Operación exitosa');
        handleCloseDialog();
        fetchUsers();
      } else {
        setError(data.error || 'Error al guardar usuario');
      }
    } catch (error) {
      setError('Error de conexión al guardar usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const response = await fetch(`http://localhost:5000/admin/users/${userId}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(data.message || 'Usuario eliminado exitosamente');
          setUsers(users.filter(user => user.id !== userId));
        } else {
          setError(data.error || 'Error al eliminar usuario');
        }
      } catch (error) {
        setError('Error de conexión al eliminar usuario');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container maxWidth="lg" className='!text-white' sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Gestión de Usuarios
        </Typography>
        <button
            type="submit"
            className="flex w-auto justify-center rounded-md !bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:!outline-blue-500"
        >
            Agregar Usuario
        </button>
      </Box>

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

      <TableContainer component={Paper} className='!text-white'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Último Grado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {user.names} {user.last_name} {user.last_second_name}
                  </TableCell>
                  <TableCell>{user.celphone}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.last_grade}</TableCell>
                  <TableCell>
                    <button
                      color="primary"
                      onClick={() => handleOpenDialog(user)}
                      disabled={loading}
                    >
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
                    </button>
                    <button
                      color="error"
                      onClick={() => handleDelete(user.id)}
                      disabled={loading}
                    >
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog className='!text-white' open={openDialog} onClose={handleCloseDialog} maxWidith="sm" fullWidth>
        <DialogTitle>
          {selectedUser ? 'Editar Usuario' : 'Nuevo Usuario'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
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
                className='text-white'
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
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} disabled={loading}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : selectedUser ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default UserManagement; 