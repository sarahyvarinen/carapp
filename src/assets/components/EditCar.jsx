import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function EditCar({ params, updateCar, getCars }) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: params.data.brand,
        model: params.data.model,
        color: params.data.color,
        fuel: params.data.fuel,
        modelYear: params.data.modelYear,
        price: params.data.price
    });

    const handleUpdate = () => {
        updateCar(car, params.data._links.car.href);
        setOpen(false);
    };

    return (
        <>
            <Button size="small" onClick={() => setOpen(true)}>Edit</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit Car</DialogTitle>
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
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpdate}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
