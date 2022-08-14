import '../css/Showing.less';
import {useEffect, useState} from 'react';
import ReactPlayer from 'react-player';
import {Typography, Button, Slider} from 'antd';
import {
  CaretRightOutlined,
  PauseOutlined,
  SoundOutlined,
} from '@ant-design/icons';
const {Title} = Typography;
export function Trailer (props) {
  const [isPlay, setPLay] = useState (false);
  const [vol, setVol] = useState (1);
  useEffect (
    () => {
      if (props.show) {
        setTimeout (() => {
          setPLay (true);
        }, 500);
      } else {
        setPLay (false);
      }
    },
    [props.show]
  );
  const setvolume = v => {
    const volume = v * 0.1;
    setVol (volume);
  };
  return (
    <div
      className={`index-movie ${props.show ? 'index-movie active' : 'index-movie'}`}
    >
      <div className="trailer-box">
        <div className="description">
          <span>Trailer-</span>
          <Title level={2} className="sp-font">
            {props.name}
          </Title>
          <Button type="primary" className="close-btn" onClick={props.close}>
            close X
          </Button>
        </div>
        <div>
          <ReactPlayer url={props.url} playing={isPlay} volume={vol} />
          <div className="control-list">
            <Button type="primary" onClick={() => setPLay (true)}>
              Play<CaretRightOutlined />
            </Button>
            <Button type="primary" onClick={() => setPLay (false)}>
              Pause<PauseOutlined />
            </Button>
            <div className="vol-control">
              <span><SoundOutlined /></span>
              <Slider
                defaultValue={vol}
                min={0}
                max={10}
                style={{width: '100px'}}
                onChange={setvolume}
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
