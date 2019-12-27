import request from 'superagent'
import addCharset from 'superagent-charset'

addCharset(request)

export default request
