export const extractPatterns = (input: string): string[] => {
  if (!input) return [];
  const pattern = /P\d+/g;
  const matches = input.match(pattern);
  return matches ? matches : [];
};
