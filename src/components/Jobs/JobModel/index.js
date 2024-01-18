import React, { useEffect, useState } from 'react';
import * as SagaActionTypes from '~/redux/constants';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Skeleton, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { ellipsisStyle } from '~/components/UI/EllipsisStyle';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import JobDetailCard from '../JobDetailCard';
import useResponsive from '~/hooks/useResponsive';
import JobDetailSkeleton from '../JobDetailSkeleton';
import NotFoundImg from '~/components/UI/NotFound';

const JobModel = ({ job }) => {
  const { title, level, suitable_rate } = job;

  const dispatch = useDispatch();
  const { listJobs } = useSelector((state) => state.jobSlice);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isPhone = useResponsive('down', 'sm');

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 3,
      partialVisibilityGutter: listJobs?.length === 3 ? 0 : 40,
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
      type: SagaActionTypes.GET_JOBS_SAGA,
      job: job,
      callback: () => setLoading(false),
      fail: () => setError(true),
    });
  }, [dispatch, title]);

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
              <Tooltip title={title}>
                <Typography
                  gutterBottom
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    ...ellipsisStyle,
                    paddingRight: 2,
                  }}
                >
                  {title}
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={5}>
              <Tooltip title={level}>
                <Typography sx={ellipsisStyle}>{`Level: ${level}`}</Typography>
              </Tooltip>
              <Typography sx={ellipsisStyle}>{`Suitable rate: ${suitable_rate}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Carousel responsive={responsive} partialVisible={true}>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => <JobDetailSkeleton key={index} />)
                ) : listJobs?.length > 0 ? (
                  listJobs.map((item, index) => <JobDetailCard key={index} job={item}></JobDetailCard>)
                ) : (
                  <div>No Job Available</div>
                )}
              </Carousel>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};
export default JobModel;
