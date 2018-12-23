# Git

## 什么是Git?
  - Git是一款源代码管理工具(版本控制工具)
    - 我们写的代码需要使用Git进行管理。
  - 源代码有必要管理起吗？
  - 1.0
  - 2.0 // 
  - svn,vss,vcs.... git
  - 有必要，因为人工的去处理不同的版本，做相应备份会很麻烦。
  - Git是linux之父当年为了维护linux---linus之前也是手动维护合并把文件发给Linus
  - linus自己写了一个版本管理的工具(Git)

## Git安装

## 初始化Git仓储/(仓库)
- 这个仓库会存放，git对我们项目代码进行备份的文件
- 在项目目录右键打开 git bash
- 命令: `git init`


## 自报家门
- 就是在git中设置当前使用的用户是谁
- 每一次备份都会把当前备份者的信息存储起来
- 命令: 
    + 配置用户名:`git config --global user.name "xiaoming"`
    + 配置邮箱:  `git config --global user.email "xm@sina.com"`


## 把大象放到冰箱要几步
1. 打开冰箱门
2. 放大象
3. 关上冰箱

## 把代码存储到.git仓储中
- 1.把代码放到仓储的门口
    + `git add ./readme.md` 所指定的文件放到大门口
    + `git add ./` 把所有的修改的文件添加到大门口
- 2.把仓储门口的代码放到里面的房间中去
    + `git commit -m "这是对这次添加的东西的说明" `

## 可以一次性把我们修改的代码放到房间里(版本库)
- `git commit --all -m "一些说明"`
    + --all 表示是把所有修改的文件提交到版本库

## 查看当前的状态
- 可以用来查看当前代码有没有被放到仓储中去
- 命令: `git status`

## git中的忽略文件
- .gitignore,在这个文件中可以设置要被忽略的文件或者目录。
- 被忽略的文件不会被提交仓储里去.
- 在.gitignore中可以书写要被忽略的文件的路径，以/开头，
    一行写一个路径，这些路径所对应的文件都会被忽略，
    不会被提交到仓储中
    + 写法
        * ` /.idea  ` 会忽略.idea文件
        * ` /js`      会忽略js目录里的所有文件
        * ` /js/*.js` 会忽略js目录下所有js文件

## 查看日志
- `git log` 查看历史提交的日志
- `git log --oneline` 可以看到简洁版的日志

## 回退到指定的版本
- `git reset --hard Head~0`
    + 表示回退到上一次代码提交时的状态
- `git reset --hard Head~1`
    + 表示回退到上上次代码提交时的状态

- `git reset --hard [版本号]`
    + 可以通过版本号精确的回退到某一次提交时的状态

- `git reflog`
  + 可以看到每一次切换版本的记录:可以看到所有提交的版本号

## 分支
- 默认是有一个主分支master

### 创建分支
- `git branch dev`
    + 创建了一个dev分支
    + 在刚创建时dev分支里的东西和master分支里的东西是一样的

### 切换分支
- `git checkout dev`
    + 切换到指定的分支,这里的切换到名为dev的分支
    `git branch` 可以查看当前有哪些分支


### 合并分支
- `git merge dev`
    + 合并分支内容,把当前分支与指定的分支(dev),进行合并
    + 当前分支指的是`git branch`命令输出的前面有*号的分支
- 合并时如果有冲突，需要手动去处理，处理后还需要再提交一次.

### GitHub 
- https://github.com
- 不是git,只是一个网站
- 只不过这个网站提供了允许别通过git上传代码的功能

### 提交代码到github(当作git服务器来用)
- `git push [地址] master`
 + 示例: `git push https://github.com/huoqishi/test112.git master  master`
 + 会把当前分支的内容上传到远程的master分支上

- `git pull [地址] master`
 + 示例: `git pull https://github.com/huoqishi/test112.git master`
 + 会把远程分支的数据得到:(*注意本地-要初始一个仓储!*)

- `git clone [地址]`
 + 会得到远程仓储相同的数据,如果多次执行会覆盖本地内容。
 
 
 # 流行框架

## ssh方式上传代码
- 公钥 私钥,两者之间是有关联的。
- 生成公钥,和私钥
    + `ssh-keygen -t rsa -C "xiaoming@sina.com"`

