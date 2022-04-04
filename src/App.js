import './App.css';
import ethers, { Contract } from 'ethers'
import getWeb3Provider from './helpers/getWeb3Provider';
import { useEffect, useRef, useState } from 'react';
import ADDRESS from './contract/ADDRESS';
import ABI from './contract/ABI';
import getContract from './helpers/getContract';


function App() {
  const web3Provider = getWeb3Provider()
  const [info, setInfo] = useState({})

  const getInfo = async () => {
    if (!web3Provider) {
      return {}
    }
    // 获取当前连接的账户地址:
    const account = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    // 获取当前连接的链ID:
    let chainId = await window.ethereum.request({
      method: 'eth_chainId'
    });

    setInfo({
      account, chainId
    })
  }

  useEffect(() => {
    getInfo()
  }, [])

  const [input, setInput] = useState('')
  const [remoteValue, setRemoteValue] = useState('')
  const contract = useRef(getContract())
  useEffect(() => {
    contract.current.retrieve()
      .then(res => {
        setRemoteValue(res.toString())
      })
      .catch(err => {
        console.error('❌ || get remote value error', err);
      })
  }, [])

  const handleSet = () => {
    contract.current.store(input)
      .then(tx => {
        tx.wait(1)
          .then(success => {
            console.log('🚧 || res', success, tx);
          })
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <p> Your Account: {info.account} {info.chainId} </p>
        <p> currentValue: {remoteValue} </p>
        <p>
          <input value={input} onChange={e => setInput(e.target.value)} />
          <button onClick={handleSet}>Set</button>
        </p>
      </header>
    </div>
  );
}

export default App;
