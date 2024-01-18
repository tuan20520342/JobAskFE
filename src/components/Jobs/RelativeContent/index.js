import React from 'react';
import { CardContent, Typography, CardActionArea, Paper } from '@mui/material';

const RelativeContent = ({ topic, onClick }) => {
  return (
    <Paper sx={{ bgcolor: 'transparent', width: 'fit-content' }} elevation={2}>
      <CardActionArea sx={{ borderRadius: 1, overflow: 'hidden', background: 'white' }} onClick={() => onClick(topic)}>
        <CardContent>
          <Typography>{topic}</Typography>
        </CardContent>
      </CardActionArea>
    </Paper>
  );
};

export default RelativeContent;
