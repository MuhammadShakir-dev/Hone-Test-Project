export default function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`text-[20px] font-semibold leading-[30px] text-ink ${className}`}>
      {children}
    </h2>
  );
}
