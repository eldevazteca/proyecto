import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Sobre Nosotros
        </Typography>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            Nuestra Misión
          </Typography>
          <Typography paragraph>
            Somos una institución educativa comprometida con la excelencia académica y el desarrollo integral de nuestros estudiantes.
          </Typography>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            Nuestros Valores
          </Typography>
          <Typography component="ul">
            <li>Excelencia académica</li>
            <li>Innovación educativa</li>
            <li>Compromiso con la comunidad</li>
            <li>Desarrollo integral</li>
          </Typography>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            Programas Educativos
          </Typography>
          <Typography paragraph>
            Ofrecemos una amplia gama de programas educativos diseñados para satisfacer las necesidades de nuestros estudiantes y prepararlos para el futuro.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AboutUs; 