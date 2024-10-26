// What to do ??
// Global dropdown
// Need to built three dropdown
// 1) Season dropdown
// 2) Team dropdown
// 3) Player dropdown

// For Season dropdown What to do
// I need data
// Only after data I render the html

// import { chSelectPicker } from "/../node_modules/ch-select-picker/src/js/index.js";
// import { SelectBuilder } from "/../node_modules/ch-select-picker/src/js/SelectBuilder.js";
// import { SelectBehavior } from "/../node_modules/ch-select-picker/src/js/SelectBehavior.js";

import {
  get_cascading_filter_data,
  getDropdownTemplate,
  getTotalRunSeasonWiseByTeam,
  getTotalRunSeasonWiseByPlayer,
  getMostSixSeasonWiseByPlayer,
  getMostIPLTrophyByTeam,
} from "./data.js";
import { transformDropdownData } from "./transform.js";
import { renderGlobalDropdown } from "./render.js";
import { allDropDownConfig } from "./config.js";
import { teamNameShort } from "./config.js";
import { updateSelectedOptionToURL } from "./util.mjs";
import { createLineChart } from "./charts/lineChart.js";
import { createBarChart } from "./charts/barChart.js";
import { createPieChart } from "./charts/pieChart.js";

function globalDropDownMain() {
  Promise.all([get_cascading_filter_data(), getDropdownTemplate()]).then(
    ([res1, res2]) => {
      // Rendering all the global dropdowns
      let dropdownData = transformDropdownData(res1);
      console.log("End of Promise");
      _.each(allDropDownConfig, function (config) {
        renderGlobalDropdown(res2, dropdownData, config);
        document
          .getElementById(config.elementId)
          .addEventListener("change", function (event) {
            let selectedVal = event.currentTarget.value;
            updateSelectedOptionToURL(
              config.columnName,
              config.dataKey,
              selectedVal,
            );
            globalDropDownMain();
          });
      });
    },
  );
}

function lineChartMain() {
  Promise.all([
    getTotalRunSeasonWiseByTeam(),
    getTotalRunSeasonWiseByPlayer(),
  ]).then(([res1, res2]) => {
    createLineChart("#lineChartPlayerWise", res1);
    createLineChart("#lineChartTeamWise", res2);
  });
}

function barChartMain() {
  Promise.all([getMostSixSeasonWiseByPlayer()]).then(([res1]) => {
    createBarChart("#barChartMostSixesByPlayer", res1);
  });
}

function pieChartMain() {
  Promise.all([getMostIPLTrophyByTeam()]).then(([res1]) => {
    createPieChart("#pieChartMostIPLTrophyWon", res1, teamNameShort);
  });
}

globalDropDownMain();
lineChartMain();
barChartMain();
pieChartMain();
