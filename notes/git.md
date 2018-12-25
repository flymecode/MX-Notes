<!-- GFM-TOC -->

* [一、什么是Git](#什么是Git)

* [二、分支](#分支)

<!-- GFM-TOC -->

## 什么是Git?
  - Git是一款源代码管理工具(版本控制工具)
    - 我们写的代码需要使用Git进行管理。
  - 源代码有必要管理起吗？
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
- `git branch -b dev `
    - 创建dev分支并且切换到该分支

### 切换分支
- `git checkout dev`
    + 切换到指定的分支,这里的切换到名为dev的分支
    + `git branch` 可以查看当前有哪些分支


### 合并分支
- `git merge dev`
    + 合并分支内容,把当前分支与指定的分支(dev),进行合并
    + 当前分支指的是`git branch`命令输出的前面有*号的分支
- 合并时如果有冲突，需要手动去处理，处理后还需要再提交一次.
- `git merge --no-ff dev`
    - 加上`--no-ff`参数就可以用普通模式合并，合并之后的历史有分支，能看出来曾经做过合并，而`fast forward`合并，就看不出曾经合并过。

### 查看分支

- `git branch -v`

### 删除分支

- 先切换到主干分支 `git checkout master`
- 删除分支`git branch -d [分支名称]`

### 撤销修改

- 当你发现乱改了工作区的某个文件的内容，想直接丢弃工作区的修改的时候可以直接使用

  `git checkout  -- file` 

- 当你不但乱改了工作区的文件，而且已经添加到暂存区，想丢弃修改分为两步，第一使用命令

  `git reset HEAD <file>`回到场景一，然后再按照场景一的步骤进行。

- 如果你已经把文件提交到版本库，那么你只能通过版本回退，来撤销，但是你会丢失最近的一次提交。

- 当你使用 `git rm` 命令删除一个文件的时候，也可以通过以上方法进行回退。

### BUG分支

- 当我们遇到bug的时候我们会新建一个临时分支，来进行修复`bug，`然后合并分支，最后将临时分支删除。
- 但是当我这出来`dev`分支下的时候想要创建一个修复`bug`的临时分支，但是现在的`dev`分支上的内容还没有完成，不能够提交，我们可以使用`git stash` 来保存工作现场。
- `git stash apply` 恢复工作现场,但是stash 中的内容并不删除。你可以使用`git stash drop`来删除
- `git stash pop`恢复的同时也把stash中的内容也删除了。

### Feature分支

- 软件开发中总是遇到很多新的功能要不断的添加进来。为了不把主分支搞乱，我们需要新建一个feature分支，然后在上面开发，合并，最后，删除该feature分支。

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


## ssh方式上传代码
- 公钥 私钥,两者之间是有关联的。
- 生成公钥,和私钥
    + `ssh-keygen -t rsa -C "xiaoming@sina.com"`

## 在push和pull操作进
- 先pull , 再push
- 当我们在push时，加上-u参数，那么在下一次push时
  我们只需要写上`git push`就能上传我们的代码。(加上-u之后，git会把
  当前分支与远程的指定的分支进行关联。git push origin master)

### 分支策略

- 首先在`master`分支应该是最稳定的，也就是仅用来发布最新的版本，平时不能在上面干活；
- 那么我们在那里开发呢，开发都在`dev` 分支上，也就是说`dev`分支是最不稳定的。到某个时间点，比如1.0版本发布的时候，再把dev分支合并到`master`分支上，在`master`分支上发布1.0版本

