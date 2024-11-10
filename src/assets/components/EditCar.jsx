import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"; 
import { useState } from "react";

export default function EditCar() {
    // states
    const [open, setOpen] = useState(false); 
    const [car, setCar] = useState({
        brand: '', model: '', color: '', fuel: '', modelYear: '', price: ''
    });

   

    // functions
    const handleSave = () => {
        
        setOpen(false); // Sulje dialogi tallennuksen jälkeen
    };

    // return
    return (
        <>
            <Button onClick={() => setOpen(true)}>Edit car</Button>
            <Dialog open={open} onClose={() => setOpen(false)}> 
                <DialogTitle>Edit Car</DialogTitle>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button> 
                    <Button onClick={() => setOpen(false)}>Close</Button> 
                </DialogActions>
            </Dialog>
        </>
    );
}
