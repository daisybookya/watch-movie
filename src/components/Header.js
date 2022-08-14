import '../css/Header.less';
import routes from '../router';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {closeMenu} from '../slice/movieSlice';

function Header () {
  const menuOpen = useSelector (state => state.movie.menuOpen);
  const dispatch = useDispatch ();
  const menu = routes.map (v => {
    return {path: v.path, label: v.name};
  });
  const goTarget = () => {
    dispatch (closeMenu ());
  };
  return (
    <div className={menuOpen ? 'header active' : 'header'}>
      <nav>
        {menu.map ((m, i) => (
          <Link
            onClick={() => goTarget ()}
            className="sp-font"
            to={m.path}
            key={i}
          >
            - {m.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
export default Header;
