## Spider Writing in Nodejs

This is a nodejs project aimed to spider some books, music, articles and other resources for myself. Using superagent as request library and `puppeteer` as headless browser api provider.

You can change code in `entry.js` and `package.json > script` to switch spider type. The spider script is concise small code segment assorted according to the type and resources. For example, in `5sing` folder, you can find spider to download music in 5sing.com(an original music website, hot in young people in China).

---

nodejs 爬虫项目

这是一个 nodejs 爬虫项目，用于爬取网络小说、音乐和其他网络资源。使用`superagent`作为请求库，对动态加载的网页，使用`puppeteer`模拟浏览器环境。

项目主要就是自己用的，有时候朋友有需求会帮着写个脚本下东西。因为一般就是跑个脚本把资源爬下来，所以根据数据来源和类型分了多个文件夹，统一用`entry.js`作为入口，在`package.json`中的`script`字段里加个`node entry.js`就可以运行了。刚开始构想的比较宏大，还做了`node-schedule`和视图层，后来没有服务器了，就作罢了。现在就是爬虫脚本汇总，写的各种爬虫都放在这个仓库下以便下次用的时候找出来用。。。

路过的盆友如果有什么喜欢的网络资源可以提 Issue~~作者也喜欢的话，会写爬虫的。

仅供自用，非商业用途。
