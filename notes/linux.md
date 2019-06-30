体系结构

用户态（用户上层活动）和内核态

内核：本质上是一段管理计算机硬件设备的程序

内核提供上层应用访问的接口

系统调用：内核访问接口，是一种不能再简化操作

公用函数库：系统调用的组合拳

Shell: 命令解释器，可编程





### Linux基本命令

top 查看占用的资源

##### tail -fn 10 <文件名称>  动态查看文件内容，用来查看日志

①  sudo apt-get update        ##更新所有软件包

②  apt-get常用命令

| 命令             | 描述                                   |
| ---------------- | -------------------------------------- |
| apt-get  install | 下载并安装软件包                       |
| apt-get  upgrade | 下载并安装本系统上已有的软件包的最新版 |
| apt-get  remove  | 卸载特定的软件包                       |
| apt-get source   | 下载特定软件的源代码                   |
| apt-get clean    | 删除所有的已下载的包文件               |

#####  查找特定的文件 find

find -name



检索文件内容 grep

管道 |，可将指令连接起来，前一个指令的输出可以作为另一个指令的输入



##### 快捷键

ctrl+l

ctrl+u

ctrl + a

ctrl + e

ctrl + r



top - H

cpu us: 用户空间的cpu使用情况 用户层代码

cpu sy:内核空间的cpu使用情况 系统调用

load average: 1,5,15分钟load平均值，跟着核数系数，0代表通常，1，代表打满，1+代表等待阻塞

memory:free 空闲内存，used使用内存

pstree -p 端口号  线程树

















