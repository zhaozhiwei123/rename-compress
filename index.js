/*
 * @description: 
 * @Author: 赵志伟
 * @Date: 2022-07-29 18:13:59
 */
const BuildPageRename = require('rename-compress')
const a = new BuildPageRename('dist/a', 'mydist', {
  compress: true
})
a.rename()