export default function HudLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className="flex flex-col items-center justify-start min-h-screen gap-20 py-24 mx-auto">{children}</main>
}
