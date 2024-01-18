import React from 'react';
import { CardContent, Typography, Tooltip, CardActionArea, Paper } from '@mui/material';
import { ellipsisStyle } from '~/components/UI/EllipsisStyle';

const JobCard = ({ job, onClick }) => {
  const { title, level, suitable_rate } = job;
  return (
    <Paper sx={{ bgcolor: 'transparent', width: '272px' }} elevation={2}>
      <CardActionArea sx={{ borderRadius: 1, overflow: 'hidden', background: 'white' }} onClick={() => onClick(job)}>
        <CardContent>
          <Tooltip title={title}>
            <Typography
              gutterBottom
              variant="body1"
              color="secondary.main"
              sx={{
                fontWeight: 600,
                ...ellipsisStyle,
              }}
            >
              {title}
            </Typography>
          </Tooltip>

          <Tooltip title={level}>
            <Typography sx={ellipsisStyle}>{`Level: ${level}`}</Typography>
          </Tooltip>
          <Typography sx={ellipsisStyle}>{`Suitable rate: ${suitable_rate}`}</Typography>
        </CardContent>
      </CardActionArea>
    </Paper>
  );
};

export default JobCard;
