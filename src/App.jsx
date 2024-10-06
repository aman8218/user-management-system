import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserDetailPage from './pages/userDetailPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/user/:id" element={<UserDetailPage />} />
      </Routes>
    </Router>
  )
}

export default App
