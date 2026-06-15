export const getServiceAnchorId = (slug: string) => {
  return `service-${slug}`;
};

export const getServiceAnchorHref = (slug: string) => {
  return `/services#${getServiceAnchorId(slug)}`;
};
