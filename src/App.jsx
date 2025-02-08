import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddNewTaskForm from './components/AddNewTaskForm';
import Stats from './components/Stats';
import Header from './components/Header';
import ConnectionStatus from './components/ConnectionStatus';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <ConnectionStatus />
        <nav className="nav-links">
          <Link to="/">Lista</Link>
          <Link to="/add">Dodaj</Link>
          <Link to="/stats">Statystyki</Link>
        </nav>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddNewTaskForm />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


