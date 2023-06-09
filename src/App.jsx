import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import { Inbox } from './pages/Inbox'
import { Spam } from './pages/Spam'
import { Starred } from './pages/Starred'
import { Trash } from './pages/Trash'
import { AboutMail } from './pages/AboutMail'

function App() {
  return (
    <div className="App">
      <nav>
        <Navbar />
      </nav>

      <Routes>
        <Route path='/inbox' element={<Inbox />} />
        <Route path='/spam' element={<Spam />} />
        <Route path='/starred' element={<Starred />} />
        <Route path='/trash' element={<Trash />} />
        <Route path='/mails/:mailId' element={<AboutMail />} />
      </Routes>
    </div>
  );
}

export default App;
