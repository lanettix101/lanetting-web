let projectDetail: Promise<void> | null = null;
let portfolio: Promise<void> | null = null;

export function preloadProjectDetail() {
  projectDetail ??= import('../pages/ProjectDetail').then(() => {});
  return projectDetail;
}

export function preloadPortfolio() {
  portfolio ??= import('../pages/Portfolio').then(() => {});
  return portfolio;
}
