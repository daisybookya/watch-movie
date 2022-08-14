import '../css/Showing.less';
import {Col, Image, Row, Button} from 'antd';
import {Typography} from 'antd';
const {Title} = Typography;
export function IndexMovie (props) {
  return (
    <div
      className={`index-movie ${props.show ? 'index-movie active' : 'index-movie'}`}
    >
      <Row>
        <Col
          xs={{span: 9, offset: 1}}
          md={{span: 4, offset: 5}}
          lg={{span: 4, offset: 6}}
        >
          <Image src={props.img} preview={false} fallback="../subimg.jpg" />
          <Button type="primary" className="close-btn" onClick={props.close}>
            close X
          </Button>
        </Col>
        <Col
          xs={{span: 13}}
          md={{span: 12}}
          lg={{span: 9}}
          style={{paddingLeft: '1%'}}
        >
          <Title level={2} className="sp-font">
            {props.name}

          </Title>
          <Title level={4}>Release date:{props.date}</Title>
          <div className="summary">
            {props.children}
          </div>
        </Col>
      </Row>
    </div>
  );
}
