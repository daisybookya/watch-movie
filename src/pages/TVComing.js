import '../css/tvStreaming.less';
import {useEffect, useState} from 'react';
import {Card, List, Select, Image, Modal, Tag} from 'antd';
import {Layout} from '../components/Layout';
import {getReleaseData, getDetails} from '../api/fetchTv';
const TVComing = () => {
  const {Meta} = Card;
  const [switchBtn, setSwitch] = useState ({
    loading: true,
    open: false,
  });
  const [details, setDetail] = useState ({
    title: 'No data',
    plot_overview: 'No data.',
    genre_names: [],
    network_names: [],
  });
  const [list, setList] = useState ([]);
  const [tvList, setTvList] = useState ([]);
  const [selected, setSelected] = useState ('All TV');
  const [page, setPage] = useState (1);

  useEffect (() => {
    try {
      getReleaseData ().then (resp => {
        const filteredData = filterList (resp.releases);
        const filterTvOpts = handleSource (resp.releases);
        setTvList (filterTvOpts);
        setList (filteredData);
      });
    } catch (err) {
      console.error (err);
    } finally {
      handleSwitch ('loading', false);
    }
  }, []);
  const handleTvOpts = data => {
    if (!data.length) return [];
    return data.map (item => ({value: item, label: item}));
  };
  function handleSwitch (item, state) {
    const newState = Object.assign ({}, switchBtn, {[item]: state});
    setSwitch (newState);
  }
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
    handleSwitch ('open', true);
    try {
      const infor = await getDetails (data.id);
      setDetail (infor);
    } catch (e) {
      console.log (e);
      setDetail ({
        title: 'Oops!',
        plot_overview: 'information is error.',
        genre_names: [],
        network_names: [],
      });
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
        loading={switchBtn.loading}
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
        onCancel={() => handleSwitch ('open', false)}
        visible={switchBtn.open}
      >
        <div className="modal-flex">
          {details.poster
            ? <div className="poster">
                <img alt={details.title} src={details.poster} />
              </div>
            : ''}

          <div className="content">
            <p className="sp-font title">
              {details.title ? details.title : ''}
            </p>
            <p>
              Genre-
              <br />
              {details.genre_names
                ? details.genre_names.map (item => <Tag key={item}>{item}</Tag>)
                : 'No Genre'}
            </p>
            <p>
              Overview-
              <br />
              {details.plot_overview ? details.plot_overview : ''}
            </p>
            <p>
              Streaming Platforms-
              <br />
              {details.network_names
                ? details.network_names.map (tv => (
                    <Tag key={tv} color="#f8df8b" bordered={false}>{tv}</Tag>
                  ))
                : 'No Platforms'}
            </p>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};
export default TVComing;
