import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import MainLayout from "./components/MainLayout";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AllCategory from "./components/AllCategory";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Blogs from "./components/Blogs";
import ServiceDetail from "./components/ServiceDetail";
import SignupCust from "./components/customer/SignupCust";
import SignupProf from "./components/professional/SignupProf";
import LoginCust from "./components/customer/LoginCust";
import FAQ from "./pages/FAQ";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);

  console.log("USER Details", user);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Layout />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/allcategory" element={<AllCategory />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/blogs" element={Blogs} />
          <Route path="/AllCategory" element={<AllCategory />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route
            path="/signupCust"
            element={<SignupCust setUser={setUser} />}
          />
          <Route path="/loginCust" element={<LoginCust setUser={setUser} />} />
          <Route path="/signupProf" element={<SignupProf />} />
          <Route path="/faq" element={<FAQ />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
