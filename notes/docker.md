查看版本

docker version

启动

service docker starter

拉取镜像

docker pull 

docker images

docker run -d -p xxx:xxx （本地端口，容器端口）容器名称

​	-d 后台运行

​	-p 端口映射  主机端口：容器端口 

docker ps

docker stop

docker 

​	-t 指定 名称：版本 目录

docker restart  容器id

删除镜像 docker rmi

删除容器 docker rm

进入容器 docker exec -it 容器 /bash/bin

​	