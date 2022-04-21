import "../styles/globals.css"
import Navbar from "../components/Navbar"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div>
      <SessionProvider session={session}>
        <Navbar></Navbar>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  )
}

export default MyApp
