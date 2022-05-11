import Head from "next/head"
import Navbar from "../../components/Navbar"
import { useEffect, useState, useRef } from "react"
import Router from "next/router"

import { signIn } from "next-auth/react"

export default function Page({}) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)

  const cancelButtonRef = useRef(null)
  const login = async (event) => {
    event.preventDefault() // don't redirect the page
    const status = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/dashboard",
      username: event.target.username.value,
      password: event.target.password.value,
    })
    if (!status.error) {
      Router.push("/dashboard")
    }
    if (status.error) {
      setError(true)
    }
  }
  return (
    <>
      <Head>
        <title>Golem Network</title>
        <meta name="google-site-verification" content="7TO2YTmVfu0A5AgihId9CSnSrQjFgHxAkZ-k_zIH18g" />
      </Head>

      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4 mt-10 mb-4">
          <div className="col-span-6 col-start-4 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h1 className="text-3xl mb-4 font-bold">Login to the Payment Monitor</h1>
            <form className="space-y-6" onSubmit={login}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {error ? (
                <div>
                  <p className="text-red-500 font-semibold">Username or password didn't match.</p>
                </div>
              ) : null}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API

  // Pass data to the page via props
  return {
    props: {},
  }
}
