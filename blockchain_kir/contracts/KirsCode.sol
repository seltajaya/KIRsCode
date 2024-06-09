// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract KirsCode {
    constructor() public {}

    address[16] public user;
    struct KIR {
        string checker;
        uint id;
        string NOPOL;
        string status;
        string cek;
    }

    uint idIncrement = 1;
    KIR[] public dataKIR;

    function AddKIR(
        string memory _NOPOL,
        string memory _status,
        string memory _cek,
        string memory _checker
    ) public returns (string memory) {
        KIR memory tmp;
        // tmp.checker[idIncrement] = msg.sender;
        tmp.id = idIncrement;
        tmp.NOPOL = _NOPOL;
        tmp.status = _status;
        tmp.cek = _cek;
        tmp.checker = _checker;

        dataKIR.push(tmp);
        idIncrement++;

        return "Berhasil disimpan";
    }

    function getAllKir() public view returns (KIR[] memory) {
        return dataKIR;
    }

    function getKirByNopol(
        string memory _NOPOL
    ) public view returns (KIR memory) {
        for (uint i = 0; i <= dataKIR.length - 1; i++) {
            if (
                keccak256(abi.encodePacked(dataKIR[i].NOPOL)) ==
                keccak256(abi.encodePacked(_NOPOL))
            ) {
                return dataKIR[i];
            }
        }
    }

    function deleteKirByNopol(
        string memory _NOPOL
    ) public returns (string memory) {
        for (uint i = 0; i <= dataKIR.length - 1; i++) {
            if (
                keccak256(abi.encodePacked(dataKIR[i].NOPOL)) ==
                keccak256(abi.encodePacked(_NOPOL))
            ) {
                delete dataKIR[i];
                return "data berhasil dihapus";
            }
        }
        return "data tidak ditemukan";
    }

    function getLength() public view returns (uint) {
        return dataKIR.length;
    }

    function RemoveKirByNopol(
        string memory _NOPOL
    ) public returns (string memory) {
        // KIR memory temp = getKirByNopol(_NOPOL);
        uint temp;
        bool get = false;
        // require(_id < dataKIR.length, "index out of bound");
        for (uint i = 0; i <= dataKIR.length - 1; i++) {
            if (
                keccak256(abi.encodePacked(dataKIR[i].NOPOL)) ==
                keccak256(abi.encodePacked(_NOPOL))
            ) {
                temp = i;
                get = true;
            }
        }
        if (get) {
            for (uint x = temp; x < dataKIR.length - 1; x++) {
                dataKIR[x] = dataKIR[x + 1];
            }
            dataKIR.pop();
            return "Data berhasil dihapus";
        } else {
            return "Data tidak ditemukan";
        }
    }

    function UpdateKirByNopol(
        string memory _NOPOL,
        string memory _status,
        string memory _cek
    )
        public
        returns (
            // bool _status
            string memory
        )
    {
        string memory temp = "Aktif";
        for (uint i = 0; i <= dataKIR.length - 1; i++) {
            if (
                keccak256(abi.encodePacked(dataKIR[i].NOPOL)) ==
                keccak256(abi.encodePacked(_NOPOL))
            ) {
                if (
                    keccak256(abi.encodePacked(temp)) ==
                    keccak256(abi.encodePacked(_status))
                ) {
                    dataKIR[i].status = "Aktif";
                } else {
                    dataKIR[i].status = "Tidak Aktif";
                }
                dataKIR[i].cek = _cek;
                return "Data berhasil diupdate";
            }
        }
        return "Data tidak ditemukan";
    }
}
