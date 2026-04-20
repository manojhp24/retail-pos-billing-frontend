export const formatDateTime = (value) => {
  if (!value) return "";

  const date = new Date(value);

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0") +
    " " +
    String(hours).padStart(2, "0") +
    ":" +
    minutes +
    ":" +
    seconds +
    " " +
    ampm
  );
};
