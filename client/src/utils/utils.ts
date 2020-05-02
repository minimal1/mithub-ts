/** @format */
const MONTH = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const getTimestamp = (date: Date) =>
  MONTH[date.getMonth()] + " " + date.getDate();

export const calcTimestamp = (createdAt: string) => {
  const createdDate = new Date(createdAt);
  const now = new Date();

  const difference = new Date(now.getTime() - createdDate.getTime());
  const secondsInMs = Math.floor(difference.getTime() / 1000);
  const minutesInMs = Math.floor(secondsInMs / 60);
  const hoursInMs = Math.floor(minutesInMs / 60);
  const days = Math.floor(hoursInMs / 24);
  const seconds = secondsInMs % 60;
  const minutes = minutesInMs % 60;
  const hours = hoursInMs % 24;

  if (days > 29 || (days === 29 && hours > now.getHours()))
    return "on " + getTimestamp(createdDate);
  if (days > 1) return (hours > now.getHours() ? days + 1 : days) + " days ago";
  if (days > 0) return hours > now.getHours() ? "2 days ago" : "yesterdar";
  if (hours > 1)
    return (minutes > now.getMinutes() ? hours + 1 : hours) + " hours ago";
  if (hours > 0)
    return minutes > now.getMinutes() ? "2 hours ago" : "1 hour ago";
  if (minutes > 1)
    return (
      (seconds > now.getSeconds() ? minutes + 1 : minutes) + " minutes ago"
    );
  if (minutes > 0)
    return seconds > now.getSeconds() ? "2 minutes agoe" : "1 minute ago";
  if (seconds > 1) return seconds + " seconds ago";
  if (seconds > 0) return seconds + " second ago";
  return "now";
};
