import R from 'ramda'

export async function bulk(arr, deal, bulkSize = 2) {
  while (arr.length > bulkSize) {
    const current = arr.splice(0, bulkSize)
    await Promise.all(current.map(item => deal(item)))
  }
  await Promise.all(arr.map(item => deal(item)))
}

/**
 * 批处理异步函数并将返回Promise<resolved>，将每个item的返回追映射在数组中返回，因为不确定items个数有多少，而nodeJS有并发限制，
 * 故不用promise.all，而是逐个迭代
 * Batch processing asynchronous functions and returning an array of resolved promises that map to the return values of each item.
 * Since the number of items is unknown, and there are concurrency limits in Node.js, Promise.all() cannot be used.
 *
 * @param {Array<any>} items
 * @param {async Function} fn
 * @returns {Promise}
 */
export async function series(items, fn, ...args) {
  const result = []
  return items
    .reduce(
      (prev, item) => fn(item, ...args).then(res => result.push(res)),
      Promise.resolve()
    )
    .then(() => result)
}

/**
 * 分块处理异步数组，并返回序列化数组
 * Chunking an asynchronous array and returning a serialized array.
 *
 * @param {Array} items
 * @param {async Function} fn
 * @param {Number} chunkSize
 * @returns {Promise}
 */
export async function chunks(items, fn, chunkSize = 5) {
  const result = []
  const highOrderChunks = R.splitEvery(chunkSize, items)
  const dealBaseChunks = async (baseChunks) => {
    const baseChunkResults = await Promise.all(baseChunks.map(fn))
    result.push(baseChunkResults)
  }
  return series(highOrderChunks, dealBaseChunks).then(() => R.flatten(result))
}

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
