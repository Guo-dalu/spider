import { asyncFn, createIncArr } from './mocks'

// const queues = [() => asyncFn(1, 500), () => asyncFn(3, 200), () => asyncFn(9, 1500), () => asyncFn(0)]

// const p = Promise.resolve()

// async function loop() {
//   await queues.reduce((prev, fn) => prev.then(fn), p)
//   await loop()
// }

// loop()


/**
 * @params list {Array} - 要迭代的数组
 * @params limit {Number} - 并发数量控制数
 * @params asyncHandle {Function} - 对`list`的每一个项的处理函数，参数为当前处理项，必须 return 一个Promise来确定是否继续进行迭代
 * @return {Promise} - 返回一个 Promise 值来确认所有数据是否迭代完成
 */

async function mapLimit(list, limit, asyncHandle) {
  const result = []
  function recursion(arr) {
    return asyncHandle(arr.shift())
      .then((v) => {
        result.push(v)
        if (arr.length !== 0) {
          return recursion(arr)
        }
        return result
      })
  }

  const listCopy = [].concat(list)
  const asyncList = []

  while (limit--) {
    asyncList.push(recursion(listCopy))
  }

  const final = await Promise.all(asyncList)
  return final[0]
}

mapLimit(createIncArr(5), 2, asyncFn)


// const arr = [asyncFn(1, 500), asyncFn(3, 200), asyncFn(9, 1500), asyncFn(0)]
