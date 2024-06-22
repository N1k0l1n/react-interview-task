import Jobsite from "./components/Jobs/Jobsite/Jobsite";
import JobDetails from "./components/Jobs/JobDetails/JobDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Jobsite />} />
          <Route path="/jobdetails/:jobName" element={<JobDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
