import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Toaster } from "sonner"; // ✅ enable later if needed
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home/Home";
import Jobs from "./components/JobdPage/Jobs";
import Browse from "./components/Browse/Browse";
import Profile from "./components/Browse/Profile";
import JobDescription from "./components/Browse/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import AdminJobs from "./components/AdminJobs/AdminJobs";
import CompanySetup from "./components/admin/CompanySetup";
import PostJob from "./components/AdminJobs/PostJob";
import Applicants from "./components/AdminJobs/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import About from "./components/Home/About";
import TermsOfService from "./components/Home/Terms";
import PrivacyPolicy from "./components/Home/Privacy";
import Contact from "./components/Home/Contact";

const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/about", element: <About /> },
  { path: "/browse", element: <Browse /> },
  { path: "/profile", element: <Profile /> },
    { path: "/contact", element: <Contact /> },

  { path: "/privacy", element: <PrivacyPolicy /> },
  { path: "/terms", element: <TermsOfService /> },
  { path: "/description/:id", element: <JobDescription /> },

  // ✅ Admin routes protected consistently
  { path: "/admin/companies", element: <ProtectedRoute><Companies /></ProtectedRoute> },
  { path: "/admin/companies/create", element: <ProtectedRoute><CompanyCreate /></ProtectedRoute> },
  { path: "/admin/companies/:id", element: <ProtectedRoute><CompanySetup /></ProtectedRoute> },
  { path: "/admin/jobs", element: <ProtectedRoute><AdminJobs /></ProtectedRoute> },
  { path: "/admin/jobs/create", element: <ProtectedRoute><PostJob /></ProtectedRoute> },
  { path: "/admin/jobs/:id/applicants", element: <ProtectedRoute><Applicants /></ProtectedRoute> },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
      {/* ✅ Toaster available globally if you uncomment */}
      {/* <Toaster richColors position="top-center" /> */}
    </>
  );
}

export default App;
