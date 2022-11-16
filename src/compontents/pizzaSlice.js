import { createSlice } from "@reduxjs/toolkit";
import data from "../chart-data/chart-data.json";
const fixedNamingOfData = data.map((avg, index) => {
  return {
    name: avg["Wie ben je?"],
    opdracht: avg["Welke opdracht of welk project lever je nu in?"],
    moeilijkheidRating: parseInt(avg["Hoe moeilijk vond je deze opdracht?"]),
    leukRating: parseInt(avg["Hoe leuk vond je deze opdracht?"]),
    id: index,
    checked: true,
  };
});

const initialState = {
  dataChart: fixedNamingOfData,
  dataChartAvrage: [],
  toggleSplit: [
    {
      name: "moeilijkheidRating",
      checked: true,
    },
    { name: "leukRating", checked: true },
  ],
  getUniqueValues: [],
  getUniqueOpdracht: [],
};
export const pizzaSlice = createSlice({
  name: "Chart",
  initialState,
  reducers: {
    assignmentRatingAverageWithLabels1: (state) => {
      const assignmentRatingAverageWithLabels = state.dataChart.map((avg) => ({
        ...avg,
        opdracht:
          avg.opdracht.length > 10
            ? `${avg.opdracht.split(" ")[0]} End\n`
            : avg.opdracht,
      }));
      state.dataChart = assignmentRatingAverageWithLabels;
    },
    getUniqueValues: (state, action) => {
      const key = action.payload;
      const getUniqueValues = [
        ...new Map(state.dataChart.map((item) => [item[key], item])).values(),
      ];
      key === "name"
        ? (state.getUniqueValues = getUniqueValues)
        : (state.getUniqueOpdracht = getUniqueValues);
    },
    getTheAvrageOfData: (state) => {
      function getTheAvrageFunc(opdracht, moeilijkheidRating) {
        const filterTrueValues = state.dataChart.filter(
          (student) => student.checked === true
        );
        const getAvrage = filterTrueValues.filter(
          (student) => student.opdracht === opdracht
        );
        const getValue = getAvrage.map((student) =>
          moeilijkheidRating === "moeilijkheidRating"
            ? student.moeilijkheidRating
            : student.leukRating
        );
        const theSumOfAll = getValue.reduce((a, b) => a + b, 0);
        const getAvragesOf = theSumOfAll / getValue.length;
        return getAvragesOf;
      }
      const finalResult = state.getUniqueOpdracht.map((student) => {
        return {
          ...student,
          name: "avrage",
          moeilijkheidRating: getTheAvrageFunc(
            student.opdracht,
            "moeilijkheidRating"
          ),
          leukRating: getTheAvrageFunc(student.opdracht, "leukRating"),
          checked: student.checked,
        };
      });
      state.dataChartAvrage = finalResult;
    },

    goToStudentPage: (state, action) => {
      const filterStudent = state.dataChart.filter(
        (student) => student.name === action.payload
      );
      state.dataChartAvrage = filterStudent;
    },
    toggleSplits: (state, action) => {
      state.toggleSplit.map((data) => {
        if (action.payload.targetValue === data.name) {
          data.checked = action.payload.checkedValue;
        }
        return data;
      });
    },
    studentCheckBoxes: (state, action) => {
      const newArray = state.dataChart.map((data) => {
        if (action.payload.targetValue === data.name) {
          data.checked = action.payload.checkedValue;
        }
        return data;
      });
      state.dataChart = newArray;
    },
    labelArray: (state) => {
      const dataWithLabel = state.dataChartAvrage.map((avg) => {
        return {
          ...avg,
          label: `Assignment: ${avg.opdracht}\n DifficultyRating: ${
            state.toggleSplit[0].checked
              ? avg.moeilijkheidRating.toFixed(1)
              : "disabeld"
          }\xa0\xa0\n EnjoymentRating: ${
            state.toggleSplit[1].checked
              ? avg.leukRating.toFixed(1)
              : "disabeld"
          }\xa0\xa0\n `,
        };
      });
      const dataWithLabel1 = state.dataChart.map((avg) => {
        return {
          ...avg,
          label: `Assignment: ${avg.opdracht}\n DifficultyRating: ${
            state.toggleSplit[0].checked
              ? avg.moeilijkheidRating.toFixed(1)
              : "disabeld"
          }\xa0\xa0\n EnjoymentRating: ${
            state.toggleSplit[1].checked
              ? avg.leukRating.toFixed(1)
              : "disabeld"
          }\xa0\xa0\n`,
        };
      });
      state.dataChart = dataWithLabel1;
      state.dataChartAvrage = dataWithLabel;
    },
    sortOrderMoeilijkheidRating: (state, action) => {
      state.dataChartAvrage.sort((a, b) => {
        if (action.payload === "Ascending") {
          return (
            a.moeilijkheidRating - b.moeilijkheidRating ||
            a.leukRating - b.leukRating
          );
        } else if (action.payload === "Descending") {
          return (
            b.moeilijkheidRating - a.moeilijkheidRating ||
            b.leukRating - a.leukRating
          );
        }
        return;
      });
    },
    sortOrderLeukRating: (state, action) => {
      state.dataChartAvrage.sort((a, b) => {
        if (action.payload === "Ascending") {
          return (
            a.leukRating - b.leukRating ||
            a.moeilijkheidRating - b.moeilijkheidRating
          );
        } else if (action.payload === "Descending") {
          return (
            b.leukRating - a.leukRating ||
            b.moeilijkheidRating - a.moeilijkheidRating
          );
        }
        return;
      });
    },
    SelectAll: (state) => {
      state.dataChart.map((student) => (student.checked = true));
    },
  },
});
export const {
  assignmentRatingAverageWithLabels1,
  getUniqueValues,
  getTheAvrageOfData,
  goToStudentPage,
  toggleSplits,
  studentCheckBoxes,
  labelArray,
  sortOrderMoeilijkheidRating,
  sortOrderLeukRating,
  SelectAll,
} = pizzaSlice.actions;
export default pizzaSlice.reducer;
