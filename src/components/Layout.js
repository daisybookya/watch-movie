import '../css/Layout.less';
import {useLocation} from 'react-router-dom';
import routes from '../router';
import {Typography} from 'antd';
import {useEffect} from 'react';

export function Layout (props) {
  const {Title} = Typography;
  const location = useLocation ();
  const pageTitle = () => {
    const path = location.pathname;
    const title = routes.filter (i => i.path === path);
    return title[0].name;
  };
  const backTop = () => {
    return window.scrollTo ({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect (() => {
    backTop ();
  }, []);
  return (
    <div className="layout">
      <div align="center" style={{margin: '5% 0'}}>
        <Title level={2} className="sp-font">{pageTitle ()}</Title>
      </div>
      {props.children}
      <div className="footer">ChengCheng Design ©2022 Created by Cheng</div>
    </div>
  );
}
