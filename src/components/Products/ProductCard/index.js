import React from 'react';
import { CardContent, Typography, Tooltip, CardActionArea, Paper } from '@mui/material';
import { ellipsisStyle } from '~/components/UI/EllipsisStyle';

const ProductCard = ({ product, onClick }) => {
  const { name, screenSize, processor, memory, storage } = product;
  return (
    <Paper sx={{ bgcolor: 'transparent', width: '272px' }} elevation={2}>
      <CardActionArea
        sx={{ borderRadius: 1, overflow: 'hidden', background: 'white' }}
        onClick={() => onClick(product)}
      >
        <CardContent>
          <Tooltip title={name}>
            <Typography
              gutterBottom
              variant="body1"
              color="secondary.main"
              sx={{
                fontWeight: 600,
                ...ellipsisStyle,
              }}
            >
              {name}
            </Typography>
          </Tooltip>

          <Typography sx={ellipsisStyle}>{`Screen size: ${screenSize}`}</Typography>
          <Tooltip title={processor}>
            <Typography sx={ellipsisStyle}>{`CPU: ${processor}`}</Typography>
          </Tooltip>
          <Typography sx={ellipsisStyle}>{`Memory: ${memory}`}</Typography>

          <Typography sx={ellipsisStyle}>{`Storage: ${storage}`}</Typography>
        </CardContent>
      </CardActionArea>
    </Paper>
  );
};

export default ProductCard;
