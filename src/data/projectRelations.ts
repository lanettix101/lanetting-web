import { portfolioData, type Project } from './portfolioData';
import { servicesData, type ServiceItem } from './servicesData';

export function getSortedProjects(): Project[] {
  return [...portfolioData].sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  if (!slug) return undefined;
  return portfolioData.find((p) => p.slug === slug);
}

export function getServiceById(id: number): ServiceItem | undefined {
  return servicesData.find((s) => s.id === id);
}

export function getServiceIdsForProject(slug: string): number[] {
  return getProjectBySlug(slug)?.relatedServices ?? [];
}

export function getProjectsForService(serviceId: number): Project[] {
  return getSortedProjects().filter((p) => p.relatedServices.includes(serviceId));
}
