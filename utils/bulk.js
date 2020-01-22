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
