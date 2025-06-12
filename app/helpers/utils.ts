import { DateTime } from "luxon";

export function generateTimeOptions(intervalMinutes: number = 30) {
  const options: string[] = [];

  for (let mins = 0; mins < 24 * 60; mins += intervalMinutes) {
    const hours24 = Math.floor(mins / 60);
    const minutes = (mins % 60).toString().padStart(2, "0");

    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    const ampm = hours24 < 12 ? "AM" : "PM";

    options.push(`${hours12}:${minutes} ${ampm}`);
  }

  return options;
}

export function convertTo24Hour(timeStr: string) {
  const [time, modifier] = timeStr.split(" ");

  const parts = time.split(":").map(Number);
  let hours = parts[0];
  const minutes = parts[1];

  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}

// Google Calendar datetime format: YYYYMMDDTHHmmssZ
export function formatDateLuxon(date: DateTime): string {
  return date.toUTC().toFormat("yyyyLLdd'T'HHmmss'Z'");
}

export function formatDateToMonthDayYear(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
