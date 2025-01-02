import { SeasonSwitcher } from "../components/season-switcher"
import { SeasonsContainer } from "../components/seasons/seasons-container"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SeasonSwitcher />
        <SeasonsContainer />
        {children}
      </body>
    </html>
  )
} 