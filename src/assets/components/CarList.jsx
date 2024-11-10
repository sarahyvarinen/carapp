import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import { Button, Snackbar } from "@mui/material";
import AddCar from "./AddCar.jsx";
import EditCar from "./EditCar.jsx";

export default function CarList() {

    // Tilamuuttuja autoille
    const [cars, setCars] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msg, setMsg] = useState("");

    // ag-grid taulukon sarakkeet 
    const [colDefs, setColDefs] = useState([
        { field: 'brand' },
        { field: 'model' },
        { field: 'color' },
        { field: 'fuel' },
        { field: 'modelYear' },
        { field: 'price' },
        {
            cellRenderer: (params) => <EditCar params={params} />
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

    const deleteCar = (params) => {
        fetch(params.data._links.car.href, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setOpenSnackbar(true);
                    setMsg("Delete complete");
                    getCars();
                } else {
                    setOpenSnackbar(true);
                    setMsg("Delete failed");
                }
            })
            .catch(() => {
                setOpenSnackbar(true);
                setMsg("An error occurred");
            });
    };

    // Hae autot backendistä
    const getCars = () => {
        fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars')
            .then(response => response.json())
            .then(data => {
                setCars(data._embedded.cars);
            })
            .catch(() => {
                setOpenSnackbar(true);
                setMsg("Failed to fetch cars");
            });
    };

    useEffect(() => getCars(), []);

    // Näytä autot nettisivulla
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
