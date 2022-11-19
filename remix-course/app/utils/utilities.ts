// utilities.ts
export type LinkType = {
  rel: string;
  href: string;
};

export function returnLinksHRef(hrefCSS: string = '') {
  const linkList: Array<LinkType> = [
    {
      rel: 'stylesheet',
      href: hrefCSS,
    },
  ];

  return linkList;
}
