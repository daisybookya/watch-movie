import '../css/Home.less';
import {useEffect, useState} from 'react';
import {Col, Image, Row, Result} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getShowFilms} from '../api/fetch';
import {handleData} from '../utility';
import {addDetail, addList, open, close} from '../slice/movieSlice';
const Home = () => {
  const theMovie = useSelector (state => state.movie);
  const {list} = theMovie;
  const [flowList, setFlowList] = useState ([]);
  const [isLoading, setLoading] = useState (false);
  const [isError, setError] = useState (false);
  const dispatch = useDispatch ();
  const navigate = useNavigate ();
  useEffect (
    () => {
      const fetchData = () => {
        getShowFilms ()
          .then (resp => {
            const theList = handleData (resp.films);
            // console.log (theList);
            setFlowList (theList);
            dispatch (addList (resp.films));
            setError (false);
            setTimeout (() => {
              setLoading (false);
            }, 500);
          })
          .catch (err => {
            console.error (err);
            setLoading (false);
            setError (true);
          });
      };
      if (list.length === 0) {
        setLoading (true);
        fetchData ();
      } else {
        const theList = handleData (list);
        setFlowList (theList);
      }
      dispatch (close ());
    },
    [dispatch, list]
  );
  const showDetail = data => {
    dispatch (addDetail (data));
    dispatch (open ());
    navigate ('/showing#film');
  };

  return (
    <div className="home">
      {isError
        ? <Result
            status="500"
            title="Just wrong"
            subTitle="Sorry, API something went wrong."
          />
        : ''}
      <div className={`loading-box ${isLoading ? 'active' : ''}`}>
        <span className="sp-font">Watch Movie</span>
      </div>
      <Row justify="center" align="top" gutter={[24, 24]}>
        {flowList.map ((item, i) => (
          <Col xs={12} sm={12} md={8} lg={6} xl={4} key={`item-${i}`}>
            <div className="flow-list">
              {item.map ((v, ii) => (
                <div
                  className="movie-box"
                  key={`movie-${ii}`}
                  onClick={() => showDetail (v)}
                >
                  {v.images.poster['1']
                    ? <Image
                        src={v.images.poster['1'].medium.film_image}
                        preview={false}
                        placeholder={
                          <Image
                            preview={false}
                            src={process.env.PUBLIC_URL + '/subimg.jpg'}
                          />
                        }
                      />
                    : <Image
                        src={process.env.PUBLIC_URL + '/subimg.jpg'}
                        preview={false}
                      />}

                  <span className="sp-font">
                    {v.film_name.slice (0, 20)}
                  </span>
                </div>
              ))}
            </div>
          </Col>
        ))}
      </Row>

    </div>
  );
};
export default Home;
