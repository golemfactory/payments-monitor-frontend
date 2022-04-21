import Link from "next/link"
import { getToken } from "next-auth/jwt"
import { Fragment } from "react"
import { Transition, Dialog } from "@headlessui/react"
import React, { useState, useEffect, useRef } from "react"

function Page({ data }) {
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-12 grid grid-cols-12 bg-white shadow p-4 mb-4 rounded-lg"></div>
        <div className="col-span-12 text-center grid grid-cols-12 ">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Agreement ID
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  GLM spent
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((row) => (
                <tr key={row.agreement_id} className="bg-gray-50">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{row.agreement_id}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{row.amount_paid}</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <Link
                      href={{
                        pathname: `/agreement/` + row.agreement_id,
                      }}
                    >
                      <a className="text-indigo-600 hover:text-indigo-900">
                        View<span className="sr-only">, </span>
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
            <div className="flex  min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="relative inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left  shadow-xl transform transition-all sm:my-8  w-3/4">
                  <div>
                    <div className=" text-center ">
                      <h1 className="text-2xl font-semibold">Start SSH connection </h1>
                    </div>
                  </div>
                  <div className="grid grid-cols-12">
                    <div className="h-full overflow-y-auto bg-white p-8 col-span-12">
                      <div className="space-y-6 ">
                        <div>
                          <div className="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg"></div>
                          <div className="mt-4 flex items-start justify-between"></div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Information</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-1 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps(ctx) {
  // Fetch data from external API
  const res = await fetch(`https://api.pmonitor.golem.network/v1/agreement/296d483f-68c7-4811-9421-580cbba74095`)
  const data = await res.json()
  const token = await getToken(ctx)
  if (token) {
    // Signed in
    console.log("Found token")
    return {
      props: {
        data: data,
      },
    }
  }

  // Pass data to the page via props
}

export default Page
