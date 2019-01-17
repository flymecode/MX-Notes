配置内容

\#定义输出级别和输出平台

**log4j.rootLogger=error, console, keyfile**


**log4j.appender.console=org.apache.log4j.ConsoleAppenderlog4j.appender.console.layout=org.apache.log4j.PatternLayoutlog4j.appender.console.layout.ConversionPattern=[%-12d{HH\:mm\:ss.SS}] [%p] %l %m%n**
\#  每天一个日志文件
**log4j.appender.keyfile=org.apache.log4j.DailyRollingFileAppenderlog4j.appender.keyfile.Append=truelog4j.appender.keyfile.DatePattern='.'yyyy-MM-ddlog4j.appender.keyfile.File=${catalina.base}/var/logs/sfbest-uas.loglog4j.appender.keyfile.layout=org.apache.log4j.PatternLayoutlog4j.appender.keyfile.layout.ConversionPattern=%-23d{yyyy-MM-dd HH\:mm\:ss.SS}| %m%n**

\#对不同的文件定义不同的输出级别

**log4j.appender.keyfile.Threshold=error**

\#设定stdout输出平台
**log4j.appender.stdout=org.apache.log4j.ConsoleAppenderlog4j.appender.stdout.layout=org.apache.log4j.PatternLayoutlog4j.appender.stdout.layout.ConversionPattern=%d %p [%c] - %m%n**

**详细介绍：**

1、log4j.rootLogger
这个配置是必须的，它的定义格式：
log4j.rootLogger = level  , appenderName, appenderName, …

lelve是定义的输出级别，低于该级别的将不会输出，主要级别有OFF、ALL、FATAL、ERROR、WARN、INFO、DEBUG或自定义级别，其中OFF设定的话将不输出任何信息，ALL设定的话将输出所有信息；另外5个的级别FATAL>ERROR>WARN>INFO>DEBUG，如果你的lenel设定为INFO，那么不能输出DEBUG信息；

appenderName是指定日志信息输出到哪个地方，控制台，文件等等，可同时指定多个输出目的地。

2、log4j.appender
这个也是必须配置的，它是负责控制日志记录操作的输出。它的定义格式如下：

log4j.appender.appenderName=someAppender(选择一种输出平台)
[log4j.appender.appenderName.File=文件名](文件输出定义路径)
log4j.appender.appenderName.layout=输出布局
log4j.appender.appenderName.layout.ConversionPattern=输出格式

log4j.appender.appenderName指定输出appender，Log4J提供了一下几种appender：

a),org.apache.log4j.ConsoleAppender（控制台）
b),org.apache.log4j.FileAppender（文件）
c),org.apache.log4j.DailyRollingFileAppender（每天产生一个日志文件）
d),org.apache.log4j.RollingFileAppender（文件大小到达指定尺寸的时候产生一个新的文件，可通过log4j.appender.R.MaxFileSize=100KB设置文件大小，还可通过log4j.appender.R.MaxBackupIndex=1设置为保存一个备份文件）。
e),org.apache.log4j.WriterAppender（将日志信息以流格式发送到任意指定的地方）

log4j.appender.appenderName.layout指定日志信息的格式（布局）Layout，它负责格式化Appender的输出。Log4j提供的layout有以下几种：

org.apache.log4j.HTMLLayout（以HTML表格形式布局）
org.apache.log4j.PatternLayout（可以灵活地指定布局模式）
org.apache.log4j.SimpleLayout（包含日志信息的级别和信息字符串）
org.apache.log4j.TTCCLayout（包含日志产生的时间、线程、类别等等信息）。

log4j.appender.appenderName.layout.ConversionPattern格式化日志信息，Log4J采用类似C语言中的printf函数的打印格式格式化日志信息，打印参数如下：

%m 输出代码中指定的消息
%p 输出优先级，即DEBUG，INFO，WARN，ERROR，FATAL
%r 输出自应用启动到输出该log信息耗费的毫秒数
%c 输出所属的类目，通常就是所在类的全名
%t 输出产生该日志事件的线程名
%n 输出一个回车换行符，Windows平台为“rn”，Unix平台为“n”
%d 输出日志时间点的日期或时间，默认格式为ISO8601，也可以在其后指定格式，比如：%d{yyyy MMM dd HH:mm:ss,SSS}，输出类似：2012年06月24日 23：55：28，92
%l 输出日志事件的发生位置，包括类目名、发生的线程，以及在代码中的行数。

