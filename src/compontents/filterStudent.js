import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Alert, Form } from "react-bootstrap";

// pages
import NewChart from "./newchart";
import {
  goToStudentPage,
  toggleSplits,
  sortOrderMoeilijkheidRating,
  sortOrderLeukRating,
  getTheAvrageOfData,
} from "./pizzaSlice";

function StudentFilter() {
  const dispatch = useDispatch();
  const mainDataChart = useSelector((state) => state.mainDataChart);

  const studentList = mainDataChart.getUniqueValues.map((student) => {
    return (
      <div className="student-list" key={student.name} id={student.name}>
        <Link
          className="link_list"
          onClick={() => {
            dispatch(goToStudentPage(student.name));
          }}
          to={`/StudentFilter/${student.name}`}
        >
          <Button> {student.name}</Button>
        </Link>
      </div>
    );
  });
  const handelSplit = (e) => {
    let checkedValue = e.target.checked;
    const targetValue = e.target.value;
    console.log(e.target.value);
    dispatch(
      toggleSplits({ checkedValue: checkedValue, targetValue: targetValue })
    );
  };
  const sortFunctionMoeilijkheidRating = (e) => {
    const sortBy = e.target.value;
    dispatch(sortOrderMoeilijkheidRating(sortBy));
  };
  const sortFunctionLeukRating = (e) => {
    const sortBy = e.target.value;
    dispatch(sortOrderLeukRating(sortBy));
  };
  const filterMoelijkheidAndLeukheid = (
    <div className="checkBoxes">
      <Alert>
        <Form.Check
          aria-label="option 1"
          className="box"
          type="checkbox"
          onChange={handelSplit}
          value={mainDataChart.toggleSplit[0].name}
          checked={mainDataChart.toggleSplit[0].checked}
        />
        MoeilijkheidRating
      </Alert>
      <Alert>
        <Form.Check
          aria-label="option 1"
          className="box"
          type="checkbox"
          onChange={handelSplit}
          value={mainDataChart.toggleSplit[1].name}
          checked={mainDataChart.toggleSplit[1].checked}
        />
        LeukRating
      </Alert>
    </div>
  );

  return (
    <div className="">
      <div className="student-list-wrapper">{studentList}</div>
      <div className="student-list-wrapper-boxes">
        {filterMoelijkheidAndLeukheid}
      </div>

      <div className="sort-list">
        <div className="sort-buttons">
          <Button onClick={sortFunctionMoeilijkheidRating} value="Ascending">
            Ascending
          </Button>
          <Alert style={{ margin: 0 }}> MoeilijkheidRating</Alert>
          <Button onClick={sortFunctionMoeilijkheidRating} value="Descending">
            Descending
          </Button>
        </div>
        <Button onClick={() => dispatch(getTheAvrageOfData())}>
          Defulat Order
        </Button>
        <div className="sort-buttons">
          <Button onClick={sortFunctionLeukRating} value="Ascending">
            Ascending
          </Button>
          <Alert style={{ margin: 0 }}>LeukRating</Alert>
          <Button onClick={sortFunctionLeukRating} value="Descending">
            Descending
          </Button>
        </div>
      </div>

      <NewChart />
    </div>
  );
}
export default StudentFilter;
