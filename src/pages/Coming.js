import '../css/Showing.less';
import {useEffect, useState} from 'react';
import {
  Carousel,
  Col,
  Row,
  Image,
  Spin,
  List,
  Divider,
  BackTop,
  Button,
} from 'antd';
import {Layout} from '../components/Layout';
import {IndexMovie} from '../components/IndexMovie';
import {Trailer} from '../components/Trailer';
import {handleData} from '../utility';
import {useSelector, useDispatch} from 'react-redux';
import {addDetail, close, open} from '../slice/movieSlice';
import {getComingFilms} from '../api/fetch';
const Coming = () => {
  const [loading, setLoading] = useState (false);
  const [slideList, setSlideList] = useState ([]);
  const [filmList, setFilmList] = useState ([]);
  const [openFilm, setFilmOpen] = useState (false);
  const theMovie = useSelector (state => state.movie);
  const {isOpen, detail} = theMovie;
  const dispatch = useDispatch ();
  useEffect (
    () => {
      dispatch (close ());
      setLoading (true);
      try {
        getComingFilms ().then (resp => {
          const newData = handleData (resp.films, 5, 3);
          setSlideList (newData);
          setFilmList (resp.films);
        });
      } catch (err) {
        console.error (err);
      }
      setLoading (false);
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
        <p>{detail.synopsis_long ? detail.synopsis_long : ''}</p>
      </IndexMovie>
      <Trailer
        show={openFilm}
        url={detail.film_trailer}
        close={closeTrailer}
        name={detail.film_name ? detail.film_name : ''}
      />
      <div className="coming">
        <Spin tip="Loading..." spinning={loading}>
          <Carousel>
            {slideList.map ((item, i) => (
              <div key={i}>
                <Row>
                  {item.map (v => (
                    <Col
                      xs={12}
                      sm={12}
                      md={8}
                      className="coming-box"
                      key={v.film_id}
                    >
                      {v.images.poster['1']
                        ? <Image
                            onClick={() => getTrailer (v)}
                            src={v.images.poster['1'].medium.film_image}
                            preview={false}
                            placeholder={process.env.PUBLIC_URL + '/subimg.jpg'}
                          />
                        : <Image
                            onClick={() => getTrailer (v)}
                            src={process.env.PUBLIC_URL + '/subimg.jpg'}
                            preview={false}
                          />}
                      <span className="sp-font">{v.film_name}</span>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </Carousel>
        </Spin>
        <Divider style={{borderColor: '#fff'}}>Movie List</Divider>
        <List
          className="coming-list"
          loading={loading}
          pagination={{
            pageSize: 5,
          }}
          itemLayout="vertical"
          dataSource={filmList}
          renderItem={item => (
            <List.Item
              actions={[
                <Button onClick={() => getInfor (item)}>See Synopsis</Button>,
                <Button onClick={() => getTrailer (item)}>Film Trailer</Button>,
              ]}
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
              <div>{item.synopsis_long.slice (0, 150)}...</div>
            </List.Item>
          )}
        />
      </div>
      <BackTop />
    </Layout>
  );
};
export default Coming;
