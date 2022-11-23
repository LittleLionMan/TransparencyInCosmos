import { useAccount, useConnect, useDisconnect, mainnetChains } from "graz";
import { selectChain } from "../../pages/chain/chainSlide";
import { useSelector } from "react-redux";
import keplr from '../../data/pics/62dbc9b6b14448026c65c7fe_Keplr_256.png';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Badge from 'react-bootstrap/Badge';

export function Wallet() {
  const chain = useSelector(selectChain);
  const { connect } = useConnect();
  const { data: account, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  console.log(mainnetChains[chain]);

  console.log(account);
  function handleConnect() {
    return isConnected ? disconnect() : connect(mainnetChains[chain]);
  }

  return (
    <div style={{marginRight: '2em'}}>
      <Badge pill bg={isConnected ? "success" : "danger"}>
      {isConnected ? "\u2713" : "X"}</Badge>
      <OverlayTrigger
          placement='bottom'
          overlay={
            <Tooltip id={`tooltip`}>
              {account ? `${account.bech32Address}` : ""}
            </Tooltip>
          }
        >
          <Image 
          src={keplr}
          style={{height: '2em'}}
          onClick={handleConnect}
          />
        </OverlayTrigger>
      
    </div>
  );
}