import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import MainLayout from "./components/MainLayout";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AllCategory from "./components/AllCategory";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Blogs from "./components/Blogs";
import SignupCust from "./components/customer/SignupCust";
import SignupProf from "./components/professional/SignupProf";
import FAQ from "./pages/FAQ";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Layout />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/AllCategory" element={<AllCategory />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/signupCust" element={<SignupCust />} />
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
