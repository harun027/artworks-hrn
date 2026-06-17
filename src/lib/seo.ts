export interface SeoArgs { title: string; description?: string; image?: string }

export function seo({ title, description, image }: SeoArgs) {
  const tags = [
    { title },
    { name: 'description', content: description },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    ...(image
      ? [
          { name: 'twitter:image', content: image },
          { property: 'og:image', content: image },
        ]
      : []),
  ]
  // Drop only tags whose `content` is undefined (e.g. missing description/image);
  // tags without a `content` key (like `{ title }`) are always kept.
  return tags.filter((t) => !('content' in t) || t.content !== undefined)
}
