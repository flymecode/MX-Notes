如何设计一个关系型数据库？

![1550129557975](C:\Users\maxu1\Desktop\MX-Notes\notes\1550129557975.png)

## 索引模块

##### 为什么要使用索引？

使用索引能够避免我们全表查找数据

##### 什么样的信息能够成为索引？

主键

##### 索引的数据结构？

二叉查找树

B+Tree 更适合用来做存储索引

B+Tree树的磁盘读写代价更低

B+Tree的铲鲟效率更加稳定

B+Tree更有利于对数据库的扫描

![1550130972854](C:\Users\maxu1\Desktop\MX-Notes\notes\1550130972854.png)

##### 密集索引和稀疏索引的区别？

密集索引文件中每一个搜索码值都对应一个索引值

稀疏索引文件只为索引码的某些值建立索引项

MyISAM 是稀疏索引

InnoDB有且仅有一个密集索引



![1550137599967](C:\Users\maxu1\Desktop\MX-Notes\notes\1550137599967.png)

非主键索引存储相关键位和其对应的主键值，包含两次查找



如何定位并优化慢查询Sql

show variables like '%query%'
show status like '%slow_queries%'

![1550139826980](C:\Users\maxu1\Desktop\MX-Notes\notes\1550139826980.png)

![1550139854091](C:\Users\maxu1\Desktop\MX-Notes\notes\1550139854091.png)

打开慢查询

set global slow_query_log = on

set global long_query_time = 1;

根据慢日志定位慢查询 sql

添加explain分析sql

让sql尽量走索引





![1550139799373](C:\Users\maxu1\Desktop\MX-Notes\notes\1550139799373.png)



联合索引（由多列组成的索引）的最左匹配原则的成因？



![1550143900092](C:\Users\maxu1\Desktop\MX-Notes\notes\1550143900092.png)

mysql创建复合索引首先对sql最左边的索引字段进行排序，在排序的基础上再对第二个索引的字段进行排序。



索引是建立的越多越好吗？

数据量小的表不需要建立索引，建立会增加额外的索引开销

数据变更要维护索引，因此更多的索引意味更多的维护成本

更多的索引意味着也需要更多的空间

