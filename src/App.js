import logo from './logo.svg';
import './App.css';

import Button from './components/Button';
import BandslamTable from './components/BandslamTable';

const Videos = [
  { 
    "artistName": "Rage Against the Machine",
    "cityName": "London",
    "countryName": "United Kingdom",
    "date": "2010-06-06T00:00:00",
    "fanFirstName": null,
    "id": 2,
    "path": "C:\\\\src\\\\0_bd\\\\cs\\\\bandslam\\\\vid",
    "songName": "People of the Sun",
    "venueName": "Finsbury Park",
    "videoName": "06062010064 - RATM - People of the Sun.mp4"
  },
  {
    "artistName": "Vampire Weekend",
    "cityName": "London",
    "countryName": "United Kingdom",
    "date": "2010-12-03T00:00:00",
    "fanFirstName": null,
    "id": 1,
    "path": "C:\\\\src\\\\0_bd\\\\cs\\\\bandslam\\\\vid",
    "songName": "People of the Sun",
    "venueName": "Alexandra Palace",
    "videoName": "03122010140 - Vampire Weekend - A-Punk.mp4"
  }
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <BandslamTable videos = {Videos}/>
          <Button />
        </div>
        
      </header>
    </div>
  );
}

export default App;
