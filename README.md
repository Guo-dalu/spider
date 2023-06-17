## Spider Writing in Nodejs

This is a Node.js project that I created to scrape books, music, articles, weather forecasts, and other resources for my personal use. For making requests, I'm using the `superagent` library. To access content on dynamically generated websites, I've implemented `puppeteer` as a headless browser. All of the content that is scraped by the spider will be downloaded and saved to local folders using the `fs` module of Node.js.

Due to the concurrency limits in Node.js, we cannot simply use `Promise.all()` to process all the requests at one time. So I created a separated utils files called `bulk.js` to deal with the batching process, including the *chunking* method and *max concurrency* method. For example, here's the code of controlling the max amount of concurrency and proccess the batch requesting(or other async functions).

```js
/**
 * Controlling maximum concurrency, faster than using await Promise.all() to chunks.
 * Similar to queuing up to buy tickets. 3 ticket windows in total, and 10 people are waiting in
 * line. When a window is available, the next person in line goes to the empty window.
 *
 * @param {*} urls a set of request URLs.
 * @param {*} handler an asynchronous method, such as fetch().
 * @param {*} limit the maximum concurrency limit.
 */
export async function limitRequests(urls, handler, limit) {
  const result = []

  const thenHandler = (res, index) => {
    result.push(res)
    return index
  }

  // initial promises, with maximum concurrcy(limit)
  const promises = urls.slice(0, limit)
    .map((url, index) => handler(url).then(res => thenHandler(res, index)))


  async function loop() {
    return urls.slice(limit).reduce(
      (prev, url) => prev.then((index) => {
        promises[index] = handler(url).then(res => thenHandler(res, index))
        return Promise.race(promises)
      }),
      Promise.race(promises)
    )
  }

  await loop()
  return result
}
```

You can change code in `entry.js` and `package.json > script` to switch spider type. The spider script is concise and small code segment assorted according to the type and resources. For example, in `5sing` folder, you can find spider to download music in 5sing.com(an original music website, hot in young people in China).

---

nodejs 爬虫项目

这是一个 nodejs 爬虫项目，用于爬取网络小说、音乐和其他网络资源。使用`superagent`作为请求库，对动态加载的网页，使用`puppeteer`模拟浏览器环境。

项目主要就是自己用的，有时候朋友有需求会帮着写个脚本下东西。因为一般就是跑个脚本把资源爬下来，所以根据数据来源和类型分了多个文件夹，统一用`entry.js`作为入口，在`package.json`中的`script`字段里加个`node entry.js`就可以运行了。刚开始构想的比较宏大，还做了`node-schedule`和视图层，后来没有服务器了，就作罢了。现在就是爬虫脚本汇总，写的各种爬虫都放在这个仓库下以便下次用的时候找出来用。。。

路过的盆友如果有什么喜欢的网络资源可以提 Issue~~作者也喜欢的话，会写爬虫的。

仅供自用，非商业用途。
