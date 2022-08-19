import '../css/Showing.less';
import {useEffect, useState} from 'react';
import {Trailer} from '../components/Trailer';
import {Card, List, Button} from 'antd';
import {Layout} from '../components/Layout';
import {IndexMovie} from '../components/IndexMovie';
import {useSelector, useDispatch} from 'react-redux';
import {addDetail, addList, close, open} from '../slice/movieSlice';
import {getShowFilms} from '../api/fetch';
import {useLocation} from 'react-router-dom';
const Showing = () => {
  const {Meta} = Card;
  const [loading, setLoading] = useState (false);
  const [openTrailer, setTrailerBox] = useState (false);
  const theMovie = useSelector (state => state.movie);
  const {isOpen, detail, list} = theMovie;
  const dispatch = useDispatch ();
  const location = useLocation ();

  useEffect (
    () => {
      if (location.hash === '') {
        dispatch (close ());
      }
      if (list.length === 0) {
        setLoading (true);
        try {
          getShowFilms ().then (resp => {
            dispatch (addList (resp.films));
          });
        } catch (err) {
          console.error (err);
        }
        setLoading (false);
      }
    },
    [dispatch, list.length, location.hash]
  );

  const closeDetail = () => {
    dispatch (close ());
  };
  const getInfor = item => {
    dispatch (addDetail (item));
    dispatch (open ());
    setTrailerBox (false);
  };
  const getTrailer = () => {
    dispatch (close ());
    setTrailerBox (true);
  };
  const closeTrailer = () => {
    setTrailerBox (false);
  };
  return (
    <Layout>
      <IndexMovie
        show={isOpen}
        close={closeDetail}
        name={detail.film_name ? detail.film_name : ''}
        date={detail.release_dates ? detail.release_dates[0].release_date : ''}
        img={
          detail.images.poster['1']
            ? detail.images.poster['1'].medium.film_image
            : ''
        }
      >
        {detail.film_trailer
          ? <Button onClick={() => getTrailer ()}>Film Trailer</Button>
          : ''}
        <p style={{marginTop: '10px'}}>
          {detail.synopsis_long ? detail.synopsis_long : ''}
        </p>
      </IndexMovie>
      <Trailer
        show={openTrailer}
        url={detail.film_trailer}
        close={closeTrailer}
        name={detail.film_name ? detail.film_name : ''}
      />
      <List
        loading={loading}
        grid={{
          gutter: 24,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 5,
          xxl: 6,
        }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card
              onClick={() => getInfor (item)}
              bordered={false}
              hoverable
              cover={
                item.images.poster['1']
                  ? <img
                      alt={item.film_name}
                      src={item.images.poster['1'].medium.film_image}
                    />
                  : <img
                      src={process.env.PUBLIC_URL + '/subimg.jpg'}
                      alt={item.film_name}
                    />
              }
            >
              <Meta className="sp-font" title={item.film_name} />
            </Card>
          </List.Item>
        )}
      />
    </Layout>
  );
};
export default Showing;
