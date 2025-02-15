export const decapitalizer = (
  value: string,
  from: number = 0,
  to: number = value.length
) =>
  `${value.slice(0, from)}${value.slice(from, to).toLowerCase()}${value.slice(
    to
  )}`;

export const capitalizer = (
  value: string,
  from: number = 0,
  to: number = value.length
) =>
  `${value.slice(0, from)}${value.slice(from, to).toUpperCase()}${value.slice(
    to
  )}`;
