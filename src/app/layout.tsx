export const metadata = {
  title: 'AI Code Reviewer',
  description: 'AI 기반 코드 리뷰 시스템',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
