import './css/App.less';
import {Routes, Route, useNavigate} from 'react-router-dom';
import routes from './router';
import Header from './components/Header';
import {useSelector, useDispatch} from 'react-redux';
import {openMenu, closeMenu} from './slice/movieSlice';
import {AlignLeftOutlined, CloseOutlined} from '@ant-design/icons';

const App = () => {
  const menuOpen = useSelector (state => state.movie.menuOpen);
  const dispatch = useDispatch ();
  const setMenu = () => {
    if (menuOpen) {
      dispatch (closeMenu ());
    } else {
      dispatch (openMenu ());
    }
  };
  const navigate = useNavigate ();
  const goHome = () => {
    dispatch (closeMenu ());
    navigate ('/');
  };
  return (
    <div className="App">
      <div className="menu-btn" onClick={setMenu}>
        {menuOpen ? <CloseOutlined /> : <AlignLeftOutlined />}
      </div>
      <div className="logo" onClick={() => goHome ()}>
        <span className="sp-font">Watch Movie</span>
      </div>
      <Header />
      <Routes>
        {routes.map ((r, i) => (
          <Route element={r.component} key={i} path={r.path} />
        ))}
      </Routes>
    </div>
  );
};

export default App;
