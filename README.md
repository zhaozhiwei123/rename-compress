基于node对webpack插件

1. 描述：文件重命名以及对文件进行压缩封装的

2. 使用方式：
    - const BuildPageRename = require('rename-compress')
    - new BuildPageRename('dist', 'myDist', {
    -    compress: true
    - })

