import React, { useState, useEffect } from "react"
import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import {
  ChartBarIcon,
  CursorClickIcon,
  DocumentReportIcon,
  MenuIcon,
  RefreshIcon,
  ShieldCheckIcon,
  ViewGridIcon,
  XIcon,
} from "@heroicons/react/outline"
import { ChevronDownIcon } from "@heroicons/react/solid"
import Link from "next/link"

const solutions = [
  {
    name: "Requestor",
    description: "Get a better understanding of where your traffic is coming from.",
    href: "/requestor",
    icon: ChartBarIcon,
  },
  {
    name: "Requestor Portal",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: CursorClickIcon,
  },
  { name: "Provider", description: "Your customers' data will be safe and secure.", href: "/provider", icon: ShieldCheckIcon },
  {
    name: "Golem Analytics",
    description: "Connect with third-party tools that you're already using.",
    href: "https://stats.golem.network",
    icon: ViewGridIcon,
  },
  {
    name: "Thorg",
    description: "Build strategic funnels that will drive your customers to convert",
    href: "https://thorg.io",
    icon: RefreshIcon,
  },
  {
    name: "Square",
    description: "Get detailed reports that will help you make more informed decisions ",
    href: "#",
    icon: DocumentReportIcon,
  },
  {
    name: "Blog",
    description: "Get detailed reports that will help you make more informed decisions ",
    href: "/blog",
    icon: DocumentReportIcon,
  },
]

const requestor = [
  {
    name: "Requestor Portal",
    description: "Monitor spendings from the applications you deploy",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "SDK Documentation",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: CursorClickIcon,
  },
  {
    name: "Examples & Tutorials",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: CursorClickIcon,
  },
  {
    name: "Golem Analytics",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: ViewGridIcon,
  },
]

const provider = [
  {
    name: "Documentation",
    description: "Monitor spendings from the applications you deploy",
    href: "#",
    icon: ChartBarIcon,
  },

  {
    name: "Examples & Tutorials",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: CursorClickIcon,
  },
  {
    name: "Golem Analytics",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: ViewGridIcon,
  },
  {
    name: "Plugins",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: ViewGridIcon,
  },
]

const about = [
  {
    name: "Roadmap",
    description: "Follow Golem on the journey to a decentralized web",
    href: "#",
    icon: ChartBarIcon,
  },

  {
    name: "Team",
    description: "See the Golem team",
    href: "#",
    icon: CursorClickIcon,
  },
  {
    name: "Job Offerings",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: ViewGridIcon,
  },
  {
    name: "Plugins",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: ViewGridIcon,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const Navbar = () => {
  return (
    <nav className="relative bggridbottom  w-full h-32 ">
      <Popover className="relative max-w-7xl mx-auto flex items-center justify-between ">
        <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
          <div>
            <Link href="/">
              <a className="flex">
                <span className="sr-only">Workflow</span>
                <img className="h-12 w-auto sm:h-14 mt-2   rounded-lg" src="https://i.imgur.com/zcL5vPX.png" alt="" />
              </a>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <Popover.Group as="nav" className="flex space-x-10">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group  rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      )}
                    >
                      <span>Products</span>
                      <ChevronDownIcon
                        className={classNames(open ? "text-gray-600" : "text-gray-400", "ml-2 h-5 w-5 group-hover:text-gray-500")}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-3xl">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                            {solutions.map((item) => (
                              <a key={item.name} href={item.href} className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-golemblue text-white sm:h-12 sm:w-12">
                                  <item.icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">{item.name}</p>
                                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                </div>
                              </a>
                            ))}
                          </div>
                          <div className="p-5 bg-gray-50 sm:p-8">
                            <a href="#" className="-m-3 p-3 flow-root rounded-md hover:bg-gray-100">
                              <div className="flex items-center">
                                <div className="text-base font-medium text-gray-900">Enterprise</div>
                                <span className="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-indigo-100 text-indigo-800">
                                  New
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">Empower your entire team with even more advanced tools.</p>
                            </a>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group  rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      )}
                    >
                      <span>Requestor</span>
                      <ChevronDownIcon
                        className={classNames(open ? "text-gray-600" : "text-gray-400", "ml-2 h-5 w-5 group-hover:text-gray-500")}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-3xl">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                            {requestor.map((item) => (
                              <a key={item.name} href={item.href} className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-golemblue text-white sm:h-12 sm:w-12">
                                  <item.icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">{item.name}</p>
                                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                </div>
                              </a>
                            ))}
                          </div>
                          <div className="p-5 bg-gray-50 sm:p-8">
                            <a href="#" className="-m-3 p-3 flow-root rounded-md hover:bg-gray-100">
                              <div className="flex items-center">
                                <div className="text-base font-medium text-gray-900">Enterprise</div>
                                <span className="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-indigo-100 text-indigo-800">
                                  New
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">Empower your entire team with even more advanced tools.</p>
                            </a>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group  rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      )}
                    >
                      <span>Provider</span>

                      <ChevronDownIcon
                        className={classNames(open ? "text-gray-600" : "text-gray-400", "ml-2 h-5 w-5 group-hover:text-gray-500")}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 bg-white -ml-4 mt-3 transform w-screen max-w-md lg:max-w-3xl">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6  px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                            {provider.map((item) => (
                              <a key={item.name} href={item.href} className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-golemblue text-white sm:h-12 sm:w-12">
                                  <item.icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">{item.name}</p>
                                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                </div>
                              </a>
                            ))}
                          </div>
                          <div className="p-5 bg-gray-50 sm:p-8">
                            <a href="#" className="-m-3 p-3 flow-root rounded-md hover:bg-gray-100">
                              <div className="flex items-center">
                                <div className="text-base font-medium text-gray-900">Enterprise</div>
                                <span className="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-indigo-100 text-indigo-800">
                                  New
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">Empower your entire team with even more advanced tools.</p>
                            </a>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group  rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      )}
                    >
                      <span>About</span>

                      <ChevronDownIcon
                        className={classNames(open ? "text-gray-600" : "text-gray-400", "ml-2 h-5 w-5 group-hover:text-gray-500")}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 bg-white -ml-4 mt-3 transform w-screen max-w-md lg:max-w-3xl">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6  px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                            {about.map((item) => (
                              <a key={item.name} href={item.href} className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-golemblue text-white sm:h-12 sm:w-12">
                                  <item.icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">{item.name}</p>
                                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                </div>
                              </a>
                            ))}
                          </div>
                          <div className="p-5 bg-gray-50 sm:p-8">
                            <a href="#" className="-m-3 p-3 flow-root rounded-md hover:bg-gray-100">
                              <div className="flex items-center">
                                <div className="text-base font-medium text-gray-900">Enterprise</div>
                                <span className="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-indigo-100 text-indigo-800">
                                  New
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">Empower your entire team with even more advanced tools.</p>
                            </a>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </Popover.Group>
          </div>
        </div>
        <div className="flex justify-end">
          <Link href="/dashboard">
            <button className="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto">
              Get Started
            </button>
          </Link>
        </div>
      </Popover>
    </nav>
  )
}

export default Navbar
