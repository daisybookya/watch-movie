import Home from '../pages/Home';
import Showing from '../pages/Showing';
import Coming from '../pages/Coming';
import About from '../pages/About';
import FilmTimes from '../pages/FilmTimes';
const routes = [
  {
    path: '/',
    component: <Home />,
    name: 'Home',
  },
  {
    path: '/showing',
    component: <Showing />,
    name: 'Now Showing',
  },
  {
    path: '/coming',
    component: <Coming />,
    name: 'Coming Soon Movie',
  },
  {
    path: '/filmTimes',
    component: <FilmTimes />,
    name: 'Film Show Times',
  },
  {
    path: '/about',
    component: <About />,
    name: 'About',
  },
];
export default routes;
