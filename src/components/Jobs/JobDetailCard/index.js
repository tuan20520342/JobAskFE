import React from 'react';
import {
  CardContent,
  Typography,
  Paper,
  Divider,
  Button,
  CardActions,
  Grid,
  Rating,
  Stack,
  Tooltip,
} from '@mui/material';
import { ellipsisStyle } from '~/components/UI/EllipsisStyle';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { printNumberWithCommas } from '~/utils/printNumerWithCommas';
import { useNavigate } from 'react-router-dom';

const JobDetailCard = ({ job }) => {
  const navigate = useNavigate();

  const handleGoToCompany = () => {
    navigate('/JobAskFE/company', { state: { company: job?.company } });
  };

  function formatDate(inputDateString) {
    const dateObject = new Date(inputDateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-GB', options);
    return formattedDate;
  }

  return (
    <Paper sx={{ bgcolor: 'white', flex: '1', margin: '0 10px', height: '100%' }} elevation={2}>
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Tooltip title={job.company}>
          <Typography
            gutterBottom
            variant="body1"
            color="primary.main"
            sx={{
              fontWeight: 600,
              textAlign: 'center',
              ...ellipsisStyle,
            }}
          >
            {job.company}
          </Typography>
        </Tooltip>
        <Divider variant="middle" sx={{ marginBottom: '8px' }} />
        <Typography>{`Position: ${job.position}`}</Typography>
        <Typography>{`Location: ${job.location}`}</Typography>
        <Typography>{`Date: ${formatDate(job.date)}`}</Typography>

        <CardActions sx={{ marginTop: 'auto' }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                sx={{ width: '100%' }}
                component="a"
                href={job.jobUrl.replace('vn.', '')}
                target="_blank"
              >
                Job description
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ width: '100%' }}
                startIcon={<FmdGoodIcon />}
                onClick={handleGoToCompany}
              >
                Company Location
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </CardContent>
    </Paper>
  );
};

export default JobDetailCard;
