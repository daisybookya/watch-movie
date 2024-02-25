import '../css/Layout.less';
import {useLocation} from 'react-router-dom';
import {getPageTitle} from '../utility';
import {Typography} from 'antd';
import {useEffect} from 'react';

export function Layout (props) {
  const {Title} = Typography;
  const location = useLocation ();

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
        <Title level={2} className="sp-font">
          {getPageTitle (location.pathname)}
        </Title>
      </div>
      {props.children}
      <div className="footer">ChengCheng Design ©2024 Created by Cheng</div>
    </div>
  );
}
