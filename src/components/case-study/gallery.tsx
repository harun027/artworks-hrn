export function Gallery({ images, title }: { images: string[]; title: string }) {
  if (images.length === 0) return null
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((src, i) => (
        <img key={src} src={src} alt={`${title} screenshot ${i + 1}`}
             className="w-full rounded-2xl border border-border" />
      ))}
    </div>
  )
}
