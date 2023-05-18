import './App.css'
import { Card, Col, Row, Button, Space } from 'antd';

function App() {

  return (
    <div className='app_bg'>
      <div className="page_container">
        <h1>数据可视化展示</h1>

        <Row gutter={16}>
          <Col span={8}>
            <Card title="样例1:饮料销量" hoverable >
              <Space>
                <Button href="/#/coffee" target="_blank" type='primary'>
                  展示页面
                </Button>
                <Button href="/#/coffee_controller" target="_blank">
                  控制页面
                </Button>
              </Space>
            </Card>
          </Col>
          <Col span={8}>
          <Card title="样例2:科技大屏" hoverable >
              <Space>
                <Button href="/#/bluetech" target="_blank" type='primary'>
                  展示页面
                </Button>
                <Button href="/#/bluetech_controller" target="_blank">
                  控制页面
                </Button>
              </Space>
            </Card>
          </Col>
          <Col span={8}>
          <Card title="样例3:3D景区" hoverable >
              <Space>
                <Button href="/#/coffee" target="_blank" type='primary'>
                  展示页面
                </Button>
                <Button href="/#/coffee_controller" target="_blank">
                  控制页面
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>

      </div>
    </div>
  )
}

export default App
