import Nav from "@components/nav"
import '@styles/globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Promptopia',
    description: 'Discover and Share AI Prompts'
}

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang='en'>
        <body>
            <div className="main">
                <div className="gradient" />
            </div>
            <div className="app">
                <Nav />
                {children}
            </div>
        </body>
    </html>
  )
}
