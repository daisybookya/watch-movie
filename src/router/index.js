import Home from '../pages/Home';
import Showing from '../pages/Showing';
import Coming from '../pages/ComingSoon';
import TVComing from '../pages/TVComing';
import TVShowing from '../pages/TVShowing';
import About from '../pages/About';
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
    path: '/TVComing',
    component: <TVComing />,
    name: 'TV Series Coming',
  },
  {
    path: '/TVShowing',
    component: <TVShowing />,
    name: 'TV Series Now Showing',
  },
  {
    path: '/about',
    component: <About />,
    name: 'About',
  },
];
export default routes;
