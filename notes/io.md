[TOC]



# BIO

## 编码

GBK : 中文两个字节，英文一个字节

UTF-8: 中文三个字节，英文一个字节

UTF-16be: 中文和英文都是两个字节

当我们字节序列，按某种编码的时候，也要利用响应的方式解码

文本是 byte 的数据序列

文本文件是文本（char）按照某种编码方案序列化为 byte 的存储文件

## File

用来表示文件和目录的信息（名称，大小），不能用于对文件的访问。    

```java
File file = new File("java.txt");
        file.exists();
        file.delete();
        file.createNewFile();
        file.mkdir();
        file.deleteOnExit();
        file.isDirectory();
        file.getPath();
        String[] list = file.list();
        File[] files = file.listFiles(); 
```

## RandomAccessFile

提供对文件内容的访问，即可以读文件，也可以写文件。

支持随机访问文件，可以访问文件的任意位置。文件指针，打开文件时候指针在开头。pointer = 0 

有两种模式 rw 读写 r 只读

```java
RandomAccessFile raf = new RandomAccessFile(file,"rw");
int b = raf.read(); // 读一个字节
raf.write(int); // 写一个字节，同时指针指向下一个位置，准备写入
raf.seek(0);// 读文件，必须把指针移到头部
byte[] buf = new byte[(int)raf.lenght()];
raf.read(buf); // 一次性读取到数组中
ref.close();
```

### 字节流

### InputStream\OutPutStream

EOF = END 读到 -1 就读到结尾

```java
int b = in.read(); // 读取一个字节无符号填充到 int 低八位， -1 是 EOF
in.read(byte[] buf);
in.read(byte[] buf,int start, int size);
out.write(int b); // 写一个 byte 到流， b 的低八位
out.write(byte[] buf) // 将 buf 字节数组都写入流
out.write(byte[] buf, int start, int size)
```

FileInputStream 具体实现了文件的读取对象

FileOutputStream ，实现了对文件的写入byte数据的方法，如果文件不存在，则直接创建，如果不存在，删除后创建

### DataOutputStream/DataInputStream

对流的扩展，可以更加方便的读取 int, long, 字符等信息。

### BufferedInputStream/BufferdOutputStream

提供了缓冲区，提高了 I/O 的性能



## 字符流 Reader/Writer



### InputStreamReader / OutputStreamWriter 

字节流转化为字符流

### FileReader/FileWriter

对文件进行直接进行字符操作，对文件没有编码上的操作。如果对编码有需要需要使用字节流

### BufferedReader/BufferedWriter

字符流的过滤器

```java
BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream("java")));
BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream("java")));
String line;
while ((line = br.readLine()) != null) {
	// 一次读取一行
    // 单独的换行符号
    bw.newLine();
    System.out.println(line);
}
```

### ObjectInputStream / ObjectOutputStream

```java
// 不序列化该属性
transient String name;
```

对子类进行序列化的时候，会递归的调用父类的空构造函数

对子类进行反序列化的时候，如果其父类没有实现序列化接口，那么其父类的构造函数就会被调用

## NIO（非阻塞IO）

基于通道的 IO，是非阻塞的，对数据的操作都是通过Buffer来进行操作的。

NIO 中的通道是双向，能够读数据也可以写数据

BIO 是以流的方式处理数据，而NIO是以块的方式处理数据。

NIO 的三大核心组件是 Channel、Buffer、Selector 传统的 BIO 是基于字节流和字符流进行操作，而 NIO 是基于Channel 和 Buffer 进行操作，数据总是从通道读取到缓冲区中，或者从缓冲区写入通道中。Selector 用于监听多个通道的事件，因此使用单个线程就可以监听多个客户端通道。



Selector(选择器)，能够检测多个注册的通道上是否有事件发生，如果有事件发生，便获
取事件然后针对每个事件进行相应的处理。这样就可以只用一个单线程去管理多个通道，也
就是管理多个连接。这样使得只有在连接真正有读写事件发生时，才会调用函数来进行读写，
就大大地减少了系统开销，并且不必为每个连接都创建一个线程，不用去维护多个线程，并
且避免了多线程之间的上下文切换导致的开销。

SelectionKey ，代表了 Selector 和网络通道的注册关系

ServerSocketChannel，用来监听服务器端新的客户端 Socket 连接

SocketChannel，网络 IO 通道，具体负责进行读写操作。NIO 总是把缓冲区的数据写入通
道，或者把通道里的数据读到缓冲区。



![1554087261724](E:\Git\TTMS\MX-Notes\image\1554087261724.png)



Netty

单线程模型

![1554110798096](E:\Git\TTMS\MX-Notes\image\1554110798096.png)

服务器端用一个多路复用搞定所有的 IO 操作，编码简单，但是如果客户端连接数量较多，将无法支撑。

多线程模型

![1554110823802](E:\Git\TTMS\MX-Notes\image\1554110823802.png)

Reactor 单线程负责建立连接，负责注册，Reactor 线程池，负责后续的读写请求都由线程池来负责



主从线程模型

![1554110843448](E:\Git\TTMS\MX-Notes\image\1554110843448.png)

主线程池负责，建立客户端的连接，当连接建立完毕之后，从线程池负责后续的读写操作。