import { Col, Row } from 'antd';

export default ()=>{
    const gutter=[16, 32]
    return <div>
        <Row gutter={gutter}>
      <Col span={12} style={{textAlign:'left'}}>今日发电</Col>
      <Col span={12} style={{textAlign:'right'}}>84951 KWH</Col>
      <Col span={12} style={{textAlign:'left'}}>总发电量</Col>
      <Col span={12} style={{textAlign:'right'}}>1092809129 KWH</Col>
      <Col span={12} style={{textAlign:'left'}}>累计收益</Col>
      <Col span={12} style={{textAlign:'right'}}>10281 万元</Col>
      <Col span={12} style={{textAlign:'left'}}>装机容量</Col>
      <Col span={12} style={{textAlign:'right'}}>16230 KW</Col>
      <Col span={12} style={{textAlign:'left'}}>日等效时</Col>
      <Col span={12} style={{textAlign:'right'}}>3.6 H</Col>
    </Row>
    </div>
}