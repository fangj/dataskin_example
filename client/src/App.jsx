import './App.css'
import { Button ,Space } from 'antd';

function App() {

  return (
    <div className='app_bg'>
    <div className="page_container">
      <h1>数据可视化展示</h1>
      <h3>样例1:饮料销量</h3>
      <Space>
        <Button href="/#/coffee" target="_blank"  type='primary'>
          展示页面
        </Button> 
        <Button href="/#/coffee_controller" target="_blank">
          控制页面
        </Button>
        </Space>
      </div>
    </div>
  )
}

export default App
