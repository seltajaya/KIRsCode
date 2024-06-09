import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import React from 'react';
import ReactDOM from "react-dom/client";
import { KirsContract } from '../utils';
import Web3 from 'web3';
import Html5QrcodePlugin from '../components/Html5QrcodePlugin'

export default function Scan() {
    const contract = KirsContract();
    const [isLoading, setIsLoading] = useState(true)
    const [isConnected, setIsConnected] = useState(false)
    const [account, setAccount] = useState([])
    const [balance, setBalance] = useState(0)
    const [temp, setTemp] = useState([]);
    // let html5QrcodeScanner;

    useEffect(() => {
        document.title = "Kirs Code";
        getConnection()
        setIsLoading(false)
    }, [])

    //scan
    const qrcodeRegionId = "html5qr-code-full-region";
    const [decodedResults, setDecodedResults] = useState([]);
    const onNewScanResult = (decodedText, decodedResult) => {
        // handle decoded results here
        console.log("App [result]", decodedResult);
        setDecodedResults(prev => [...prev, decodedResult]);
    };

    const getConnection = async (e) => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum)
            const accounts = await web3.eth.requestAccounts()
            const ballance = await web3.eth.getBalance(accounts[0])

            setAccount(accounts)
            setBalance(ballance)
            setIsConnected(true)

        } else {
            console.log("no metamask");
        }
    }

    const cekKirs = async (nopol) => {
        try {
            const gas = await contract.methods.getKirByNopol(nopol).estimateGas()
            const res = await contract.methods.getKirByNopol(nopol).call({ from: String(account[0]), gas: gas })
            setTemp(res);
            // setTemp([
            //     ...temp,
            //     { id: res.id, NOPOL: res.NOPOL, status: res.status, cek: res.cek }
            // ]);
        } catch (error) {
            console.error(error);
        }
    }



    //result
    function filterResults(results) {
        let filteredResults = [];
        for (var i = 0; i < results.length; ++i) {
            if (i === 0) {
                filteredResults.push(results[i]);
                continue;
            }

            if (results[i].decodedText !== results[i - 1].decodedText) {
                filteredResults.push(results[i]);
            }
        }
        return filteredResults;
    }

    const ResultContainerTable = ({ data }) => {
        const results = filterResults(data);
        return (
            <div className="container mt-5">
                <table className="table">
                    <thead className='table-primary'>
                        <tr>
                            {/* <td style={{ color: 'white' }}>#</td> */}
                            <td>#</td>
                            <td>Decoded Text</td>
                            <td>Status</td>
                            <td>Cek</td>
                            <td>Format</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            results.map((result, i) => {
                                console.log(result);
                                cekKirs(result.decodedText)
                                return (
                                    <tr key={i}>
                                        <td>{i}</td>
                                        <td>{result.decodedText}</td>
                                        <td>{temp.status}</td>
                                        <td>{temp.cek}</td>
                                        <td>{result.result.format.formatName}</td>
                                    </tr>);
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    };

    const ResultContainerPlugin = (props) => {
        const results = filterResults(props.results);
        return (
            <div className='Result-container'>
                <div className='Result-header'>Scanned results ({results.length})</div>
                <div className='Result-section'>
                    <ResultContainerTable data={results} />
                </div>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="container">
                <div className="row justify-content-center mt-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg border-bottom shadow p-4">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold fs-4" href="#">
                        <img src={'image/kemenhub.png'} className='img-fluid mx-3' alt="Logo Kemenhub RI" width={25} />
                        KIRs Code
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link mx-3 fw-semibold" href={`/`}>HOME</a>
                            <a className="nav-link mx-3 fw-semibold" href={`/generate`}>GENERATE QR</a>
                            <a className="nav-link mx-3 fw-semibold" href={`/scan`}>SCAN QR</a>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='text-center mt-5 mb-5'>
                <h1>SCAN KIRS CODE </h1>
                {/* <h1>{JSON.stringify(temp)}</h1> */}
            </div>
            <div id={qrcodeRegionId} className='container' />
            <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
            />
            <div className="container">
                <ResultContainerPlugin results={decodedResults} />
            </div>
            <div className="text-center">
                <a href={'/scan'}>
                    <button type="button" className='btn btn-primary'>Scan Ulang?</button>
                </a>
            </div>
            <div className="container-fluid mb-100"></div>
            <script src="html5-qrcode.min.js"></script>
            <div className="copyright bg-light border-top shadow p-3" style={{ position: 'fixed', bottom: 0, width: '100%', textAlign: 'center' }}>
                <div className="text-center">
                    @2023 | Kelompok 1 - Pengembangan Aplikasi Blockchain
                </div>
            </div>
        </>
    );
}