## 在push和pull操作进
- 先pull , 再push

- 当我们在push时，加上-u参数，那么在下一次push时
  我们只需要写上`git push`就能上传我们的代码。(加上-u之后，git会把
  当前分支与远程的指定的分支进行关联。git push origin master)

## npm
- node package manager
- 管理项目的依赖包
- 可以用来下载我们需要使用的东西
- 安装后可以通过`npm -v` 查看版本

### npm 使用
- 1.初始化操作
    + `npm init` 会生成一个package.json文件
- 2.下载所需要的包
    + `npm install jquery`  下载jquery
    + 会去 registry.npmjs.org 这个地址下载jquery
    + 会生成一个node_modules目录，下载的内容就放在这个目录

- 3.下载包时，可以加上 `--save` 参数
    + `npm install jquery --save`, 下载之后会在package.json中添加
    当前下载的包的版本信息。

## gulp
[官网](http://www.gulpjs.com)
[中文网](http://www.gulpjs.com.cn)

- 前端自动化构建工具
- js: function(){//},代码压缩,混淆 : var name = 123,var x = 123
- css, 
- 合并: 1个js 1kb ,有10个js.

### 5个核心方法
 - gulp.task('任务名',function(){}) // 创建任务。
 - gulp.src('./*.css') 指定想要处理的文件
 - gulp.dest() // 指定最终处理后的文件的存放路径
 - gulp.watch() // 自动的监视文件的变化，然后执行相应任务。
 - gulp.run('任务名')，直接执行相应的任务。


### 安装gulp
- 通过npm安装:`npm install gulp-cli -g`

### gulp使用
- 1.在当前项目中也要安装gulp: `npm install gulp --save`
- 2.还需要在当前项目中新建一个文件: gulpfile.js

```javascript
    var gulp =  require('gulp');

    // 创建任务
    // 第一个参数: 任务名
    // 第二个参数: 回调函数,当我们执行任务时就会执行这个函数
    gulp.task('test', function(){
      console.log(123)
})
```
- 3.执行任务: `gulp 任务名`
    + 示例: `gulp test`

### 对js进行压缩
- `npm install gulp-uglify --save`

### 对js进行合并操作
- `npm install gulp-concat --save`

```javascript
    gulp.task('script', function(){
  // 1.要匹配到要处理的文件
  // 指定指定的文件:参数是匹配的规则
  // 参数也可以是数组，数组中的元素就是匹配的规则
  gulp.src(['./app.js','./sign.js'])
  // concat 的参数是合并之后的文件名字
  .pipe(concat('index.js'))
  .pipe(uglify())
  // dest方法参数，指定输出文件的路径
  .pipe(gulp.dest('./dist'))
})
```

### 对css进行压缩操作
- `npm install gulp-cssnano --save`

```javascript
   // 新建一个任务，对css进行处理
gulp.task('style', function(){
  // 对项目中的2个css文件进行合并，压缩操作
  // 1.匹配到要处理的文件
  gulp.src(['./*.css'])
  // 2.合并文件
  .pipe(concat('index.css'))
  // 3.压缩操作
  .pipe(cssnano())
  // 4.输出到指定目录
  .pipe(gulp.dest('./dist'))
  })
```

### 对html进行压缩
- `npm install gulp-htmlmin --save`
- https://github.com/kangax/html-minifier

```javascript
    // 新建一个任务，对html进行压缩
gulp.task('html', function(){
 // 1.匹配到要处理的文件
 gulp.src(['./index.html'])
 // 2.压缩操作
 .pipe(htmlmin({collapseWhitespace:true}))
 // 3.指定输出目录
 .pipe(gulp.dest('./dist'))
})
```

### gulp.watch
- 监视文件的变化，然后执行相应的任务
- gulp.run, 直接执行指定的任务

```javascript
    // gulp.watch 监视文件变化，执行相应任务
  gulp.task('mywatch', function(){
  // 执行指定的任务
  gulp.run('script')
  // 1.监视js文件的变化，然后执行script任务
  // 第一个参数：要监视的文件的规则
  // 第二个参数：是要执行的任务
  gulp.watch(['./app.js','sign.js'],['script'])
})
```
