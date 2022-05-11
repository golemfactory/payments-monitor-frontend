import Head from "next/head"
import Navbar from "../../components/Navbar"
import { useEffect, useState, useRef } from "react"
import { Fragment } from "react"
import { Transition, Dialog } from "@headlessui/react"
import { signIn } from "next-auth/react"

function Page({}) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState({ password: null, email: null, username: null })

  const cancelButtonRef = useRef(null)
  const signup = async (event) => {
    event.preventDefault() // don't redirect the page
    let url = process.env.NEXT_PUBLIC_API_BASE + "auth/register"

    const create_user = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value,
        password2: event.target.password2.value,
        email: event.target.email.value,
      }),
    })

    if (create_user.status == 201) {
      const returned_data = await create_user.json()
      const status = await signIn("credentials", {
        redirect: true,
        callbackUrl: "/dashboard",
        username: event.target.username.value,
        password: event.target.password.value,
      })
    }
    if (create_user.status == 400) {
      const returned_data = await create_user.json()
      setError(returned_data)
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
            <h1 className="text-3xl mb-4 font-bold">Sign Up to the Payment Monitor</h1>
            <form className="space-y-6" onSubmit={signup}>
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
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
              <div>
                <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                  Repeat Password
                </label>
                <div className="mt-1">
                  <input
                    id="password2"
                    name="password2"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {error.username ? (
                <div>
                  <p className="inline-block font-bold">Username</p>{" "}
                  {Object.entries(error.username).map(([key, value], i) => (
                    <p className="text-red-500 font-semibold">{value}</p>
                  ))}
                </div>
              ) : null}
              {error.email ? (
                <div>
                  <p className="inline-block font-bold">Email </p>{" "}
                  {Object.entries(error.email).map(([key, value], i) => (
                    <p className="text-red-500 font-semibold">{value}</p>
                  ))}
                </div>
              ) : null}
              {error.password ? (
                <div>
                  <p className="inline-block font-bold">Password </p>{" "}
                  {Object.entries(error.password).map(([key, value], i) => (
                    <p className="text-red-500 font-semibold">{value}</p>
                  ))}
                </div>
              ) : null}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
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

export default Page
