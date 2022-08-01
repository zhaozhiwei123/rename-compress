/*
 * @description: 
 * @Author: 赵志伟
 * @Date: 2022-07-29 17:24:54
 */
const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
class BuildPageRename {
  oldName = 'dist'
  newName = ''
  constructor(oldName, newName, config = {}) {
    this.oldName = oldName
    this.newName = newName
    this.config = config
  }

  compress (newpath) {
    console.log(newpath, 777)
    let output = fs.createWriteStream(newpath + '.zip') // 创建⽂件写⼊流
    const archive = archiver('zip', { zlib: { level: 9 } }) // 设置压缩等级
      
    output.on('close', () => {
      console.log('压缩完成！')
    }).on('error', (err) => {
      console.error('压缩失败', err)
    })
    
    archive.pipe(output)
    archive.directory(newpath, false) // 存储⽬标⽂件 
    archive.finalize() // 完成归档
  }
  apply(compiler) {
    // ToDO
    compiler.plugin('afterEmit', (compilation) => {
      // 目标路径
      const goalPath = path.join(process.cwd(), `/${this.oldName}`)
      //  改名之后路径
      const newpath = path.join(process.cwd(), `/${this.newName}`)
      fs.access(goalPath, (err) => {
        if (err) throw err
        fs.rename(goalPath, newpath, (err) => {
          if (err) {
            console.log('重命名失败')
          } else {
            console.log('重命名成功')
            if (this.config.compress) this.compress(newpath)
          }
        })
      })
    })
  }
  rename() {
    const goalPath = path.join(process.cwd(), `/${this.oldName}`)
      //  改名之后路径
    const newpath = path.join(process.cwd(), `/${this.newName}`)
    fs.access(goalPath, (err) => {
      if (err) throw err
      fs.rename(goalPath, newpath, (err) => {
        if (err) {
          console.log('重命名失败')
        } else {
          console.log('重命名成功')
          if (this.config.compress) this.compress(newpath)
        }
      })
    })
  }
}
module.exports = BuildPageRename