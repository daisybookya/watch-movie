import '../css/Layout.less';
import {Card, List} from 'antd';
import {Layout} from '../components/Layout';
const About = () => {
  const data = [
    {
      title: 'Now Showing',
      intro: '介紹美國(United States)現正上映中的電影。點擊海報即可展開電影全名、上映日期、電影摘要、預告',
    },
    {
      title: 'Coming Soon Movie',
      intro: '介紹美國(United States)即將上映的電影。點擊海報即可展開電影預告。電影清單列出上方跑馬燈所有電影資料，包括預計上映日期、電影摘要、預告等',
    },
    {
      title: 'Film Show Times',
      intro: '可查詢美國(United States)現正上映中電影的場次。電影院場次預設以美國紐約古根漢美術館附近的三家電影院為主',
    },
  ];
  return (
    <Layout>
      <div className="about">

        <Card title="網站目錄簡介">
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
        <Card title="網站搭建工具">
          <p>
            React + create react app + react-router-dom + @reduxjs/toolkit
            + react-redux + axios + react-player + antd design ( UI框架 ) + less
          </p>
        </Card>
        <Card title="網站api">
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
        </Card>
      </div>
    </Layout>
  );
};
export default About;
