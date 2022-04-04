import { Contract } from "ethers"
import ABI from "../contract/ABI"
import ADDRESS from "../contract/ADDRESS"
import getWeb3Provider from "./getWeb3Provider"

export default function getContract() {
  let __contract = null
  if (!window.__contract) {
    __contract = new Contract(ADDRESS, ABI, getWeb3Provider().getSigner())
    window.__contract = __contract
  }
  return window.__contract
}