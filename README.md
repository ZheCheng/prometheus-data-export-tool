# 性能测试-Prometheus监控数据展示与导出
使用说明：

目前只支持Chrome浏览器；	

图表展示必输参数为“项目简写名字”，开始和结束时间为可选；

数据导出必输参数为页面所有参数；

项目简写名字与Prometheus配置文件里的job名字一致（项目英文简写），自动根据job名获取所有被测服务器IP;

step值为查询监控数值每几秒统计一次；

Prometheus服务端地址固定不用更改；
![image](https://user-images.githubusercontent.com/18591933/142213364-60332a77-ce57-492a-bef4-b8a2b45bd3ab.png)


