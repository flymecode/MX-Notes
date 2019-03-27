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

##### 



### 索引

索引（Index）是帮助MySQL高效获取数据的数据结构。

> MyISAM索引实现

MyISAM引擎使用B+Tree作为索引结构，叶节点的data域存放的是数据记录的地址。下图是MyISAM索引的原理图：



![img](https:////upload-images.jianshu.io/upload_images/1293895-2ee0a19637a08ee9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/664/format/webp)

图 8 Primary Key

这里设表一共有三列，假设我们以Col1为主键，则图8是一个MyISAM表的主索引（Primary key）示意。可以看出MyISAM的索引文件仅仅保存数据记录的地址。在MyISAM中，主索引和辅助索引（Secondary key）在结构上没有任何区别，只是主索引要求key是唯一的，而辅助索引的key可以重复。如果我们在Col2上建立一个辅助索引，则此索引的结构如下图所示：



![img](https:////upload-images.jianshu.io/upload_images/1293895-eb2a432766c19d19.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/664/format/webp)

图 9 Secondary Key

同样也是一颗B+Tree，data域保存数据记录的地址。因此，MyISAM中索引检索的算法为首先按照B+Tree搜索算法搜索索引，如果指定的Key存在，则取出其data域的值，然后以data域的值为地址，读取相应数据记录。

MyISAM的索引方式也叫做“非聚集”的，之所以这么称呼是为了与InnoDB的聚集索引区分。

> InnoDB 索引实现

InnoDB的数据文件本身就是索引文件。
 MyISAM索引文件和数据文件是分离的，索引文件仅保存数据记录的地址。而在InnoDB中，表数据文件本身就是按B+Tree组织的一个索引结构，这棵树的叶节点data域保存了完整的数据记录。这个索引的key是数据表的主键，因此InnoDB表数据文件本身就是主索引。



![img](https:////upload-images.jianshu.io/upload_images/1293895-40fd73af714eb977.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/543/format/webp)

图 10 Primary Key

图10是InnoDB主索引（同时也是数据文件）的示意图，可以看到叶节点包含了完整的数据记录。这种索引叫做聚集索引。因为InnoDB的数据文件本身要按主键聚集，所以InnoDB要求表必须有主键（MyISAM可以没有），如果没有显式指定，则MySQL系统会自动选择一个可以唯一标识数据记录的列作为主键，如果不存在这种列，则MySQL自动为InnoDB表生成一个隐含字段作为主键，这个字段长度为6个字节，类型为长整形。

第二个与MyISAM索引的不同是InnoDB的辅助索引data域存储相应记录主键的值而不是地址。换句话说，InnoDB的所有辅助索引都引用主键作为data域。例如，图11为定义在Col3上的一个辅助索引：



![img](https:////upload-images.jianshu.io/upload_images/1293895-eeb9baea003174f8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/543/format/webp)

图 11 Secondary Key

聚集索引这种实现方式使得按主键的搜索十分高效，但是辅助索引搜索需要检索两遍索引：首先检索辅助索引获得主键，然后用主键到主索引中检索获得记录。

了解不同存储引擎的索引实现方式对于正确使用和优化索引都非常有帮助，例如知道了InnoDB的索引实现后，就很容易明白为什么不建议使用过长的字段作为主键，因为所有辅助索引都引用主索引，过长的主索引会令辅助索引变得过大。再例如，用非单调的字段作为主键在InnoDB中不是个好主意，因为InnoDB数据文件本身是一颗B+Tree，非单调的主键会造成在插入新记录时数据文件为了维持B+Tree的特性而频繁的分裂调整，十分低效，而使用自增字段作为主键则是一个很好的选择。

> 最左前缀原理与相关优化

titles表的主索引为<emp_no, title, from_date>，还有一个辅助索引<emp_no>。为了避免多个索引使事情变复杂（MySQL的SQL优化器在多索引时行为比较复杂），这里我们将辅助索引drop掉：

```txt
SHOW INDEX FROM employees.titles;
+--------+------------+----------+--------------+-------------+-----------+-------------
| Table  | Non_unique | Key_name | Seq_in_index | Column_name | Collation | Cardinality | Null | Index_type |
+--------+------------+----------+--------------+-------------+-----------+-------------
| titles |  0 | PRIMARY  |  1 | emp_no    | A   |     NULL |     | BTREE      |
| titles |  0 | PRIMARY  |  2 | title     | A   |     NULL |     | BTREE      |
| titles |  0 | PRIMARY  |  3 | from_date | A   |   443308 |     | BTREE      |
| titles |  1 | emp_no   |  1 | emp_no    | A   |   443308 |     | BTREE      |
+--------+------------+----------+--------------+-------------+-----------+-------------
ALTER TABLE employees.titles DROP INDEX emp_no;
```

理论上索引对顺序是敏感的，但是由于MySQL的查询优化器会自动调整where子句的条件顺序以使用适合的索引

```
EXPLAIN SELECT * FROM employees.titles WHERE emp_no='10001' AND title='Senior Engineer' AND from_date='1986-06-26';
+----+-------------+--------+-------+---------------+---------+---------+----------------
| id | select_type | table  | type  | possible_keys | key | key_len | ref | rows | Extra 
+----+-------------+--------+-------+---------------+---------+---------+----------------
|  1 | SIMPLE      | titles | const | PRIMARY       | PRIMARY | 59 | const,const,const| 1
+----+-------------+--------+-------+---------------+---------+---------+----------------


EXPLAIN SELECT * FROM employees.titles WHERE from_date='1986-06-26' AND emp_no='10001' AND title='Senior Engineer';
+----+-------------+--------+-------+---------------+---------+---------+----------------
| id | select_type | table  | type  | possible_keys | key| key_len | ref | rows | Extra |
+----+-------------+--------+-------+---------------+---------+---------+----------------
|  1 | SIMPLE      | titles | const | PRIMARY     | PRIMARY | 59|const,const,const |  1
+----+-------------+--------+-------+---------------+---------+---------+----------------
```

