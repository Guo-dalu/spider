export const createIncArr = n => Array.from({ length: n }).map((v, index) => index)

export const asyncFn = (msg, timeout = 1000) => new Promise((resolve) => {
  console.log('into asyncfn', msg)
  setTimeout(() => {
    console.log(msg)
    resolve(msg)
  }, timeout)
})
