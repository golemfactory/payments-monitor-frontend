import Head from "next/head"
import Image from "next/image"
import React, { useState, useEffect } from "react"
import { signIn, getCsrfToken } from "next-auth/react"

export default function Form() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const registerUser = (event) => {
    event.preventDefault() // don't redirect the page
    fetch("https://api.pmonitor.golem.network/v1/payment/" + event.target.apikey.value)
      .then((r) => r.json())

      .then((data) => {
        setData(data)
        setLoading(false)

        // var svg = document.getElementById("SVG")
        // console.log(svg)
        // var bbox = svg.getBBox()
        // var viewBox = [bbox.x, bbox.y, bbox.width, bbox.height].join(" ")
        // svg.setAttribute("viewBox", viewBox)
        // prompt("Copy to clipboard: Ctrl+C, Enter", svg.outerHTML)
      })
  }

  if (isLoading) return <p>Loading...</p>
  if (!data)
    return (
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Requestor Portal</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">Back to dashboard</p>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={registerUser}>
              <div>
                <label htmlFor="apikey" className="block text-sm font-medium text-gray-700">
                  Project API Key
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  See Payments
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Payments</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all payments.</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Payment
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
