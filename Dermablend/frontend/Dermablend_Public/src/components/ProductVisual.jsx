const sizeMap = {
  thumb: "h-16 w-16 shrink-0 rounded-xl",
  sm: "h-36 w-full rounded-t-2xl",
  lg: "h-52 w-full rounded-t-2xl",
};

export default function ProductVisual({
  image,
  compact = false,
  size,
  name = "Producto",
}) {
  const resolvedSize = size ?? (compact ? "sm" : "lg");
  const boxClass = sizeMap[resolvedSize] ?? sizeMap.lg;

  return (
    <div className={`overflow-hidden bg-gray-100 ${boxClass}`}>
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}