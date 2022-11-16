import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Alert } from "react-bootstrap";

import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryLine,
  VictoryGroup,
  VictoryVoronoiContainer,
} from "victory";
import {
  assignmentRatingAverageWithLabels1,
  getUniqueValues,
  getTheAvrageOfData,
  studentCheckBoxes,
  labelArray,
  SelectAll,
} from "./pizzaSlice";

export default function NewChart() {
  const { id } = useParams();

  const mainDataChart = useSelector((state) => state.mainDataChart);

  const dispatch = useDispatch();

  const assignmentRatingAverageWithLabels = mainDataChart.dataChartAvrage;

  useEffect(() => {
    dispatch(assignmentRatingAverageWithLabels1());
    dispatch(getUniqueValues("opdracht"));
    dispatch(getTheAvrageOfData());
    dispatch(labelArray());
  }, []);

  useEffect(() => {
    dispatch(getUniqueValues("name"));
  }, [mainDataChart.dataChart]);

  const handleChange = (e) => {
    let checkedValue = e.target.checked;
    const targetValue = e.target.value;
    console.log(e.target.value);
    dispatch(
      studentCheckBoxes({
        checkedValue: checkedValue,
        targetValue: targetValue,
      })
    );
    dispatch(getTheAvrageOfData());
    dispatch(labelArray());
  };
  const checkBoxes = mainDataChart.getUniqueValues.map((student, _index) => {
    return (
      <div className="checkBoxe" key={student.name}>
        <Alert>
          <Form.Check
            // style={{ width: "2rem", height: "10rem" }}
            aria-label="option 1"
            className="box"
            type="checkbox"
            onChange={handleChange}
            value={student.name}
            checked={student.checked}
          />
          {student.name}
        </Alert>
      </div>
    );
  });

  return (
    <>
      <VictoryChart domainPadding={10} width={1000} height={200}>
        <VictoryAxis
          style={{
            axis: { stroke: "black" },
            axisLabel: { fontSize: 20, padding: 30 },
            ticks: { stroke: "rgba(0, 0, 255, 0.405)", size: 20 },
            tickLabels: {
              fontSize: 10,
              padding: 0,
              angle: -75,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickValues={[1, 2, 3, 4, 5]}
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 20, padding: 30 },
            ticks: { stroke: "rgba(68, 116, 16, 0.703)", size: 10 },
            tickLabels: { fontSize: 15, padding: 6 },
          }}
        />

        <VictoryGroup>
          {mainDataChart.toggleSplit[0].checked && (
            <VictoryBar
              labelComponent={<VictoryTooltip />}
              style={{ data: { fill: "#c43a31" } }}
              alignment="end"
              data={assignmentRatingAverageWithLabels}
              x="opdracht"
              y="moeilijkheidRating"
            />
          )}

          {mainDataChart.toggleSplit[1].checked && (
            <VictoryBar
              labelComponent={<VictoryTooltip />}
              style={{ data: { fill: "blue" } }}
              alignment="start"
              data={assignmentRatingAverageWithLabels}
              x="opdracht"
              y="leukRating"
            />
          )}
          {/* )} */}
        </VictoryGroup>
      </VictoryChart>
      {!id && (
        <div className="student-checkbox-wrapper">
          {checkBoxes}
          <Button
            onClick={() => {
              dispatch(SelectAll());
              dispatch(getTheAvrageOfData());
              dispatch(labelArray());
            }}
          >
            Select All
          </Button>
        </div>
      )}

      <VictoryChart
        domainPadding={15}
        width={1000}
        height={200}
        containerComponent={
          <VictoryVoronoiContainer labelComponent={<VictoryTooltip />} />
        }
      >
        <VictoryAxis
          dependentAxis
          tickValues={[1, 2, 3, 4, 5]}
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 20, padding: 30 },
            ticks: { stroke: "red", size: 10 },
            tickLabels: { fontSize: 15, padding: 6 },
          }}
        />
        <VictoryAxis
          tickValues={[1, 2, 3, 4, 5]}
          style={{
            axis: { stroke: "black" },
            axisLabel: { fontSize: 20, padding: 30 },
            ticks: { stroke: "blue", size: 20 },
            tickLabels: {
              fontSize: 10,
              padding: 0,
              angle: -75,
            },
          }}
        />
        {mainDataChart.toggleSplit[0].checked && (
          <VictoryLine
            labelComponent={<VictoryTooltip />}
            data={assignmentRatingAverageWithLabels}
            x="opdracht"
            y="moeilijkheidRating"
          />
        )}

        {mainDataChart.toggleSplit[1].checked && (
          <VictoryLine
            style={{
              data: { stroke: "#ff00ff" },
              parent: { border: "1px solid #ccc" },
            }}
            data={assignmentRatingAverageWithLabels}
            labelComponent={<VictoryTooltip />}
            x="opdracht"
            y="leukRating"
          />
        )}
      </VictoryChart>
    </>
  );
}
