export const generateIncremId = (listID: number[]): number => {
  if (listID.length === 0) {
    return 1;
  }

  const maxId = Math.max(...listID);
  return maxId + 1;
};