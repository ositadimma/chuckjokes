import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import HomepageBody from './components/HomepageBody';
import Footer from './components/Footer';

function App() {
  const [searchSingleJoke, setSearchSingleJoke] = useState(false);
  const [loadJokeFromSearch, setLoadJokeFromSearch] = useState(null);
  const [dropdown, setdropdown] = useState(false);
  const [newSearch, setNewSearch] = useState(false);


  const handleSearch= (data)=>{
    setNewSearch(data)
  }
  
  const newToggleJokes= (data)=>{
    console.log(data)
    setSearchSingleJoke(true)
    setLoadJokeFromSearch(data)
    setdropdown(true)
  }
  return (
    <div className="App">
      <Navbar/>
      <Header toggle={newToggleJokes} dropdown={dropdown} handleSearch={handleSearch}/>
      <HomepageBody newSearch={newSearch} newJoke={loadJokeFromSearch}/>
      <Footer/>
    </div>
  );
}

export default App;
