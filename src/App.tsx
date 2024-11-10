import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ProfileProvider } from "./context/ProfileContext";
import Navbar from "./views/Navbar/Navbar";
import { Suspense, lazy } from "react";

// Lazy loading components
const AddEditProfileForm = lazy(() => import("./views/AddProfile/AddEditProfileForm"));
const NoDataFound = lazy(() => import("./views/NoDataFound/NoDataFound"));
const ProfileList = lazy(() => import("./views/ProfileList/ProfileList"));

function App() {
  return (
    <>
      <ProfileProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          icon={false}
        />
        <BrowserRouter>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/profile" replace />} />
              <Route path="/profile" element={<ProfileList />} />
              <Route path="/profile-form" element={<AddEditProfileForm />} />
              <Route path="/404" element={<NoDataFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ProfileProvider>
    </>
  );
}

export default App;
