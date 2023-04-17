import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import CalorieCounter from './components/NavBar/CalorieCounter/CalorieCounter';
import DeleteBtn from './components/NavBar/DeleteBtn/DeleteBtn';
import NewEntry from './components/NavBar/NewEntry/NewEntry';

function App() {
  return (
    <div className="App">
      <NavBar />
      <CalorieCounter />
      <DeleteBtn />
      <NewEntry />
    </div>
  );
}

export default App;
