import React from 'react';
import { CardContent, Paper, Divider, CardActions, Grid, Skeleton } from '@mui/material';

const JobDetailSkeleton = () => {
  return (
    <Paper sx={{ bgcolor: 'white', flex: '1', margin: '0 10px' }} elevation={2}>
      <CardContent>
        <Skeleton
          variant="text"
          animation="wave"
          width="80%"
          sx={{ margin: 'auto', marginBottom: '10px', fontSize: '1rem' }}
        />
        <Divider variant="middle" sx={{ marginBottom: '8px' }} />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <CardActions>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={36} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={36} />
            </Grid>
          </Grid>
        </CardActions>
      </CardContent>
    </Paper>
  );
};

export default JobDetailSkeleton;
