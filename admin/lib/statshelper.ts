export function percentageHelper(firstCount, lastCount) {
  const ftotal = firstCount.reduce((a, b) => a + b, 0);
  const ltotal = lastCount.reduce((a, b) => a + b, 0);
  const difference = ltotal - ftotal;
  let percentage = (difference * 100) / ftotal;
  if (!isFinite(percentage)) percentage = 0;
  return percentage.toFixed(1).toString();
}
export function arrowsHelper(firstCount, lastCount) {
  const ftotal = firstCount.reduce((a, b) => a + b, 0);
  const ltotal = lastCount.reduce((a, b) => a + b, 0);
  const difference = ltotal - ftotal;
  let percentage = (difference * 100) / ftotal;
  if (!isFinite(percentage)) percentage = 0;
  let arrow = "";
  if (percentage < 0) {
    arrow = "down";
  } else arrow = "up";
  return arrow;
}
export function arrowsColorHelper(firstCount, lastCount) {
  const ftotal = firstCount.reduce((a, b) => a + b, 0);
  const ltotal = lastCount.reduce((a, b) => a + b, 0);
  const difference = ltotal - ftotal;
  let percentage = (difference * 100) / ftotal;
  if (!isFinite(percentage)) percentage = 0;
  let arrowColor = "";
  if (percentage < 0) {
    arrowColor = "text-red-500";
  } else arrowColor = "text-emerald-500";
  return arrowColor;
}
