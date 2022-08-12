
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import NotFound from './Components/NotFound/NotFound';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';

function App() {
  let navigate = useNavigate()
  const [UserData, setUserData] = useState(null)
  function GetUserData() {

   let Decode = jwtDecode(localStorage.getItem('userToken'))
   setUserData(Decode)
   
  
  }
  useEffect(() => {
    if (  localStorage.getItem('userToken')) {
     GetUserData();
    }
   }, [])
   
 
  useEffect(() => {
    console.log(UserData)
  }, [UserData])
  function ProtectedRoute({children}) {
    if ( !localStorage.getItem('userToken')) {
      return <Navigate to='/Login'/> 
    }
    else
    {
  return children
    }
  }
//   let navigate = useNavigate()

//   const [UserData, setUserData] = useState(null)
//   function GetUserData() {
//     let Decoded =  jwtDecode(localStorage.getItem('userToken'))
//     setUserData(Decoded)
     
//    }
   
//    useEffect(() => {
//     if (  localStorage.getItem('userToken')) {
//      GetUserData();
//     }
//    }, [])
//  function ProtectedRoute({children}) {
//   if ( !localStorage.getItem('userToken')) {
//     return <Navigate to='/Login'/> 
//   }
//   else
//   {
// return children
//   }
  
//  }
//  useEffect(() => {
//   console.log(UserData)
//  }, [UserData] )
  return (
    <div className="App">
     <Navbar/>
     <Routes>
     <Route path='/' element={ <ProtectedRoute>  <Login GetUserData={GetUserData} /></ProtectedRoute>     } />
        <Route path='register' element={ <ProtectedRoute> <Register/> </ProtectedRoute>    } />

        <Route path='login' element={  <ProtectedRoute>   <Login GetUserData={GetUserData} />  </ProtectedRoute>  } />
        <Route path='Home' element={  <ProtectedRoute> <Home />  </ProtectedRoute>   } />
        <Route path='*' element={ <ProtectedRoute>  <NotFound/>  </ProtectedRoute> } />

      

             </Routes>
              {/* <Home/> */}
   
   
   
    </div>
  );
}

export default App;
