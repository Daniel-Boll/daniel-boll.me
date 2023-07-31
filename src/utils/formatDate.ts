export default function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
  }).format(date);
}
