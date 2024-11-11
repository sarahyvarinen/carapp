import { Button, DialogActions, DialogContent, DialogTitle, TextField, Dialog } from "@mui/material";
import { useState } from "react";

export default function AddCar({ getCars }) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '', model: '', color: '', fuel: '', modelYear: '', price: ''
    });

  

    // Funktio auton lisäämiseksi
    const handleSave = () => {
        fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car)
        })
        .then(response => {
            if (response.ok) {
                getCars(); // Päivitä autolista
                setOpen(false); // Sulje dialogi
                setCar({ brand: '', model: '', color: '', fuel: '', modelYear: '', price: '' }); // Tyhjennä kentät
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Add Car</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Brand"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        value={car.brand}
                        onChange={(e) => setCar({ ...car, brand: e.target.value })}
                    />
                    <TextField
                        label="Model"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        value={car.model}
                        onChange={(e) => setCar({ ...car, model: e.target.value })}
                    />
                    <TextField
                        label="Color"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        value={car.color}
                        onChange={(e) => setCar({ ...car, color: e.target.value })}
                    />
                    <TextField
                        label="Fuel"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        value={car.fuel}
                        onChange={(e) => setCar({ ...car, fuel: e.target.value })}
                    />
                    <TextField
                        label="Model Year"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        value={car.modelYear}
                        onChange={(e) => setCar({ ...car, modelYear: e.target.value })}
                    />
                    <TextField
                        label="Price"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        value={car.price}
                        onChange={(e) => setCar({ ...car, price: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
