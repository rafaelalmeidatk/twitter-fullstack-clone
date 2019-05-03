import {
  format,
  distanceInWordsStrict,
  differenceInHours,
  isSameYear,
} from 'date-fns';

export function getRelativeTweetTime(date) {
  const parsedIntDate = parseInt(date, 10);

  if (!isSameYear(Date.now(), parsedIntDate)) {
    return format(parsedIntDate, 'D MMM YYYY');
  } else if (Math.abs(differenceInHours(Date.now(), parsedIntDate)) > 23) {
    return format(parsedIntDate, 'MMM D');
  } else {
    return distanceInWordsStrict(Date.now(), parsedIntDate)
      .replace(' seconds', 's')
      .replace(' minutes', 'm')
      .replace(' hours', 'h');
  }
}

export function getTweetTime(date) {
  const parsedIntDate = parseInt(date, 10);
  return format(parsedIntDate, 'H:mm A - D MMM YYYY');
}
