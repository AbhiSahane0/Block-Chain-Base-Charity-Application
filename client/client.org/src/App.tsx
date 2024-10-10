import { Routes, Route } from "react-router-dom";
import { Home, Profile, CharityDetail, CreateCharity } from "./pages";
import { Navbar, Sidebar } from "./components";

function App() {
  return (
    <div className="relative sm:8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr10 relative">
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
