import { providers } from 'ethers'

export default function getWeb3Provider() {
  if (!window.web3Provider) {
    if (!window.ethereum) {
      alert('no web3 provider detected')
      console.error("there is no web3 provider.");
      return null;
    }
    window.web3Provider = new providers.Web3Provider(window.ethereum, 'any')
  }
  return window.web3Provider
}