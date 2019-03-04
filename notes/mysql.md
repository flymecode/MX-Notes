如何设计一个关系型数据库？

![1550129557975](https://github.com/flymecode/MX-Notes/blob/master/image/1550129557975.png)

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

![1550130972854](https://github.com/flymecode/MX-Notes/blob/master/image/1550130972854.png)

##### 密集索引和稀疏索引的区别？

密集索引文件中每一个搜索码值都对应一个索引值

稀疏索引文件只为索引码的某些值建立索引项

MyISAM 是稀疏索引

InnoDB有且仅有一个密集索引



![1550137599967](https://github.com/flymecode/MX-Notes/blob/master/image/1550137599967.png)

非主键索引存储相关键位和其对应的主键值，包含两次查找



如何定位并优化慢查询Sql

show variables like '%query%'
show status like '%slow_queries%'

![1550139826980](https://github.com/flymecode/MX-Notes/blob/master/image/1550139826980.png)

![1550139854091](https://github.com/flymecode/MX-Notes/blob/master/image/1550139854091.png)

打开慢查询

set global slow_query_log = on

set global long_query_time = 1;

根据慢日志定位慢查询 sql

添加explain分析sql

让sql尽量走索引





![1550139799373](https://github.com/flymecode/MX-Notes/blob/master/image/1550139799373.png)



联合索引（由多列组成的索引）的最左匹配原则的成因？



![1550143900092](https://github.com/flymecode/MX-Notes/blob/master/image/1550143900092.png)

mysql创建复合索引首先对sql最左边的索引字段进行排序，在排序的基础上再对第二个索引的字段进行排序。



索引是建立的越多越好吗？

数据量小的表不需要建立索引，建立会增加额外的索引开销

数据变更要维护索引，因此更多的索引意味更多的维护成本

更多的索引意味着也需要更多的空间



锁模块

查询隔离级别

select @@ tx_isolation

设置隔离级别

set session transaction isolation level read uncommitted

![1550218906156](https://github.com/flymecode/MX-Notes/blob/master/image/1550218906156.png)

![1550221752136](https://github.com/flymecode/MX-Notes/blob/master/image/1550221752136.png)

![1550223134805](https://github.com/flymecode/MX-Notes/blob/master/image/1550223134805.png)

![1550223906919](https://github.com/flymecode/MX-Notes/blob/master/image/1550223906919.png)

![1550224011169](https://github.com/flymecode/MX-Notes/blob/master/image/1550224011169.png)

![1550224407677](https://github.com/flymecode/MX-Notes/blob/master/image/1550224407677.png)

### 隔离级别

​	一个事务与其它事务的隔离程度称为隔离级别



当有两个事务并发执行的时候，有可能发生脏读，不可重复读，幻读

| 类型       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| 脏读       | 一个事务读取到另一个事务未提交的数据                         |
| 不可重复读 | 一个事务第二次读取的数值跟第二次读取的不一致                 |
| 幻读       | 一个事务读取到表中的一部分数据，另一个事务向数据库中插入或删除一些数据，此时事务再读取的话就会出现数据不一致。 |



| 类型     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| 读未提交 | （允许tx1读取tx2未提交的事务）                               |
| 读已提交 | 要求tx1只能读取tx2已经提交的修改                             |
| 可重复读 | 确保tx1可以多次从一个字段中取到相同的值，即tx1执行期间禁止其它的事务可以对这个字段进行更新。 |
| 串行化   | 确保tx1可以多次从一个表找那个读取到相同的行，在tx1执行期间，禁止其它的事务对这个表进行添加，删除，更新操作。 |

##### 锁的类型

​	共享锁