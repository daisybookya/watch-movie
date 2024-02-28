import '../css/tvStreaming.less';
import {useEffect, useState} from 'react';
import {Card, List, Modal, Tag, Skeleton, Radio, Button} from 'antd';
import {Layout} from '../components/Layout';
import {sourceTv, noDetails, openTrailer} from '../utility';
import {useSelector, useDispatch} from 'react-redux';
import {
  close,
  open,
  openInforLoading,
  closeInforLoading,
  addTvDetail,
} from '../slice/movieSlice';
import {getSourceListData, getDetails} from '../api/fetchTv';
const TVShowing = () => {
  const {Meta} = Card;
  const theTv = useSelector (state => state.movie);
  const {isOpen, tvDetail, inforLoading} = theTv;
  const dispatch = useDispatch ();
  const [loading, setLoading] = useState (false);
  const [list, setList] = useState ([]);
  const [selected, setSelected] = useState (sourceTv[0].source_id);
  const [page, setPage] = useState (1);
  useEffect (
    () => {
      getListData (selected);
    },
    [selected]
  );
  async function getListData (id) {
    setLoading (true);
    try {
      const orginData = await getSourceListData (id);
      const sortList = orginData.titles.sort ((a, b) => b.year - a.year);
      setList (sortList);
    } catch (err) {
      console.error (err);
    } finally {
      setLoading (false);
    }
  }
  async function openInfor (data) {
    dispatch (open ());
    if (data.title === tvDetail.title) return;
    dispatch (openInforLoading ());
    try {
      const infor = await getDetails (data.id);
      dispatch (addTvDetail (infor));
    } catch (e) {
      console.log (e);
      dispatch (addTvDetail (noDetails));
    } finally {
      setTimeout (function () {
        dispatch (closeInforLoading ());
      }, 300);
    }
  }
  const changeTv = e => {
    const _id = e.target.value;
    setSelected (_id);
    getListData (_id);
    setPage (1);
  };

  return (
    <Layout>
      <div className="tvshowing">
        <div className="filter-box">
          <Radio.Group
            onChange={changeTv}
            defaultValue={selected}
            value={selected}
          >
            {sourceTv.map (tv => (
              <Radio.Button key={tv.name} value={tv.source_id}>
                {tv.name}
              </Radio.Button>
            ))}

          </Radio.Group>
        </div>

        <List
          loading={loading}
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
            pageSize: 30,
          }}
          dataSource={list}
          renderItem={item => (
            <List.Item key={item.title}>
              <Meta
                className="sp-font"
                title={item.title}
                onClick={() => openInfor (item)}
              />
              <p>Year: {item.year}</p>
            </List.Item>
          )}
        />
      </div>
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
                {tvDetail.trailer
                  ? <Button onClick={() => openTrailer (tvDetail.trailer)}>
                      Film Trailer
                    </Button>
                  : ''}
              </p>
            </div>
          </div>
        </Skeleton>
      </Modal>
    </Layout>
  );
};
export default TVShowing;
