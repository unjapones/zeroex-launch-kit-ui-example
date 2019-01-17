import { HttpClient } from '@0x/connect';

const DEFAULT_RELAYER_URL = 'http://localhost:3001/api/v2'

const getRelayerClient = (url: string = DEFAULT_RELAYER_URL) : HttpClient => {
  return new HttpClient(url)
}

export { getRelayerClient }
