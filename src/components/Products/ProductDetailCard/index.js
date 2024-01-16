import React from 'react';
import { CardContent, Typography, Paper, Divider, Button, CardActions, Grid, Rating, Stack } from '@mui/material';
import { ellipsisStyle } from '~/components/UI/EllipsisStyle';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { printNumberWithCommas } from '~/utils/printNumerWithCommas';
import { useNavigate } from 'react-router-dom';

const ProductDetailCard = ({ product }) => {
  const navigate = useNavigate();

  const handleGoToShop = () => {
    navigate('/store', { state: { storeName: product?.source } });
  };

  const productCondition = (condition) => {
    if (!condition) {
      return <span style={{ color: 'orange', fontWeight: 'bold', textTransform: 'uppercase' }}> used</span>;
    } else {
      return <span style={{ color: 'green', fontWeight: 'bold', textTransform: 'uppercase' }}> new</span>;
    }
  };

  return (
    <Paper sx={{ bgcolor: 'white', flex: '1', margin: '0 10px' }} elevation={2}>
      <CardContent>
        <Typography
          gutterBottom
          variant="body1"
          color="secondary.main"
          sx={{
            fontWeight: 600,
            textAlign: 'center',
            ...ellipsisStyle,
          }}
        >
          {`${printNumberWithCommas(product.price)} VNĐ`}
        </Typography>
        <Divider variant="middle" sx={{ marginBottom: '8px' }} />
        <Typography sx={ellipsisStyle}>{`Store: ${product.source}`}</Typography>
        <Typography sx={ellipsisStyle}>Condition: {productCondition(product.isNew)}</Typography>

        <Stack direction="row" spacing={1}>
          <Rating name="half-rating-read" defaultValue={product.rating} precision={0.5} readOnly />
          <Typography>{`(${product.rating})`}</Typography>
        </Stack>
        <Typography sx={ellipsisStyle}>{`Review: ${product.reviews}`}</Typography>
        <CardActions>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                sx={{ width: '100%' }}
                component="a"
                href={product.link === '#' ? product.product_link : product.link}
                target="_blank"
              >
                Buy Now
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" sx={{ width: '100%' }} startIcon={<FmdGoodIcon />} onClick={handleGoToShop}>
                Go to shop
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </CardContent>
    </Paper>
  );
};

export default ProductDetailCard;
