function getAuthHeader() {
  const token = localStorage.getItem("token");
  const authHearder = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return authHearder;
}

export { getAuthHeader };