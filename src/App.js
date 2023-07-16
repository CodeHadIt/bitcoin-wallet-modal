import { useEffect, useState } from 'react';
import './App.css';
import { getAddress } from "sats-connect";
import unisatLogo from "./assets/unisat_logo.png"
import xverseLogo from "./assets/xverse_logo.png"
import hiroLogo from "./assets/hiro_logo.png"

import { RxCross1 } from "react-icons/rx";
import { FaBitcoin } from "react-icons/fa"
import { BsFillShieldLockFill } from "react-icons/bs"

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [address, setAddress] = useState(null);

  useEffect(() =>  {
      if(address) setIsModalOpen(false);
  }, [address]);

  const getUnisatAddress = async () => {
    if (typeof window.unisat !== "undefined") {
      try {
        let accounts = await window.unisat.requestAccounts();
        setAddress(accounts[0]);
      } catch (e) {
        console.log("connect failed");
      }
    } else {
      alert("Please Install Unisat Wallet");
    }
  };
  const getAddressOptions = {
    payload: {
      purposes: ["ordinals", "payment"],
      message: "Address for receiving Ordinals and payments",
      network: {
        type: "Mainnet",
      },
    },
    onFinish: (response) => {
      const addresses = {
        ordinal: response.addresses[0].address,
        payment: response.addresses[1].address,
      };
      //I only want the ordinal address
      setAddress(addresses.ordinal);
    },
    onCancel: () => alert("Request canceled"),
  };

  const getXverseAddress = async () => {
    try {
      await getAddress(getAddressOptions);
    } catch (error) {
      alert(`${error.message}`);
    }
  };

  const getHiroAddress = async () => {
    if (typeof window.btc !== "undefined") {
      try {
        const response = await window.btc?.request("getAddresses");
        const addresses = response.result.addresses;
        const tapRootAddress = addresses.find((address) => address.type === "p2tr");
        setAddress(tapRootAddress.address);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please install Hiro Wallet");
    }
  };

  return (
    <div className="App">
      <div className="App-container">
        <h1>My Bitcoin Dapp</h1>
        <button
          className="connect_button"
          onClick={() => setIsModalOpen(true)}
          disabled={address}
        >
          {address
            ? address.slice(0, 5) +
              "...." +
              address.slice(address.length - 5, address.length)
            : "Connect Wallet"}
        </button>
        {isModalOpen && (
          <div className="modal_backdrop">
            <div className="modal_card">
              <div className="wallets_container">
                <div className="wallet_connect_header">
                  <div className="main_part">
                    <h4>Choose Wallet</h4>
                    <div className="header_icon_container">
                      <RxCross1
                        className="icon"
                        onClick={() => setIsModalOpen(false)}
                      />
                    </div>
                  </div>
                  <p>Please ensure you have the chosen wallet installed</p>
                </div>
                <a className="wallets" onClick={getUnisatAddress}>
                  <div className="wallet_name">
                    <div className="wallet_image_container">
                      <img src={unisatLogo} alt="unisat-logo" />
                    </div>
                    <h4 className="wallet_info">Unisat</h4>
                  </div>
                  <div className="checked_circle">
                    <div className="inner_checked"></div>
                  </div>
                </a>

                <a className="wallets" onClick={getXverseAddress}>
                  <div className="wallet_name">
                    <div className="wallet_image_container">
                      <img src={xverseLogo} alt="xverse-logo" />
                    </div>
                    <h4 className="wallet_info">Xverse</h4>
                  </div>
                  <div className="checked_circle">
                    <div className="inner_checked"></div>
                  </div>
                </a>

                <a className="wallets" onClick={getHiroAddress}>
                  <div className="wallet_name">
                    <div className="wallet_image_container">
                      <img src={hiroLogo} alt="hiro-logo" />
                    </div>
                    <h4 className="wallet_info">Hiro</h4>
                  </div>
                  <div className="checked_circle">
                    <div className="inner_checked"></div>
                  </div>
                </a>
              </div>

              <div className="info_container">
                <div className="info_header">
                  <h4>What is a Bitcoin wallet?</h4>
                  <div className="header_icon_container">
                    <RxCross1
                      className="icon"
                      onClick={() => setIsModalOpen(false)}
                    />
                  </div>
                </div>
                <div className="info_contents">
                  <div className="info_content">
                    <div className="content_icon_container">
                      <FaBitcoin className="icon" />
                    </div>
                    <div className="content_details">
                      <h5>A safe for your Sats and Ordinals</h5>
                      <p>
                        Bitcoin wallets help you store, send, and receive
                        Satoshis and also help you display your Ordinals.
                      </p>
                    </div>
                  </div>

                  <div className="info_content">
                    <div className="content_icon_container">
                      <BsFillShieldLockFill className="icon" />
                    </div>
                    <div className="content_details">
                      <h5>A way to Login to your favourite Apps </h5>
                      <p>
                        Use your wallet to login nstead of creating new accounts
                        and passwords on every website.
                      </p>
                    </div>
                  </div>
                </div>
                <a href="" className="learn_link">
                  Learn more about bitcoin wallets
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
