## 基于parse live query的数据单元

在这种大屏幕可视化场景中，"显示"和"控制"分别是2个独立的屏幕。
1. 控制数据通过restful接口发往服务器。
2. 服务器用websocket通知"显示"界面更新数据。

第1部分是普通的restful接口，用express实现。第二部分使用parse live query实现。服务器使用parse存储数据，客户端订阅数据的更新，当数据更新时，更新界面。

### 服务端：

建立名为"Unit"的live query对象。有"key"和"value"字段。


### 客户端：

1. UnitService (复用)
   负责从parse中获取和订阅数据
2. UnitStore (复用)
   负责在后端数据更新时更新前端数据
3. UnitView
   是在UnitStore数据更新时自动更新的界面
