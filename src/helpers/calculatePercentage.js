export const calculatePercentage = userScore => {
  const result = Math.round((userScore * 100) / 10);
  return result + '%';
};
