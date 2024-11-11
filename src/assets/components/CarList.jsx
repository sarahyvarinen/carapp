import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Snackbar } from "@mui/material";
import AddCar from "./AddCar.jsx";
import EditCar from "./EditCar.jsx";

export default function CarList() {

    const [cars, setCars] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msg, setMsg] = useState("");

    const [colDefs, setColDefs] = useState([
        { field: 'brand' },
        { field: 'model' },
        { field: 'color' },
        { field: 'fuel' },
        { field: 'modelYear' },
        { field: 'price' },
        {
            cellRenderer: (params) =>
                <EditCar params={params} updateCar={updateCar} getCars={getCars} />
        },
        {
            cellRenderer: (params) =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteCar(params)}
                >Delete</Button>
        }
    ]);

    // Funktio auton poistamiseen
    const deleteCar = (params) => {
        fetch(params.data._links.car.href, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setOpenSnackbar(true);
                    setMsg("Poisto onnistui");
                    getCars();
                } else {
                    setOpenSnackbar(true);
                    setMsg("Poisto epäonnistui");
                }
            })
            .catch(() => {
                setOpenSnackbar(true);
                setMsg("Virhe");
            });
    };

    // Funktio auton päivittämiseen
    const updateCar = (updatedCar, carUrl) => {
        fetch(carUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCar)
        })
        .then(response => {
            if (response.ok) {
                setOpenSnackbar(true);
                setMsg("Päivitys onnistui");
                getCars();
            } else {
                setOpenSnackbar(true);
                setMsg("Päivitys epäonnistui");
            }
        })
        .catch(() => {
            setOpenSnackbar(true);
            setMsg("Virhe tapahtui, yritä uudestaan");
        });
    };

    const getCars = () => {
        fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
            .catch(() => {
                setOpenSnackbar(true);
                setMsg("Autojen haku epäonnistui");
            });
    };

    useEffect(() => getCars(), []);

    return (
        <>
            <AddCar getCars={getCars} />
            <div className="ag-theme-material" style={{ width: 900, height: 400 }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={5}
                />
                <Snackbar
                    open={openSnackbar}
                    message={msg}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                />
            </div>
        </>
    );
}
