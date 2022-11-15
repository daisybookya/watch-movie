import '../css/Showing.less';
import {Col, Image, Row, Button} from 'antd';
import {Typography} from 'antd';
const {Title} = Typography;
export function IndexMovie (props) {
  return (
    <div className={`${props.show ? 'index-movie active' : 'index-movie'}`}>
      <Row>
        <Col
          xs={{span: 20, offset: 1}}
          md={{span: 7, offset: 1}}
          lg={{span: 7, offset: 2}}
          xl={{span: 4, offset: 6}}
        >
          <Image
            src={props.img}
            preview={false}
            fallback={process.env.PUBLIC_URL + '/subimg.jpg'}
          />

        </Col>
        <Col
          xs={{span: 20, offset: 2}}
          md={{span: 13, offset: 1}}
          lg={{span: 12, offset: 1}}
          xl={{span: 9}}
          style={{paddingLeft: '1%'}}
        >
          <Button type="primary" className="close-btn" onClick={props.close}>
            close X
          </Button>
          <Title level={2} className="sp-font">
            {props.name}
          </Title>
          <Typography.Title level={4} style={{marginTop: 0}}>
            Release date:{props.date}
          </Typography.Title>
          <div className="summary">
            {props.children}
          </div>
        </Col>
      </Row>
    </div>
  );
}
