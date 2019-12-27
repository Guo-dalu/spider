async function bulk(arr, deal, bulkSize) {
  while (arr.length > bulkSize) {
    const current = arr.splice(0, bulkSize)
    await deal(current)
  }
  await deal(arr)
}

export default bulk
