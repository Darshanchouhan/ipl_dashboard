export function renderGlobalDropdown(res2, dropdownData, config) {
  let renderTeamTemplate = _.template(res2)({
    fltr: dropdownData[config.dataKey],
  });
  document.getElementsByClassName(config.containerClass)[0].innerHTML =
    renderTeamTemplate;
  $("#" + config.elementId).selectpicker("destroy");
  $("#" + config.elementId).selectpicker();
  console.log("End of RGD");
}
