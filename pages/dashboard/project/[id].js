import { Fragment } from "react"
import { Transition, Dialog } from "@headlessui/react"
import React, { useState, useRef, useEffect } from "react"
import { getSession } from "next-auth/react"
import { postData } from "../../../fetcher"
import Link from "next/link"
import Navbar from "../../../components/Navbar"
import Payments from "../../../components/charts/Payments"
import { CalendarIcon, CreditCardIcon, ClockIcon, PhotographIcon, TableIcon, ViewBoardsIcon, ViewListIcon } from "@heroicons/react/outline"

const items = [
  {
    title: "How to connect task to a project",
    description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, Neque porro quisquam est qui ",
    icon: ViewListIcon,
    background: "bg-pink-500",
  },
  {
    title: "Video tutorials",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,  Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, ",
    icon: CalendarIcon,
    background: "bg-yellow-500",
  },
  {
    title: "FAQ",
    description: "Neque porro quisquam est .",
    icon: PhotographIcon,
    background: "bg-green-500",
  },
  {
    title: "BlaBla",
    description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, ",
    icon: ViewBoardsIcon,
    background: "bg-blue-500",
  },
  {
    title: "BlaBla",
    description: "Neque porro quisquam est qui dolor sit amet, ",
    icon: TableIcon,
    background: "bg-indigo-500",
  },
  {
    title: "BlaBla",
    description: "Neque porro quisquam est qui dolorem ipsum quia ",
    icon: ClockIcon,
    background: "bg-purple-500",
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export async function getServerSideProps(ctx) {
  // Fetch data from external API

  const session = await getSession(ctx)
  if (session) {
    // Signed in

    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "v1/agreement/" + ctx.query.id, {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + session.user.accessToken,
      }),
    })
    if (res.status == 200) {
      var data = await res.json()
    } else {
      var data = {}
    }
    const fetch_overview = await fetch(process.env.NEXT_PUBLIC_API_BASE + "dashboard/project/" + ctx.query.id, {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + session.user.accessToken,
      }),
    })
    if (fetch_overview.status == 200) {
      var overview_data = await fetch_overview.json()
    } else {
      var overview_data = {}
    }
    return {
      props: {
        agreements: data,
        project_id: ctx.query.id,
        overview: overview_data,
      },
    }
  } else {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }
  }

  // Pass data to the page via props
}

