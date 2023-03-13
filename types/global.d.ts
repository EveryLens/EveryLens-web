import { Eip1193Provider } from 'ethers'
import { EventEmitter } from 'stream'


declare global {
  interface Window {
    ethereum: Eip1193Provider | undefined
  }
}