3，log4j.logger

这个不是必需的，如果不配置这个，则采用log4j.rootLogger的level级别。它主要是具体到package、Class级别的info，它的定义格式如下：

log4j.logger.packageName[.ClassName]=level[,appender]

它也可以输出到指定的appender，也可以不指定输出到默认appender。

4，log4j的使用

a)、从www.apache.org下载commongs-logging包；

b)、在你的class里面定义protected final Log logger = LogFactory.getLog(this.getClass());
c)、在需要日志输出的地方logger.info(...),logger.error(...),logger.debug(...),....注意，在使用时前最好做个判断if (logger.isDebugEnabled()){logger.debug("...");}其他类似。

在我的项目中，由于我log4j.rootLogger=error, console, keyfile在这里定义的输出级别为error,所以，在项目中，用的打印日志为

logger.error("message");如果用logger.info("message")或者别的是打印不出来消息的

这里，个人理解，用error或者info是没有区别的，主要根据自己在log4j.properties中定义的输出级别来定，何况这里的目的就是为了打印信息，这个时候，来讲下logger.error(……)和system.out.println()的区别：

1、在生产中，system.out.println()和程序是同一个线程，会影响程序的执行效率，而logger.error(……)和程序是异步线程，在输出语句的时候，不会影响程序的执行。

2、在开发中，System.out.print  比 ogger.error(……)更方便查看日志。

3、system这种语句是硬编码，不能控制输出，像log4j的日志框架可以控制需要的输出的日志等级。

正好这里有关log4j的日志级别，那么也讲一下LOG4J日志级别：



日志记录器(Logger)是日志处理的核心组件。 
org.apache.log4j.Level类提供以下级别，但也可以通过Level类的子类自定义级别。

| Level | 描述                                                   |
| ----- | ------------------------------------------------------ |
| ALL   | 各级包括自定义级别                                     |
| DEBUG | 指定细粒度信息事件是最有用的应用程序调试               |
| ERROR | 错误事件可能仍然允许应用程序继续运行                   |
| FATAL | 指定非常严重的错误事件，这可能导致应用程序中止         |
| INFO  | 指定能够突出在粗粒度级别的应用程序运行情况的信息的消息 |
| OFF   | 这是最高等级，为了关闭日志记录                         |
| TRACE | 指定细粒度比DEBUG更低的信息事件                        |
| WARN  | 指定具有潜在危害的情况                                 |

log4j具有5种正常级别(Level)。

日志记录器(Logger)的可用级别Level (不包括自定义级别 Level)

static Level DEBUG 
DEBUG Level指出细粒度信息事件对调试应用程序是非常有帮助的。

static Level INFO 
INFO level表明 消息在粗粒度级别上突出强调应用程序的运行过程。

`static Level WARN` 
WARN level表明会出现潜在错误的情形。

`static Level ERROR` 
ERROR level指出虽然发生错误事件，但仍然不影响系统的继续运行。

`static Level FATAL` 
FATAL level指出每个严重的错误事件将会导致应用程序的退出。

另外，还有两个可用的特别的日志记录级别: 
`static Level ALL` 
ALL Level是最低等级的，用于打开所有日志记录。

`static Level OFF` 
OFF Level是最高等级的，用于关闭所有日志记录。

日志记录器（Logger）的行为是分等级的。 
如下表所示： 
分为OFF、FATAL、ERROR、WARN、INFO、DEBUG、TRACE、ALL或者您定义的级别。 
Log4j建议只使用四个级别，优先级从高到低分别是ERROR、WARN、INFO、DEBUG。 通过在这里定义的级别，您可以控制到应用程序中相应级别的日志信息的开关。 比如在这里定义了INFO级别，则应用程序中所有DEBUG级别的日志信息将不被打印出来。 
程序会打印高于或等于所设置级别的日志，设置的日志等级越高，打印出来的日志就越少。 如果设置级别为INFO，则优先级高于等于INFO级别（如：INFO、WARN、ERROR）的日志信息将可以被输出,小于该级别的如DEBUG将不会被输出。 项目上生产环境时候建议把debug的日志级别重新调为warn或者更高，避免产生大量日志。