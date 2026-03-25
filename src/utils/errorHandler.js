export const handleApiError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return "Bad request";
      case 401:
        return "Unauthorized";
      case 404:
        return "Not found";
      case 500:
        return "Server error";
      default:
        return error.response.data?.message || "Error occurred";
    }
  }

  if (error.code === "ERR_NETWORK") {
    return "Cannot connect to server";
  }

  if (error.code === "ECONNABORTED") {
    return "Request timeout";
  }

  return error.message;
};
