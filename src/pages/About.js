import '../css/Layout.less';
import {Card, List} from 'antd';
import {Layout} from '../components/Layout';
import {useState} from 'react';
const About = () => {
  const [activeTabKey, setActiveTabKey] = useState ('tool');
  const onTab1Change = key => {
    setActiveTabKey (key);
  };
  const data = [
    {
      title: 'Now Showing',
      intro: '介紹美國(United States)現正上映中的電影。點擊海報即可展開電影全名、上映日期、電影摘要、預告',
    },
    {
      title: 'Coming Soon Movie',
      intro: '介紹美國(United States)即將上映的電影。點擊海報即可展開電影預告。電影清單列出上方跑馬燈所有電影資料，包括預計上映日期、電影摘要、預告等',
    },
  ];
  const tabList = [
    {
      key: 'tool',
      tab: '網站搭建',
    },
    {
      key: 'update',
      tab: '網站更新日誌',
    },
  ];
  const toolContent = () => {
    return (
      <div>
        <p>
          前端工具：React + create react app + react-router-dom + @reduxjs/toolkit
          + react-redux + axios + react-player + antd design ( UI框架 ) + less
        </p>
        <p>
          API 使用:
          <a
            href="https://developer.movieglu.com/"
            rel="noreferrer"
            target="_blank"
          >
            MovieGlu{' '}
          </a>(提供美、英、法、西班牙、德、荷、澳洲、加拿大、印度等國家上映的電影資訊)
        </p>
      </div>
    );
  };
  const updateContent = () => {
    return (
      <div>

        <h3>ver:1.1 - 2024.02.23</h3>
        <ul>
          <li>網站配色修改</li>
          <li>頁面設計修改：home/about/now showing/coming soon/movie details</li>
          <li>預覽電影預告片播放介面修改，新增回放/靜音按鈕功能</li>
          <li>新增電影分級資訊</li>
          <li>新增美國串流電視即將上映的影集頁面</li>
        </ul>
        <h3>ver:1.0 - 2022.11.15</h3>
      </div>
    );
  };
  const contentList = {
    tool: toolContent (),
    update: updateContent (),
  };
  return (
    <Layout
      style={{
        background: `linear-gradient(
      43deg,
      rgb(23, 23, 23) 0%,
      rgba(71, 71, 71, 1) 35%,
      rgba(25, 25, 25, 1) 100%
    )`,
      }}
    >
      <div className="about">

        <Card title="-網站目錄簡介" bordered={false}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta title={item.title} description={item.intro} />
              </List.Item>
            )}
          />
        </Card>
        <Card
          bordered={false}
          title="-關於本站"
          tabList={tabList}
          activeTabKey={activeTabKey}
          onTabChange={onTab1Change}
        >
          {contentList[activeTabKey]}
        </Card>
      </div>
    </Layout>
  );
};
export default About;
