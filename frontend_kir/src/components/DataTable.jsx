import React, { useMemo } from "react";
import { useState, useRef, useEffect } from "react";
import ReactModal from 'react-modal'
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import { KirsContract } from '../utils';
import moment from 'moment';

const Table = props => {
    const contract = KirsContract()
    const [temp, setTemp] = useState("");

    const handleClose = () => {
        props.setIsOpen(false)
    }

    const handleTidakAktif = async (e) => {
        setTemp("Aktif");
        try {
            const gas = await contract.methods.UpdateKirByNopol(e.target.value, temp, moment().format('DD[/]MM[/]YYYY')).estimateGas()
            const res = await contract.methods.UpdateKirByNopol(e.target.value, temp, moment().format('DD[/]MM[/]YYYY')).send({ from: String(props.account[0]), gas: gas })

            props.getAllKirs();
        } catch (error) {
            console.error(error);
        }
    }

    const handleAktif = async (e) => {
        setTemp("Tidak Aktif");
        try {
            const gas = await contract.methods.UpdateKirByNopol(e.target.value, temp, moment().format('DD[/]MM[/]YYYY')).estimateGas()
            const res = await contract.methods.UpdateKirByNopol(e.target.value, temp, moment().format('DD[/]MM[/]YYYY')).send({ from: String(props.account[0]), gas: gas })

            props.getAllKirs();
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteKIR = async (e) => {
        try {
            const res = await contract.methods.RemoveKirByNopol(e.target.value).send({ from: String(props.account[0]) })

            props.getAllKirs();
        } catch (error) {
            console.error(error);
        }
    }

    const columns = [
        {
            name: "ID",
            selector: "id",
            sortable: true,
        },
        {
            name: "NOPOL",
            selector: "NOPOL",
            sortable: true,
        },
        {
            name: "Status",
            selector: "status",
            sortable: true,
        },
        {
            name: "Cek",
            selector: "cek",
        },
        {
            name: "Checker",
            selector: "checker",
        },
        {
            name: "Buttons",
            button: true,
            width: "25rem",
            cell: row =>
                <>
                    {
                        (row.status == "Aktif") ? <button style={{ marginRight: "10px" }} value={row.NOPOL} className="btn btn-warning" onClick={handleTidakAktif}>Tidak Aktif</button> : <button style={{ marginRight: "10px" }} value={row.NOPOL} className='btn btn-warning' onClick={handleAktif}>Aktif</button>
                    }
                    <button className='btn btn-danger' value={row.NOPOL} onClick={handleDeleteKIR}>
                        Delete KIR
                    </button>
                </>
        }
    ];

    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );
    // const filteredItems = data.filter(
    //   item => item.name && item.name.includes(filterText)
    // );
    const filteredItems = props.data.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <FilterComponent
                onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <ReactModal isOpen={props.isOpen}>
            <button className='btn btn-success' onClick={handleClose}>Close</button>
            <DataTable
                title="Database KIRs Code"
                columns={columns}
                data={filteredItems}
                defaultSortField="name"
                striped
                pagination
                subHeader
                subHeaderComponent={subHeaderComponent}
            />
        </ReactModal>
    );
};

export default Table;
