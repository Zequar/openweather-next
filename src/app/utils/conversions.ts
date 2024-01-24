// Get the current date and time
const currentDate = new Date();

// Get the time zone offset in hours
const timeZoneOffsetHours = currentDate.getTimezoneOffset() / 60;

// convert Unix time format to 12:34
const epochConverter = (unix: number, offset: number) => {
  const time = new Date((unix + offset) * 1000);
  return String(time.getHours() + timeZoneOffsetHours) + ':' + String(time.getMinutes()).padStart(2, '0');
}

export const getSunHours = ({ sunrise, sunset, timezone_offset }: {sunrise: number, sunset: number, timezone_offset: number}): [string, string] => {
  return ([epochConverter(sunrise, timezone_offset), epochConverter(sunset, timezone_offset)])
}