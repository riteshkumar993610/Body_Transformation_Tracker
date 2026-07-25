import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from "react-router-dom";

import Home from "./pages/Home";
import FoodName from "./pages/FoodName";
import Activity from "./pages/Exercise";
import Profile from "./pages/Profile";

import BottomNav from "./components/BottomNav";


function Layout() {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>

          {/* Home Page */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Food Page */}
          <Route
            path="/food"
            element={<FoodName />}
          />

          {/* Activity / Exercise Page */}
          <Route
            path="/activity"
            element={<Activity />}
          />

          {/* Profile Page */}
          <Route
            path="/profile"
            element={<Profile />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;