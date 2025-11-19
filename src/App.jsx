import { BrowserRouter, Routes, Route } from 'react-router'

//? Componentes de la aplicacion
import Home from './Home'
import SignIn from './log/SignIn'
import SignUp from './log/SignUp'
import NotFound from './NotFound'
import Maintenance from './Maintenance'
import ClientHome from './client/ClientHome'
import AboutUs from './client/AboutUs'
import StudentApplication from './client/StudentApplication'
import ApplicationStatus from './client/ApplicationStatus'
import UserManagement from './admin/UserManagement'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <Home /> } />
        <Route path='/log/sign-in' element={ <SignIn /> } />
        <Route path='/log/sign-up' element={ <SignUp /> } />
        <Route path='/client/home' element={ <ClientHome /> } />
        <Route path='/client/about' element={ <AboutUs /> } />
        <Route path='/client/apply' element={ <StudentApplication /> } />
        <Route path='/client/status' element={ <ApplicationStatus /> } />
        <Route path='/admin/users' element={ <UserManagement /> } />
        {/* <Route path='/admin/home' element={ <Home /> } /> */}
        <Route path='/maintenance' element={ <Maintenance /> } />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