function Page({ agreements, project_id, overview }) {
  const [open, setOpen] = useState(false)
  const [chartload, setChartload] = useState(false)
  const [paymentchart, setPaymentchart] = useState({})
  const [activitychart, setActivitychart] = useState({})
  const [maticchart, setMaticChart] = useState({})
  const [agreement, setAgreement] = useState(agreements)
  const cancelButtonRef = useRef(null)
  console.log(agreements)

  const createProject = async (event) => {
    event.preventDefault() // don't redirect the page
    let url = process.env.NEXT_PUBLIC_API_BASE + "v1/projects"
    const save_project = await postData(url, "post", { name: event.target.name.value })
    if (save_project.status == 201) {
      const returned_data = await save_project.json()
      project.push(returned_data)
      setOpen(false)
    }
  }
  const createChart = async () => {
    let glm_chart = []
    for (var i in overview.payments) {
      var time = new Date(overview.payments[i].created_at).valueOf()
      console.log(time)
      glm_chart.push([time, overview.payments[i].amount_human])
    }
    setPaymentchart({
      data: glm_chart,
      name: "GLM paid",
    })
    let matic_chart = []
    for (var i in overview.payments) {
      var time = new Date(overview.payments[i].created_at).valueOf()
      console.log(time)
      matic_chart.push([time, overview.payments[i].gas_spent_human])
    }
    setMaticChart({
      data: matic_chart,
      name: "MATIC paid",
    })

    let activity_chart = []
    for (var i in overview.payments) {
      var time = new Date(overview.payments[i].created_at).valueOf()
      console.log(time)
      matic_chart.push([time, overview.payments[i].gas_spent_human])
    }
    setMaticChart({
      data: matic_chart,
      name: "MATIC paid",
    })
  }

  useEffect(() => {
    if (!chartload) {
      createChart()
      setChartload(true)
    }
  }, [])
  return (
    <>
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">{overview.project_name}</h1>
          <span className="w-full text-gray-400 my-4">{project_id}</span>
        </div>
        {overview != undefined && agreement.length != undefined ? (
          <div className="grid grid-cols-12 gap-4 mb-4">
            {chartload == true ? (
              <>
                <div className="col-span-6">
                  {" "}
                  <Payments
                    spent={overview.spendings.spendings_glm}
                    title="Payments over time"
                    currency="GLM"
                    data={[paymentchart]}
                  ></Payments>{" "}
                </div>
                <div className="col-span-6">
                  {" "}
                  <Payments
                    spent={overview.spendings.spendings_matic}
                    title="Gas paid over time"
                    currency="MATIC"
                    data={[maticchart]}
                  ></Payments>{" "}
                </div>
              </>
            ) : null}
          </div>
        ) : null}
        <div className="grid grid-cols-12 gap-4">
          {agreement.length != undefined ? (
            <table className="v-table divide-y-12 divide-gray-900  w-full inline-block lg:table md:table xl:table col-span-12">
              <thead className="bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider rounded-l-lg">
                    Agreement ID
                  </th>
                  <th scope="col" className="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Amount Due
                  </th>
                  <th scope="col" className="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Amount Paid
                  </th>
                  <th scope="col" className="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">
                    % Paid
                  </th>
                  <th scope="col" className="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Provider
                  </th>
                  <th scope="col" className="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider rounded-r-lg">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {agreement.map((row) => (
                  <Link
                    href={{
                      pathname: `/dashboard/agreement/` + row.agreement_id,
                    }}
                  >
                    <tr
                      key={row.agreement_id}
                      className={classNames(0 == 0 ? "hover:bg-gray-300  cursor-pointer my-12 golemtr" : " my-12 golemtr")}
                    >
                      <td className="px-6 py-4 rounded-l-lg">
                        <div className="flex items-center">
                          <div className="ml-4 relative">
                            <div className="text-sm font-medium text-gray-900 golemtext ">{row.agreement_id.substring(0, 7)}.. </div>

                            <div className="text-sm text-gray-500 golemtext">Available Globally</div>
                          </div>
                        </div>
                      </td>
                      {row.amount_due > 10 ? (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900 golemtext">{row.amount_due.substring(0, 10)}..</span>
                        </td>
                      ) : (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900 golemtext">{row.amount_due}</span>
                        </td>
                      )}
                      {row.amount_paid > 10 ? (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900 golemtext">{row.amount_paid.substring(0, 10)}..</span>
                        </td>
                      ) : (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900 golemtext">{row.amount_paid}</span>
                        </td>
                      )}

                      {row.amount_paid == 0 ? (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900 golemtext">0</span>
                        </td>
                      ) : (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900 golemtext">{(row.amount_due / row.amount_paid) * 100}</span>
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <span className="text-sm font-medium text-gray-900 golemtext">{row.offer_properties["golem.node.id.name"]}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <span className="text-sm font-medium text-gray-900 golemtext">{row.state}</span>
                      </td>
                    </tr>
                  </Link>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="col-span-12">
              <div>
                <p className="mt-1 text-sm text-gray-500">
                  This project haven't had any activity yet. If you need help please click the button below.
                </p>
                <ul role="list" className="mt-6 border-t border-b border-gray-200 py-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flow-root">
                      <div className="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
                        <div className={classNames(item.background, "flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg")}>
                          <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            <a href="#" className="focus:outline-none">
                              <span className="absolute inset-0" aria-hidden="true" />
                              {item.title}
                              <span aria-hidden="true"> &rarr;</span>
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex">
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Or contact us for help<span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          )}
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
                <div className="relative inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left  shadow-xl transform transition-all sm:my-8 w-2/5">
                  <div>
                    <div className=" text-center ">
                      <h1 className="text-2xl font-semibold">Create Project </h1>
                    </div>
                  </div>
                  <div className="grid grid-cols-12">
                    <div className="h-full bg-white p-8 col-span-12">
                      <div className="space-y-6 ">
                        <div>
                          <form className="mx-auto" onSubmit={createProject}>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                              Project Name
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full pr-10  text-black placeholder-golemblue focus:outline-none focus:ring-golemblue focus:border-golemblue sm:text-sm rounded-md"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full flex justify-center mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Create
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  )
}

// This gets called on every request

export default Page
