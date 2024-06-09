import KirsABI from "../../../blockchain_kir/build/contracts/KirsCode.json";
import Web3 from "web3";

const KirsContract = () => {
  const web3 = new Web3(window.ethereum);
  const address = "0xe012e8C3102Aeaa7ffbFDb231d9988b1a48fb8F8";
  const contract = new web3.eth.Contract(KirsABI.abi, address);

  return contract;
};

export { KirsContract };
