import '../css/FilmTimes.less';
import {
  Card,
  Button,
  Skeleton,
  Alert,
  Tabs,
  Typography,
  message,
  Cascader,
} from 'antd';
import {Layout} from '../components/Layout';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState, useCallback} from 'react';
import {getShowFilms, getFilmTimes} from '../api/fetch';
import {addList} from '../slice/movieSlice';

const FilmTimes = () => {
  const [loading, setLoading] = useState (false);
  const [timeOpen, setTimeOpen] = useState (false);
  const [error, setError] = useState (false);
  const [filmInfor, setFilmInfor] = useState ({
    film: {images: {poster: {}}},
    cinemas: [],
  });
  const [filmType, setFilmType] = useState ('Standard'); // Standard,IMAX,3D
  const [inforOpen, setInforOpen] = useState (false);
  const [select, setSelect] = useState ([]);
  const [selectedDate, setDate] = useState ('');
  const theMovie = useSelector (state => state.movie);
  const {list} = theMovie;
  const dispatch = useDispatch ();
  const date = new Date ().toISOString ().slice (0, 10);
  const {TabPane} = Tabs;
  const {Title} = Typography;

  const handleSelect = useCallback (
    () => {
      let result = [];
      const dates = Array.from ({length: 5}, (x, i) => {
        const _date = new Date ().getDate ();

        const dateValue = `${date.slice (0, -2)}${_date + i}`;
        return {value: dateValue, label: dateValue};
      });

      if (list.length > 0) {
        list.forEach (item => {
          result.push ({
            value: item.film_id,
            label: item.film_name,
            children: dates,
          });
        });
      }
      return result;
    },
    [list, date]
  );
  useEffect (
    () => {
      if (list.length === 0) {
        setLoading (true);
        try {
          getShowFilms ().then (resp => {
            dispatch (addList (resp.films));
          });
        } catch (err) {
          console.error (err);
          setError (true);
        }
        setLoading (false);
      }
      const data = handleSelect ();
      setSelect (data);
    },
    [dispatch, list.length, handleSelect]
  );
  const getInforTimes = (filmId, date) => {
    const id = filmId;
    getFilmTimes ({id, date})
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
            {error
              ? <Alert
                  message="Error"
                  description="Fetching API data is error."
                  type="error"
                  showIcon
                />
              : <Cascader
                  style={{width: '50%'}}
                  options={select}
                  onChange={onSelectChange}
                  placeholder="Please select Movie"
                />}
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
