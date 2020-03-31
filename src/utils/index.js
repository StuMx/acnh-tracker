const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

export const getMonth = (month, hemisphere) => {
  if (hemisphere === "northern") return month;
  const firstHalf = [...months].splice(0, 6);
  const secondHalf = [...months].splice(6);

  if (firstHalf.indexOf(month) !== -1) return secondHalf[firstHalf.indexOf(month)]
  else if (secondHalf.indexOf(month) !== -1) return firstHalf[secondHalf.indexOf(month)]
  return 'N/A';
}