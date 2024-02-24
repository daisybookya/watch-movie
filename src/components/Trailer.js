import '../css/Showing.less';
import {useEffect, useState} from 'react';
import ReactPlayer from 'react-player';
import {Typography, Button, Slider} from 'antd';
import {
  CaretRightOutlined,
  PauseOutlined,
  SoundOutlined,
  ReloadOutlined,
  MutedOutlined,
} from '@ant-design/icons';
const {Title} = Typography;
export function Trailer (props) {
  const [isPlay, setPLay] = useState (false);
  const [isEnd, setEnd] = useState (false);
  const [vol, setVol] = useState ({num: 0.1, muted: false});
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
  const handleReplay = () => {
    setEnd (false);
    setPLay (true);
  };
  const setvolume = v => {
    const volume = v * 0.1;
    setVol ({num: volume, muted: false});
  };
  const handleMuted = () => {
    const newSetting = Object.assign ({}, {num: 0, muted: true});
    setVol (newSetting);
  };
  const setEndUp = () => {
    setEnd (true);
    setPLay (false);
  };
  const volFormatter = v => {
    return +(v / 0.1);
  };
  return (
    <div className={`${props.show ? 'index-movie active' : 'index-movie'}`}>
      <div className="trailer-box">
        <div className="description">
          <span>-Trailer</span>
          <Title level={2} className="sp-font">
            {props.name}
          </Title>
          <Button type="primary" className="close-btn" onClick={props.close}>
            X
          </Button>
        </div>
        <div className="player-wrapper">
          <ReactPlayer
            onEnded={setEndUp}
            url={props.url}
            playing={isPlay}
            volume={vol.num}
            width={'100%'}
            height={'100%'}
          />
          <div className="control-list">
            {isEnd
              ? <Button type="primary" onClick={() => handleReplay ()}>
                  Replay<ReloadOutlined />
                </Button>
              : <div>
                  {isPlay
                    ? <Button type="primary" onClick={() => setPLay (false)}>
                        Pause<PauseOutlined />
                      </Button>
                    : <Button type="primary" onClick={() => setPLay (true)}>
                        Play<CaretRightOutlined />
                      </Button>}
                </div>}
            <div className="vol-control">
              <span className="muted" onClick={() => handleMuted ()}>
                {vol.muted ? <MutedOutlined /> : <SoundOutlined />}
              </span>
              <Slider
                defaultValue={volFormatter (vol.num)}
                value={volFormatter (vol.num)}
                muted={vol.muted}
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
