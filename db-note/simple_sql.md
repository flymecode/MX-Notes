#### sql语句

##### DISTINCT

可以对我们查询出来的字段进行去重操作，但是当我指定查询多个字段的时候DISTINCT对全部列起作用。

```sq
SELECT DISTINCT book_price FROM book;
```

```sql
SELECT DISTINCT book_price,book_name FROM book;
```



##### ORDER BY

为了明确的排序用SELECT语句检索出的数据，我们可以使用ORDER BY子句。

ORDER BY 子句可以取一个或者多个列的名字

默认是按照升序进行排序的ASC ，降序排序是按照 DESC 排序的。

```sql
SELECT book_name FROM book ORDER BY book_name;
```

```sql
SELECT book_name FROM book ORDER BY book_name,book_price;
```

`注意：`

​	`通常ORDER BY 子句使用的列将是我们显示所选择的列，但是我们也可使用非检索的列进项排序也是完全合法的。`

​	`当对多行进行排序的时候，首先会按照指定的排序规则进行，当按照第一个排序规则排序时，列中含有相同数值的时候，再按照第二个规则进行排序。如果第一个规则中所有列的值都唯一，就不会按照第二个规则进项排序，以此类推。`

##### LIMIT

默认是从第一行进行查询，行号为 0

```sql
SELECT * FROM book LIMIT 5; // 将返回最多5行数据，如果超出表的行数，将返回最多行。
```

```sql
SELECT * FROM book LIMIT 1,5; //从第2行返回最多5条数据
```

注意：在使用 ORDER BY 与 LIMIT的必须保证ORDER BY 必须在LIMIT 子句之前。

##### WHERE

`在同时使用WHERE 子句和OREDER BY子句的时候 必须保证ORDER BY 在后WHERE之后。`

##### BETWEEN 范围检查

```sql
SELECT * FROM book WHERE book_price BETWEEN 3 AND 5; // 包括开始值和结束值 3和5 
```

``` sql
SELECT * FROM book WHERE book_price IS NULL;
```

##### IN

```sql
SELECT book_price FROM book WHERE book_price IN (1,2,3);
```

##### NOT

```sql
SELECT book_price FROM book WHERE book_price  NOT IN (1,2,3);
```

`注意：`

`NOT支持对BETWEEN IN EXISTS进行取反`



##### REGEXP 

进行正则匹配

```regexp
. 匹配任何字符
[123] 配置[]包含的字符
[1-2] 设置范围
'1000' 配置字符串
'1|2' 匹配1 或者 2
```



| 元字符 | 说明                       |
| :----- | -------------------------- |
| *      | 0个或者多个                |
| +      | 1个或者多个                |
| ？     | 0个或者一个                |
| {n}    | 指定个数                   |
| {n,}   | 不少于指定个数             |
| {n,m}  | 配置数目的范围，m不超过255 |

| 元字符 | 说明       |
| ------ | ---------- |
| ^      | 文本的开始 |
| $      | 文本的结束 |



#### 聚集函数

##### AVG  忽略NULL

##### COUNT 如果使用指定的列名，如果该列的值为空的时候会被忽略，如果是* 则不会忽略

##### MAX  忽略NULL