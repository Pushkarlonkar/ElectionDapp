import React ,{ useEffect,useState} from 'react';
import Electionabi from './contracts/Election.json';
import Web3 from "web3";
import Navbar from './components/Navbar';
import Table from './components/Table';

function App() {
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, [])

  const [currentAccount, setcurrentAccount] = useState("");
  const [loader, setloader] = useState(true);
  const [electionsm, setElectionsm] = useState();
  const [candidate1, setCandidate1] = useState();
  const [candidate2, setCandidate2] = useState();

  const voteCandidate = async (candidateID) => {
    setloader(true);
    console.log(electionsm);
    console.log(candidateID);
    await electionsm.methods.Vote(candidateID).send({ from: currentAccount }).on('transactionhash', () => {
      console.log("successfully ran");
    });

    setloader(false);
  }
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected . You should consider trying metamask!"
      );
    }
  };  
  const loadBlockchaindata = async () => {
    setloader(true);
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setcurrentAccount(account);
    const networkId = await web3.eth.net.getId();
    //console.log(networkId);
    const networkData = await Electionabi.networks[networkId];
    //console.log(networkData);
    if (networkData) {
      const election = new web3.eth.Contract(Electionabi.abi, networkData.address);
      const candidate1 = await election.methods.candidates(1).call();
      const candidate2 = await election.methods.candidates(2).call();
      //console.log(candidate1);
      setCandidate1(candidate1);
      setCandidate2(candidate2);
      //console.log(candidate2);
      setElectionsm(election);
      //console.log(Electionabi);
      setloader(false);
    } else {
      window.alert("smart contract is not deployed to current network")
    }
  }
  if (loader) {
    return <div>Loading ...</div>
  }
  return (
    <div className="App">
      
      <Navbar address={currentAccount} />
      <div className="container">
        <Table candidate1={candidate1} candidate2={candidate2} voteCandidate={ voteCandidate} address={currentAccount}/>

      </div>
    </div>
  );
}

export default App;
