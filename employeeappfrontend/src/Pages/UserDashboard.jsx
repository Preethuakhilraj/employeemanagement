import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import axiosInstance from './axiosinterceptor';

export default function UserDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/admin/view');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="5vh">
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  return (
    <Box
      component="main"
      sx={{
        marginTop: { xs: '20px', md: '100px' },
        padding: { xs: 2, md: 3 },
        width: { xs: '90vw', md: '85vw' },
        marginLeft: { xs: '5vw', md: '100px' },
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          textAlign: { xs: 'center', md: 'left' },
          marginBottom: { xs: 2, md: 3 },
        }}
      >
        EMPLOYEE LIST - USER DASHBOARD
      </Typography>

      <hr />

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 600 }} aria-label="employee table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.200' }}>
                EMPLOYEE ID
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.200' }}>
                EMPLOYEE NAME
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', backgroundColor: 'grey.200' }}>
                DESIGNATION
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', backgroundColor: 'grey.200' }}>
                LOCATION
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', backgroundColor: 'grey.200' }}>
                SALARY
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row._id}
                sx={{
                  '&:nth-of-type(odd)': {
                    backgroundColor: 'action.hover',
                  },
                  '&:nth-of-type(even)': {
                    backgroundColor: 'common.white',
                  },
                }}
              >
                <TableCell component="th" scope="row">{row._id}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.designation}</TableCell>
                <TableCell align="left">{row.location}</TableCell>
                <TableCell align="left">{row.salary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
