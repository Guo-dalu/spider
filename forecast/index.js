import request from 'superagent'

const typeMap = ['wave', 'tides', 'wind', 'weather']

async function fetchForecast({
  spotId = '584204204e65fad6a7709179',
  days = 6,
  intervalHours = 1,
  maxHeights = false,
  type = 'wave',
} = {}) {
  const { body } = await request.get(
    `https://services.surfline.com/kbyg/spots/forecasts/${type}`,
    {
      spotId,
      days,
      intervalHours,
      maxHeights,
    }
  )
  console.log(body)
}

fetchForecast({ type: typeMap[3] })
