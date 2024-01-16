import React, { useEffect, useState } from 'react';
import * as SagaActionTypes from '~/redux/constants';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Skeleton, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { ellipsisStyle } from '~/components/UI/EllipsisStyle';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductDetailCard from '../ProductDetailCard';
import useResponsive from '~/hooks/useResponsive';
import ProductDetailSkeleton from '../ProductDetailSkeleton';
import NotFoundImg from '~/components/UI/NotFound';

const ProductModel = ({ product }) => {
  const { name, screenSize, processor, memory, storage } = product;

  const dispatch = useDispatch();
  const { listProducts } = useSelector((state) => state.productSlice);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isPhone = useResponsive('down', 'sm');

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 3,
      partialVisibilityGutter: listProducts?.length === 3 ? 0 : 40,
    },
    tablet: {
      breakpoint: { max: 1200, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  useEffect(() => {
    dispatch({
      type: SagaActionTypes.GET_PRODUCTS_SAGA,
      productName: name,
      callback: () => setLoading(false),
      fail: () => setError(true),
    });
  }, [dispatch, name]);

  return (
    <div
      style={{
        backgroundColor: '#f9fbfa',
        padding: 16,
        height: '70%',
      }}
    >
      {error ? (
        <NotFoundImg isWrong={true} />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Tooltip title={name}>
                <Typography
                  gutterBottom
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    ...ellipsisStyle,
                    paddingRight: 2,
                  }}
                >
                  {name}
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography sx={ellipsisStyle}>{`Screen size: ${screenSize}`}</Typography>
              <Tooltip title={processor}>
                <Typography sx={ellipsisStyle}>{`CPU: ${processor}`}</Typography>
              </Tooltip>
              <Typography sx={ellipsisStyle}>{`Memory: ${memory}`}</Typography>
              <Typography sx={ellipsisStyle}>{`Storage: ${storage}`}</Typography>
            </Grid>
            <Grid item xs={12} md={7} sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              {loading
                ? Array.from({ length: isPhone ? 3 : 4 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      sx={{ flex: '1', aspectRatio: '1/1', height: '100%', borderRadius: '8px' }}
                    />
                  ))
                : listProducts.slice(0, isPhone ? 3 : 4).map((item, index) => (
                    <Paper style={{ flex: '1', display: 'flex', justifyContent: 'center' }} key={index} elevation={2}>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        style={{
                          width: '100%',
                          aspectRatio: '1/1',
                          borderRadius: '10px',
                          objectFit: 'cover',
                          maxWidth: '205px',
                        }}
                      />
                    </Paper>
                  ))}
            </Grid>
            <Grid item xs={12}>
              <Carousel responsive={responsive} partialVisible={true}>
                {loading
                  ? Array.from({ length: 5 }).map((_, index) => <ProductDetailSkeleton key={index} />)
                  : listProducts.map((item, index) => (
                      <ProductDetailCard key={index} product={item}></ProductDetailCard>
                    ))}
              </Carousel>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};
export default ProductModel;
