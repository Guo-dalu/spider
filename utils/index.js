import { createIncArr, asyncFn } from './mocks'
import { limitRequests } from './bulk'


async function foo() {
  const res = await limitRequests(createIncArr(8), asyncFn, 3)
  console.log(res, '----------')
}

foo()
