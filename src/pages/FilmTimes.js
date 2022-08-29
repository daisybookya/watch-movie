import '../css/FilmTimes.less';
import {
  Card,
  Button,
  Skeleton,
  Tabs,
  Typography,
  message,
  Cascader,
} from 'antd';
import {Layout} from '../components/Layout';
import {useDispatch} from 'react-redux';
import {useEffect, useState, useCallback} from 'react';
import {getOldMovieList, getFakeFilmTimes} from '../api/fetch';
import {isValidDate, getDate} from '../utility';
const FilmTimes = () => {
  const [loading, setLoading] = useState (false);
  const [timeOpen, setTimeOpen] = useState (false);
  const [filmInfor, setFilmInfor] = useState ({
    film: {images: {poster: {}}},
    cinemas: [],
  });
  const [filmType, setFilmType] = useState ('Standard'); // Standard,IMAX,3D
  const [inforOpen, setInforOpen] = useState (false);
  const [select, setSelect] = useState ([]);
  const [selectedDate, setDate] = useState ('');
  const dispatch = useDispatch ();
  const {TabPane} = Tabs;
  const {Title} = Typography;

  const handleSelect = useCallback (() => {
    let result = [];
    const year = getDate ('y');
    let month = getDate ('m');
    let day = getDate ('d');
    let d = 0;
    //isValidDate
    const dates = Array.from ({length: 4}, (x, i) => {
      let days = `${day + d}`.length === 1 ? `0${day + d}` : `${day + d}`;
      let dateValue = `${year}-0${month}-${days}`;
      if (isValidDate (dateValue)) {
        d++;
      } else {
        d = 1;
        day = 0;
        month += 1;
        dateValue = `${year}-0${month}-0${d}`;
        d++;
      }
      return {value: dateValue, label: dateValue};
    });
    const list = getOldMovieList ();
    list.forEach (item => {
      result.push ({
        value: item.film_id,
        label: item.film_name,
        children: dates,
      });
    });
    return result;
  }, []);
  useEffect (
    () => {
      setLoading (true);
      const data = handleSelect ();
      setSelect (data);
      setLoading (false);
    },
    [dispatch, handleSelect]
  );
  const getInforTimes = (filmId, date) => {
    const id = filmId;
    getFakeFilmTimes ({id, date})
      .then (resp => {
        const {film, cinemas} = resp;
        const types = Object.keys (cinemas[0].showings);
        setFilmType (types[0]);
        setFilmInfor ({film, cinemas});
        setTimeOpen (false);
      })
      .catch (err => {
        console.error (err);
        message.error ('Fetching Movie times data is error.');
        setTimeOpen (false);
        setInforOpen (false);
      });
  };
  const onSelectChange = v => {
    const _id = v[0];
    const _date = v[1];
    if (!inforOpen) {
      setInforOpen (true);
    }
    setTimeOpen (true);
    getInforTimes (_id, _date);
    setDate (_date);
  };

  return (
    <Layout>
      <div className="film-times">
        <Skeleton active loading={loading}>
          <Card title="Now Showing Movie List" bordered={false}>
            Select Movie Name and Date /
            <Cascader
              style={{width: '50%'}}
              options={select}
              onChange={onSelectChange}
              placeholder="Please select Movie"
            />
          </Card>
        </Skeleton>
        {inforOpen
          ? <Skeleton active loading={timeOpen}>
              <div className="times-box">
                <Card style={{width: 240}}>
                  {filmInfor.film.images.poster['1']
                    ? <img
                        alt={filmInfor.film.film_name}
                        src={
                          filmInfor.film.images.poster['1'].medium.film_image
                        }
                      />
                    : <img
                        src={process.env.PUBLIC_URL + '/subimg.jpg'}
                        alt={filmInfor.film.film_name}
                      />}

                </Card>
                <Tabs defaultActiveKey="0">
                  {filmInfor.cinemas.map ((item, i) => (
                    <TabPane tab={item.cinema_name} key={i}>
                      <Title level={3} className="sp-font">
                        {filmInfor.film.film_name}
                      </Title>
                      <Title level={5}>Date:{selectedDate}</Title>
                      <p>
                        {item.showings[filmType].times.map ((t, i) => (
                          <Button key={i}>{t.start_time}</Button>
                        ))}
                      </p>
                    </TabPane>
                  ))}
                </Tabs>
              </div>
            </Skeleton>
          : ''}
      </div>
    </Layout>
  );
};
export default FilmTimes;
