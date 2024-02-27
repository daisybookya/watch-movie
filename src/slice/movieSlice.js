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
    inforLoading: true,
    tvDetail: {
      title: 'No data',
      plot_overview: 'No data.',
      genre_names: [],
      network_names: [],
    },
    list: [],
    tvList: [],
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
    openInforLoading: state => {
      state.inforLoading = true;
    },
    closeInforLoading: state => {
      state.inforLoading = false;
    },
    addList: (state, action) => {
      state.list = action.payload;
    },
    addTvList: (state, action) => {
      state.tvList = action.payload;
    },
    addDetail: (state, action) => {
      state.detail = action.payload;
    },
    addTvDetail: (state, action) => {
      state.tvDetail = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  open,
  close,
  openMenu,
  closeMenu,
  openInforLoading,
  closeInforLoading,
  addList,
  addTvList,
  addDetail,
  addTvDetail,
} = movieSlice.actions;

export default movieSlice.reducer;
