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
    <div className="layout" style={props.style}>
      <div align="center" className="title-box">
        <Title level={2} className="sp-font">{pageTitle ()}</Title>
      </div>
      {props.children}
      <div className="footer">ChengCheng Design ©2024 Created by Cheng</div>
    </div>
  );
}
