import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import ListingPage1 from './pages/ListingPage1';
import ListingPage2 from './pages/ListingPage2';
import ListingPage3 from './pages/ListingPage3';
import { userDataContext } from './context/UserContext';
import MyListing from './pages/MyListing';
import ViewCard from './pages/ViewCard';
import EditCard from './pages/EditCard';
import Start from './pages/Start';
import Loading from './pages/Loading';
import MyBooking from './pages/MyBooking';
import Payment from './pages/Payment';
import FailurePage from './pages/failure';
import Success from './pages/success';
import ShowCase from './pages/ShowCase';

const App = () => {
  const {userData,setUserdata}=useContext(userDataContext) 
  return (
    <>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/listingpage1"
          element={userData != null ? <ListingPage1 /> : <Login />}
        />
        <Route
          path="/listingpage2"
          element={userData != null ? <ListingPage2 /> : <Login />}
        />
        <Route
          path="/listingpage3"
          element={userData != null ? <ListingPage3 /> : <Login />}
        />

        <Route
          path="/mylistings"
          element={userData != null ? <MyListing /> : <Loading />}
        />
        <Route
          path="/view/:id"
          element={userData != null ? <ViewCard /> : <Loading />}
        />
        <Route
          path="/edit-listing/:id"
          element={userData != null ? <EditCard /> : <Login />}
        />
        <Route path="/start" element={<Start />} />
        <Route path="/mybookings" element={<MyBooking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/failure" element={<FailurePage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/showcase" element={<ShowCase />} />
      </Routes>
    </>
  );
}

export default App
