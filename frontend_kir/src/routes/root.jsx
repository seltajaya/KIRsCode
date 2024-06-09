export default function Root() {
    return (
        <>
            <nav className="navbar navbar-expand-lg border-bottom shadow p-4">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold fs-4" href="#">
                        <img src={'image/kemenhub.png'} className='img-fluid mx-3' alt="Logo Kemenhub RI" width={25}/>
                        KIRs Code
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link mx-3 fw-semibold" href="#">HOME</a>
                            <a className="nav-link mx-3 fw-semibold" href={`/generate`}>GENERATE QR</a>
                            <a className="nav-link mx-3 fw-semibold" href={`/scan`}>SCAN QR</a>
                        </div>
                    </div>
                </div>
            </nav>
            <header className='mt-5'>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                        <img src={'image/qrcode.png'} alt="QR Code Homepage Background" width={'500'}/>
                        </div>
                        <div className="col-md-6">
                        <h1 className="display-6">Selamat Datang di KIRs Code!</h1>
                        <p className="desc fs-5 fw-normal">Barcode Sertifikasi Kelayanan Kendaraan</p>
                        {/* button */}
                        <a href="{`/generate`}" className="btn btn-dark">Generate QR</a>
                        <a href="#" className="btn btn-primary mx-2">Scan QR Sekarang!</a>

                        <p className="fs-6 mt-3">
                            Powered by <img src={'image/kemenhub.png'} alt="Logo Kemenhub" width={'25'}/> Kementrian Perhubungan Republik Indonesia 
                        </p>
                        </div>
                    </div>
                </div>
            </header>

            <main className='mt-5'>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-6">
                            <p className="text-center display-5 fw-semibold mb-4">APA ITU KIR?</p>
                            <p className="fs-5 fw-light text-justify mb-3">KIR merupakan pengujian kendaraan bermotor khususnya bagi kendaraan pengangkut barang dan penumpang. Pengujian ini dilakukan untuk mengetahui apakah kendaraan tersebut layak jalan atau tidak. Secara umum pengujian KIR merupakan kewenangan Dinas Perhubungan dan diwajibkan bagi kendaraan berpelat kuning. Pengujian ini dilakukan secara berkala yaitu setiap 6 bulan sekali. KIR sendiri diatur dalam Peraturan Pemerintah Kementerian Perhubungan (Pasal 48-55, UU LLAJ no. 22 Tahun 2009)</p>
                        </div>
                        <div className="col-md-6">
                            <h1 className="display-5 fw-semibold text-center mb-4">
                                CARA KIR DIGITAL
                            </h1>
                            <div className="my-3">
                                <img src="" alt="Tata Cara KIR Digital" />
                            </div>
                            <div className="desc my-3">
                                <p className="fs-5 fw-light text-justify ">Tata Cara melakukan KIR Digital</p>
                                <ol className="fs-5 fw-light">
                                    <li>Uji Kelayakan Kendaraan Anda,</li>
                                    <li>Setelah divalidasi oleh petugas, Lanjut mencetak KIRs Code atau KIR Digital,</li>
                                    <li>Setelah itu pindai KIRs Code atau KIR digitalnya,</li>
                                    <li>Jika KIRs Anda masih aktif, maka tahapan selesai.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </main>
            <div className="copyright bg-light border-top shadow p-3">
                <div className="text-center">
                @2023 | Kelompok 1 - Pengembangan Aplikasi Blockchain
                </div>
            </div>
        </>
    );
  }