import {configureStore} from '@reduxjs/toolkit';
import movieSlice from './slice/movieSlice';
export default configureStore ({
  reducer: {
    movie: movieSlice,
  },
});
