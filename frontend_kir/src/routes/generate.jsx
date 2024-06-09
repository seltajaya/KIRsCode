import { useState, useRef, useEffect } from "react";
import React from 'react'
import { QRCodeCanvas } from "qrcode.react";
import { KirsContract } from '../utils';
import Web3 from 'web3';
import moment from 'moment';
import Table from "../components/DataTable";

export default function genreate() {
    const [Kirs, setKirs] = useState([]);
    const contract = KirsContract();
    const [isLoading, setIsLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState([]);
    const [balance, setBalance] = useState(0);
    const [temp, setTemp] = useState("");
    const [tableIsOpen, setTableIsOpen] = useState(false)

    useEffect(() => {

        document.title = "Kirs Code";
        getConnection()
        getAllKirs()
        setIsLoading(false)
    }, [])

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

    const getAllKirs = async () => {
        try {
            const gas = await contract.methods.getAllKir().estimateGas()
            const res = await contract.methods.getAllKir().call()

            // console.log(res);
            setKirs(res)
        } catch (error) {
            console.error(error);
        }
    }
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

    // const handleDeleteKIR = async (e) => {
    //     try {
    //         const res = await contract.methods.RemoveKirByNopol(e.target.value).send({ from: String(account[0]) })

    //         getAllKirs();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // const handleTidakAktif = async (e) => {
    //     setTemp("Aktif");
    //     try {
    //         const gas = await contract.methods.UpdateKirByNopol(e.target.value, temp, moment().format('DD[/]MM[/]YYYY')).estimateGas()
    //         const res = await contract.methods.UpdateKirByNopol(e.target.value, temp, moment().format('DD[/]MM[/]YYYY')).send({ from: String(account[0]), gas: gas })

    //         getAllKirs();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // const handleAktif = async (e) => {
    //     setTemp("Tidak Aktif");
    //     try {
    //         const gas = await contract.methods.UpdateKirByNopol(e.target.value, temp, moment().format('DD[/]MM[/]YYYY')).estimateGas()
    //         const res = await contract.methods.UpdateKirByNopol(e.target.value, temp, moment().format('DD[/]MM[/]YYYY')).send({ from: String(account[0]), gas: gas })

    //         getAllKirs();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    const QrCode = () => {
        const [url, setUrl] = useState("");
        const [status, setStatus] = useState("Aktif");
        const qrRef = useRef();

        const downloadQRCode = async (e) => {
            e.preventDefault();
            let canvas = qrRef.current.querySelector("canvas");
            let image = canvas.toDataURL("image/png");
            let anchor = document.createElement("a");
            anchor.href = image;
            anchor.download = `qr-code.png`;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
            try {
                const gas = await contract.methods.AddKIR(url, status, moment().format('DD[/]MM[/]YYYY'), String(account[0])).estimateGas();
                const res = await contract.methods.AddKIR(url, status, moment().format('DD[/]MM[/]YYYY'), String(account[0])).send({ from: String(account[0]), gas: gas })
                console.log(res);
                getAllKirs();
            } catch (error) {
                console.error(error);
            }
            setUrl("");
        };
        const qrCodeEncoder = (e) => {
            setUrl(e.target.value);
        };
        const StatusEncoder = (e) => {
            setStatus(e.target.value);
        };

        const qrcode = (
            <QRCodeCanvas
                id="qrCode"
                value={url}
                size={500}
                bgColor={"#ffffff"}
                level={"H"}
                includeMargin={true}
                imageSettings={{
                    src: "image/kemenhub.png",
                    x: undefined,
                    y: undefined,
                    height: 100,
                    width: 90,
                    excavate: true,
                }}
            />
        );
        return (
            < div className="qrcode__container" >
                <div ref={qrRef}>{qrcode}</div>
                <div className="input__group">
                    <form onSubmit={downloadQRCode}>
                        <div className="col-md-4 mx-auto">
                            <label className="form-label mb-3">Masukkan Nomor Kendaraan: </label>
                            <input
                                type="text"
                                className="form-control border-dark mb-4"
                                value={url}
                                onChange={qrCodeEncoder}
                                placeholder="X YYYY ZZZ"
                            />
                            <label for="Status" className="form-label mb-3">Status: </label>
                            <select name="Status" className="form-select border-dark" onChange={StatusEncoder}>
                                <option value="Aktif">Aktif</option>
                                <option value="Tidak Aktif">Tidak aktif</option>
                            </select>
                        </div>
                        <button type="submit" disabled={!url} className="mt-3 mb-5 btn btn-primary">
                            Cetak KirsCode
                        </button>
                    </form>
                </div>

            </ div>
        );
    };

    return (
        <div>
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
            <div className="text-center">
                <button type="submit" onClick={(e) => { setTableIsOpen(true) }} className="mt-3 mb-5 btn btn-primary">
                    Database KIRs Code
                </button>
            </div>
            <Table data={Kirs} account={account} getAllKirs={getAllKirs} isOpen={tableIsOpen} setIsOpen={setTableIsOpen} />
            {/* <div className="container-fluid mt-3">
                <table className="table">
                    <thead>
                        <tr >
                            <th scope="col">ID</th>
                            <th scope="col">Nopol</th>
                            <th scope="col">Status</th>
                            <th scope="col">Cek</th>
                            <th scope="col">Checker</th>
                            <th scope='col'>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            Kirs.map((val, id) => {
                                if (val.NOPOL == "") {
                                    return (
                                        <><h1>kosong</h1></>
                                    )
                                }
                                return (
                                    <tr key={id}>
                                        <th scope="row">{id + 1}</th>
                                        <td>{val.NOPOL}</td>
                                        <td>{val.status}</td>
                                        <td>{val.cek}</td>
                                        <td>{val.checker}</td>
                                        <td>
                                            {
                                                (val.status == "Aktif") ? <button style={{ marginRight: "10px" }} value={val.NOPOL} className="btn btn-warning" onClick={handleTidakAktif}>Tidak Aktif</button> : <button style={{ marginRight: "10px" }} value={val.NOPOL} className='btn btn-warning' onClick={handleAktif}>Aktif</button>
                                            }
                                            <button className='btn btn-danger' value={val.NOPOL} onClick={handleDeleteKIR}>
                                                Delete KIR
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div> */}
            <div className="text-center mt-5">
                <h1 class="mb-1">GENERATE QR</h1>
                <QrCode />
            </div>


            <div className="copyright bg-light border-top shadow p-3">
                <div className="text-center">
                    @2023 | Kelompok 1 - Pengembangan Aplikasi Blockchain
                </div>
            </div>
        </div>
    );
}