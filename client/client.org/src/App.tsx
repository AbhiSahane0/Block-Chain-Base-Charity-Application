import { Routes, Route } from "react-router-dom";
import { Home, Profile, CharityDetail, CreateCharity } from "./pages";
import { Navbar, Sidebar } from "./components";

function App() {
  return (
    <div className="relative sm:8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full mar-w-[1280px] mx-auto sm:pr-5">
        Navbar
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
