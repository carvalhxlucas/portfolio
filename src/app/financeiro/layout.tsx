export default function FinanceiroLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#06060f] text-slate-100 font-sans">
      {children}
    </div>
  )
}
