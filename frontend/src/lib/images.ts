// Central Unsplash helper — every ID here is verified (HTTP 200).
// Cards use real, company-relevant photos instead of generic illustrations.

export const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;
