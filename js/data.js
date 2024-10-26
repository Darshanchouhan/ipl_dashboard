import { get_uri } from "./util.mjs";

/* fetching the Global filter data */
export function get_cascading_filter_data() {
  var params = get_uri().search;
  return fetch("get_ipl_team_name?_c=Season&_c=Team&_c=Players&" + params)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

/* fetching the global filter template for
 * rendering to the UI
 */
export function getDropdownTemplate() {
  return fetch("templates/filter_template.html", {
    headers: { "Content-Type": "text/html" },
  })
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      return data;
    });
}

/* fetching the Total run season wise by Team
 * for feeding the Line Charts
 */
export function getTotalRunSeasonWiseByTeam() {
  return fetch("get_total_run_season_wise_by_team")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

/* fetching the Total run season wise by Player
 * for feeding the Line Charts
 */
export function getTotalRunSeasonWiseByPlayer() {
  return fetch("get_total_run_season_wise_by_player")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

/* fetching the Most six season wise by Player
 * for feeding the Bar Charts
 */
export function getMostSixSeasonWiseByPlayer() {
  return fetch("get_most_six_season_wise_by_player")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

/* fetching the Most Trophy won by Team
 * for feeding the Pie Charts
 */
export function getMostIPLTrophyByTeam() {
  return fetch("get_most_ipl_trophy_won")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}
