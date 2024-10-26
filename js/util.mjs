export function get_uri() {
  return g1.url.parse(location.href);
}

export function update_uri(uri_dict) {
  // Simply update the uri
  var uri = g1.url.parse(location.href).update(uri_dict);
  history.pushState({}, "", "?" + uri.search);
  return uri;
}

export function updateSelectedOptionToURL(urlKey, key, value) {
  let defaultValue = {
    seasonData: "All Seasons",
    teamData: "All Teams",
    playerData: "All Players",
  };
  update_uri({
    [urlKey]: value != defaultValue[key] ? value : null,
  });
}
