import { useState } from 'react';
import './App.css';
import CarList from './assets/components/CarList';
import AddCar from './assets/components/AddCar'; // Lisää tämä rivi

function App() {
  const [cars, setCars] = useState([]); // Autotilaksi lista

  // Funktio auton lisäämiseksi
  const addCar = (newCar) => {
    setCars([...cars, newCar]); // Lisää uusi auto listaan
  };

  return (
    <>
      <h1>Car Shop</h1>
      <AddCar addCar={addCar} /> 
      <CarList cars={cars} /> 
    </>
  );
}

export default App;
