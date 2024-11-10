import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"; // Tuodaan myös DialogTitle
import { useState } from "react";

export default function EditCar() {
    // states
    const [open, setOpen] = useState(false); // Dialogin avaaminen/sulkeminen
    const [car, setCar] = useState({
        brand: '', model: '', color: '', fuel: '', modelYear: '', price: ''
    });

   

    // functions
    const handleSave = () => {
        // Tallenna muokkaukset
        // Lisää tallennustoiminnallisuus täällä
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
