function renderStatus(url) {
  const arr = [
    "/api/list",
    "/api/add",
    "/api/delete",
    "/api/update"
  ];
  return arr.includes(url) ? 200 : 404;
}

module.exports = {
  renderStatus,
};
