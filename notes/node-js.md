### 路径

```
const path = require('path');
// 获取路径的最后一部分
console.log(path.basename("/a/b/c/e.txt",".txt"))
// 当前文件的路径
console.log(__dirname)
// 获取文件路径
console.log(path.dirname('sf/fds/sf.txt/c'))
// 获取扩展名
path.extname("index.html")
console.log(path.parse(__dirname))
```

