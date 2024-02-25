import '../css/Showing.less';
import '../css/Coming.less';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Carousel, Image, Skeleton, List, Typography, Button} from 'antd';
import {IndexMovie} from '../components/IndexMovie';
import {Trailer} from '../components/Trailer';
import {handleData, getPageTitle} from '../utility';
import {useSelector, useDispatch} from 'react-redux';
import {addDetail, close, open} from '../slice/movieSlice';
import {getComingFilms} from '../api/fetch';
const Coming = () => {
  const {Title} = Typography;
  const [loading, setLoading] = useState (false);
  const [slideList, setSlideList] = useState ([]);
  const [filmList, setFilmList] = useState ([]);
  const [openFilm, setFilmOpen] = useState (false);
  const theMovie = useSelector (state => state.movie);
  const location = useLocation ();
  const {isOpen, detail} = theMovie;
  const dispatch = useDispatch ();
  useEffect (
    () => {
      dispatch (close ());
      setLoading (true);
      try {
        getComingFilms ().then (resp => {
          const newData = handleData (resp.films, 3, 3);
          setSlideList (newData);
          setFilmList (resp.films);
        });
      } catch (err) {
        console.error (err);
      }
      setTimeout (() => {
        setLoading (false);
      }, 600);
    },
    [dispatch]
  );
  const closeDetail = () => {
    dispatch (close ());
  };
  const getInfor = item => {
    dispatch (addDetail (item));
    setFilmOpen (false);
    dispatch (open ());
  };
  const getTrailer = item => {
    dispatch (addDetail (item));
    dispatch (close ());
    setFilmOpen (true);
  };
  const closeTrailer = () => {
    setFilmOpen (false);
  };
  const hasTrailer = item => {
    if (item.film_trailer) {
      return (
        <Button onClick={() => getTrailer (item)}>
          Film Trailer
        </Button>
      );
    }
    return false;
  };
  const hasSynopsis = item => {
    if (item.synopsis_long) {
      return (
        <Button onClick={() => getInfor (item)}>
          Synopsis
        </Button>
      );
    }
    return false;
  };
  return (
    <div className="coming-soon-layout">
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
        <p>{detail.synopsis_long ? detail.synopsis_long : ''}</p>
      </IndexMovie>
      <Trailer
        show={openFilm}
        url={detail.film_trailer}
        close={closeTrailer}
        name={detail.film_name ? detail.film_name : ''}
      />

      <div className="coming">
        <div className="poster">
          <Carousel dotPosition={'left'} autoplay>
            {slideList.map ((item, key) => (
              <div className="slide-boxs" key={key}>
                {item.map (movie => (
                  <div key={movie.film_id}>
                    <div className="slide-movie">
                      {movie.images.poster['1']
                        ? <Image
                            height={'33vh'}
                            onClick={() => getTrailer (movie)}
                            src={movie.images.poster['1'].medium.film_image}
                            preview={false}
                            placeholder={
                              <Image
                                preview={false}
                                src={process.env.PUBLIC_URL + '/subimg.jpg'}
                              />
                            }
                          />
                        : <Image
                            onClick={() => getTrailer (movie)}
                            src={process.env.PUBLIC_URL + '/subimg.jpg'}
                            preview={false}
                          />}
                    </div>
                  </div>
                ))}
              </div>
            ))}

          </Carousel>
        </div>
        <div className="movie-list">
          <div align="center" className="title-box">
            <Title level={2} className="sp-font">
              {getPageTitle (location.pathname)}
            </Title>
          </div>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => {
                window.scrollTo ({
                  top: 0,
                  behavior: 'smooth',
                });
              },
              pageSize: 5,
            }}
            dataSource={filmList}
            renderItem={item => (
              <Skeleton loading={loading} active avatar>
                <List.Item
                  key={item.title}
                  extra={
                    <img
                      width={150}
                      alt="poster"
                      src={item.images.poster['1'].medium.film_image}
                    />
                  }
                >
                  <List.Item.Meta
                    title={`${item.film_name}`}
                    description={`Release:${item.release_dates[0].release_date}`}
                  />
                  <div>
                    {item.synopsis_long === ''
                      ? `No Synopsis`
                      : `${item.synopsis_long.slice (0, 150)}...`}
                  </div>
                  <div className="movie-btns">
                    {hasSynopsis (item)}{hasTrailer (item)}
                  </div>
                </List.Item>
              </Skeleton>
            )}
          />

        </div>
      </div>
    </div>
  );
};
export default Coming;
