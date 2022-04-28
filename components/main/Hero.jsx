import { PlusSmIcon, SparklesIcon } from "@heroicons/react/solid"

import WithLineNumbers from "../Code"
import { Fragment, useState, useEffect } from "react"
import Typewriter from "typewriter-effect"
import { useInView } from "react-intersection-observer"
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/outline"
import { XIcon } from "@heroicons/react/solid"

export default function Example() {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  })
  const [foundProviders, setFoundProviders] = useState("")
  const [data, setData] = useState("")
  const fetchProviders = () => {
    fetch("https://api.stats.golem.network/v1/network/online")
      .then((r) => r.json())

      .then((data) => {
        setData(data)
        setFoundProviders(data)
      })
  }
  useEffect(() => {
    fetchProviders()
  }, [])
  return (
    <div className="bg-white" ref={ref}>
      <header className="relative overflow-hidden">
        {/* Hero section */}
        <div className=" py-24">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
            <div className="sm:max-w-lg">
              <h1>
                <span className="block text-sm font-semibold uppercase tracking-wide text-golemblue">Golem Network</span>
                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-4xl xl:text-6xl ">
                  The paradise for requestors
                </span>
              </h1>
              <p className="my-4 text-xl inline-block text-slate-600 sm:mt-5 ">
                The Golem Network requestor platform provides various services for requestors to keep track of development, spendings and
                progress.
              </p>

              {inView ? (
                <div className="mb-2">
                  <span className="text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base">
                    <Typewriter
                      onInit={(typewriter) => {
                        typewriter

                          .typeString("1) Copy")

                          .pauseFor(1000)
                          .deleteAll()
                          .typeString("2) Paste")
                          .pauseFor(1000)
                          .deleteAll()
                          .typeString("3) Provide")

                          .pauseFor(1000)
                          .deleteAll()
                          .typeString("Copy and paste into Linux Terminal")
                          .start()
                      }}
                    />
                  </span>
                </div>
              ) : (
                <span>no</span>
              )}
              <WithLineNumbers
                center={true}
                language="bash"
                code="curl -sSf https://join.golem.network/requestor-paradise | bash -"
              ></WithLineNumbers>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div aria-hidden="true" className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full">
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-24 scroller">
                        <div className="max-w-sm w-64  bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="p-4">
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                              </div>
                              <div className="ml-3 w-0 flex-1 pt-0.5">
                                <p className="text-sm font-medium text-gray-900">Task completed succesfully!</p>
                              </div>
                              <div className="ml-4 flex-shrink-0 flex">
                                <button
                                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  onClick={() => {
                                    setShow(false)
                                  }}
                                >
                                  <span className="sr-only">Close</span>
                                  <XIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-900 bg-opacity-40 rounded-xl w-44 h-64"></div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8 scroller">
                        <div className="bg-gray-900 bg-opacity-20 rounded-xl w-44 h-64"></div>
                        <div className=" rounded-xl w-44 h-64"></div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-24 scroller">
                        <div className="rounded-xl w-full h-14 opacity-30">
                          <button
                            type="button"
                            className="inline-flex items-center px-6  py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-golemblue hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Create Project
                            <PlusSmIcon className="h-6 w-6" aria-hidden="true" />
                          </button>{" "}
                        </div>
                        <div className="max-w-sm w-64 opacity-75 bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="p-4">
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <ExclamationIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                              </div>
                              <div className="ml-3 w-0 flex-1 pt-0.5">
                                <p className="text-sm font-medium text-gray-900">Task Failed!</p>
                              </div>
                              <div className="ml-4 flex-shrink-0 flex">
                                <button
                                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  onClick={() => {
                                    setShow(false)
                                  }}
                                >
                                  <span className="sr-only">Close</span>
                                  <XIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
