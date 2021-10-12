import { HashRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        {/* <Route exact path="/" component={WFWorldState}/> */}
        {/* <Route path="/PoE" component={PlainsOfEidelon}/> */}
        {/* <Route path="/OV" component={OrbVallis}/> */}
        {/* <Route path="/CD" component={CambionDrift}/> */}
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
