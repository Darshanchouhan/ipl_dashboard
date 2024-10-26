import { get_uri } from "./util.mjs";

export function transformDropdownData(data) {
  var cur_url = get_uri().searchKey;
  let seasonData = {
      id: "seasonDropdown",
      title: "Season",
      options: [],
      selected_val: cur_url["Season"] || "All Seasons",
    },
    teamData = {
      id: "teamDropdown",
      title: "Team",
      options: [],
      selected_val: cur_url["Team"] || "All Teams",
    },
    playerData = {
      id: "playerDropdown",
      title: "Player",
      options: [],
      selected_val: cur_url["Players"] || "All Players",
    };
  seasonData["options"].push({ val: "All Seasons" });
  _.each(data["Season"], function (val) {
    seasonData["options"].push({ val: val["Season"] });
  });
  teamData["options"].push({ val: "All Teams" });
  _.each(data["Team"], function (val) {
    teamData["options"].push({ val: val["Team"] });
  });
  playerData["options"].push({ val: "All Players" });
  _.each(data["Players"], function (val) {
    playerData["options"].push({ val: val["Players"] });
  });
  return { seasonData, teamData, playerData };
}
