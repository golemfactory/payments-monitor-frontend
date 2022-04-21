import Head from "next/head"
import Image from "next/image"
import React, { useState, useEffect } from "react"

export default function Form() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const registerUser = (event) => {
    event.preventDefault() // don't redirect the page
    fetch("https://api.pmonitor.golem.network/v1/invoice/" + event.target.apikey.value)
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">View Invoices</h2>
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
                    id="apikey"
                    name="apikey"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-golemblue hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  See Invoices
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
          <h1 className="text-xl font-semibold text-gray-900">Invoices</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all Invoices.</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-golemblue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Invoice
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Invoice ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      GLM amount
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Payment Platform
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Invoice Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {data.map((row) => (
                    <tr key={row.invoice_id} className="bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{row.invoice_id}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{row.amount}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{row.payment_platform}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{row.invoice_status}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          View<span className="sr-only">, {row.issuer_id}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
