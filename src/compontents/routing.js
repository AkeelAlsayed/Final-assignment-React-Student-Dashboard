import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import { getTheAvrageOfData, labelArray } from "./pizzaSlice";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar } from "react-bootstrap";
// pages
import StudentFilter from "./filterStudent";

function RoutingManager() {
  const dispatch = useDispatch();

  return (
    <div className="router-wrapper">
      <Router>
        <Navbar bg="secondary" expand="lg" style={{ padding: "10px" }}>
          <Link
            to="/"
            className="home-nav"
            onClick={() => {
              dispatch(getTheAvrageOfData());
              dispatch(labelArray());
            }}
          >
            <Button>Overview</Button>
          </Link>
        </Navbar>

        <Routes>
          <Route path="/" exact element={<StudentFilter />} />
          <Route path="/StudentFilter/:id" exact element={<StudentFilter />} />
        </Routes>
      </Router>
    </div>
  );
}
export default RoutingManager;
