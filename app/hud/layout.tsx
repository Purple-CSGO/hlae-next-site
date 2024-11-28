export default function HudLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className="flex flex-col items-center justify-center min-h-screen gap-20 py-8 mx-auto">{children}</main>
}
