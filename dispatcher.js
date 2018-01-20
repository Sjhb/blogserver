const cp = require('child_process')
const util = require('util')
const path = require('path')
const URL = require('url')

const exec = util.promisify(cp.exec)

module.exports = async function (req, res) {
    let handler = URL.parse(req.url).pathname.match(/([^\/]+)/g)[0]
    // hook 钩子
    if (req.method === 'POST' && handler === 'bloghook') {
        try {
            await exec('git pull', {
                cwd: '/home/wh/blog/source'
            })
            await exec('hexo clean', {
                cwd: '/home/wh/blog'
            })
            await exec('hexo generate', {
                cwd: '/home/wh/blog'
            })
            await exec('hexo deploy', {
                cwd: '/home/wh/blog'
            })
            res.end('博客发布成功')
        } catch (err) {
            res.end('博客发布出错')
        }
    }
}