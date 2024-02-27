import '../css/tvStreaming.less';
import {useEffect, useState} from 'react';
import {Card, List, Select, Image, Modal, Tag, Skeleton} from 'antd';
import {Layout} from '../components/Layout';
import {useSelector, useDispatch} from 'react-redux';
import {
  addList,
  close,
  open,
  openInforLoading,
  closeInforLoading,
  addTvList,
  addTvDetail,
} from '../slice/movieSlice';
import {getReleaseData, getDetails} from '../api/fetchTv';
const TVComing = () => {
  const {Meta} = Card;
  const theTv = useSelector (state => state.movie);
  const {isOpen, tvDetail, list, tvList, inforLoading} = theTv;
  const dispatch = useDispatch ();
  const [loading, setLoading] = useState (true);
  const [selected, setSelected] = useState ('All TV');
  const [page, setPage] = useState (1);
  useEffect (() => {
    try {
      getReleaseData ().then (resp => {
        const filteredData = filterList (resp.releases);
        const filterTvOpts = handleSource (resp.releases);
        dispatch (addTvList (filterTvOpts));
        dispatch (addList (filteredData));
      });
    } catch (err) {
      console.error (err);
    } finally {
      setLoading (false);
    }
  }, []);
  const handleTvOpts = data => {
    if (!data.length) return [];
    return data.map (item => ({value: item, label: item}));
  };
  function handleSource (data) {
    const _tvList = new Set ([]);
    data.forEach (item => {
      _tvList.add (item.source_name);
    });
    let sortTv = Array.from (_tvList).sort ();
    sortTv.splice (0, 0, 'All TV');
    return sortTv;
  }
  function filterList (data) {
    if (data.length) {
      return data.filter (item => item.type.includes ('tv'));
    }
    return data;
  }
  function filterTheTV (data) {
    if (selected === 'All TV') return data;
    return data.filter (item => item.source_name === selected);
  }
  function changeTV (val) {
    setSelected (val);
    setPage (1);
  }
  async function openInfor (data) {
    dispatch (open ());
    dispatch (openInforLoading ());
    try {
      const infor = await getDetails (data.id);
      dispatch (addTvDetail (infor));
    } catch (e) {
      console.log (e);
      dispatch (
        addTvDetail ({
          title: 'Oops!',
          plot_overview: 'information is error.',
          genre_names: [],
          network_names: [],
        })
      );
    } finally {
      setTimeout (function () {
        dispatch (closeInforLoading ());
      }, 300);
    }
  }
  return (
    <Layout>
      <div className="filter-box">
        <Select
          defaultValue={selected}
          value={selected}
          style={{
            width: 120,
          }}
          onChange={val => changeTV (val)}
          options={handleTvOpts (tvList)}
        />
      </div>

      <List
        loading={loading}
        grid={{
          gutter: 36,
          xs: 2,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 6,
        }}
        pagination={{
          current: page,
          onChange: page => {
            setPage (page);
            window.scrollTo ({
              top: 0,
              behavior: 'smooth',
            });
          },
          showSizeChanger: false,
          pageSize: 20,
        }}
        dataSource={filterTheTV (list)}
        renderItem={item => (
          <List.Item>
            <Card
              hoverable
              onClick={() => openInfor (item)}
              cover={
                item.poster_url.length
                  ? <Image
                      src={item.poster_url}
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
                    />
              }
            >
              <Meta className="sp-font" title={item.title} />
              <p>Release Date: {item.source_release_date}</p>
              <span>Source: {item.source_name}</span>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title="TV Series Details"
        cancelText={'close'}
        onCancel={() => dispatch (close ())}
        visible={isOpen}
      >
        <Skeleton active loading={inforLoading}>
          <div className="modal-flex">
            {tvDetail.poster
              ? <div className="poster">
                  <img alt={tvDetail.title} src={tvDetail.poster} />
                </div>
              : ''}

            <div className="content">
              <p className="sp-font title">
                {tvDetail.title ? tvDetail.title : ''}
              </p>
              <p>
                Genre-
                <br />
                {tvDetail.genre_names
                  ? tvDetail.genre_names.map (item => (
                      <Tag key={item}>{item}</Tag>
                    ))
                  : 'No Genre'}
              </p>
              <p>
                Overview-
                <br />
                {tvDetail.plot_overview ? tvDetail.plot_overview : ''}
              </p>
              <p>
                Streaming Platforms-
                <br />
                {tvDetail.network_names
                  ? tvDetail.network_names.map (tv => (
                      <Tag key={tv} color="#f8df8b" bordered="false">{tv}</Tag>
                    ))
                  : 'No Platforms'}
              </p>
            </div>
          </div>
        </Skeleton>
      </Modal>
    </Layout>
  );
};
export default TVComing;
