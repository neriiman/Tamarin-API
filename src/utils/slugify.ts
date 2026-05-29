export const createChallengeSlug = (title: string, createdAt: string) => {
  const year = new Date(createdAt).getFullYear();
  const slugTitle = title
    .toLowerCase()
    .trim()
    .replace(/[a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${year} - ${slugTitle}`;
};
