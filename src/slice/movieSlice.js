import {createSlice} from '@reduxjs/toolkit';

export const movieSlice = createSlice ({
  name: 'movie',
  initialState: {
    isOpen: false,
    detail: {
      film_name: '',
      images: {
        poster: {
          '1': {
            medium: {},
          },
        },
      },
      release_dates: [{release_date: ''}],
      synopsis_long: '',
    },
    list: [],
    menuOpen: false,
  },
  reducers: {
    open: state => {
      state.isOpen = true;
    },
    close: state => {
      state.isOpen = false;
    },
    openMenu: state => {
      state.menuOpen = true;
    },
    closeMenu: state => {
      state.menuOpen = false;
    },
    addList: (state, action) => {
      state.list = action.payload;
    },
    addDetail: (state, action) => {
      state.detail = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  open,
  close,
  openMenu,
  closeMenu,
  addList,
  addDetail,
} = movieSlice.actions;

export default movieSlice.reducer;
