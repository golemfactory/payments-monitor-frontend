import { Fragment } from "react"
import { Transition, Dialog } from "@headlessui/react"
import React, { useState, useRef } from "react"
import { ExclamationCircleIcon } from "@heroicons/react/solid"
import { getSession } from "next-auth/react"
import { postData } from "../../fetcher"
import Link from "next/link"

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
    const data = await res.json()
    console.log(data)
    return {
      props: {
        agreements: data,
        project_id: ctx.query.id,
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

function Page({ agreements, project_id }) {
  const [open, setOpen] = useState(false)
  const [agreement, setAgreement] = useState(agreements)
  const cancelButtonRef = useRef(null)

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
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="w-full text-3xl mt-4">Agreements</h1>
      <span className="w-full text-gray-400 my-4">Project: {project_id}</span>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 grid grid-cols-12 bg-white shadow p-4 mb-4 rounded-lg"></div>

        {agreement.map((row) => (
          <div key={row.agreement_id} className="bg-white col-span-3 h-32 rounded-lg shadow-lg">
            <div className="flex h-full">
              <div className="m-auto">
                <Link
                  href={{
                    pathname: `/agreement/` + row.agreement_id,
                  }}
                >
                  <a className="text-indigo-600 hover:text-indigo-900">{row.agreement_id.substring(0, 7)}</a>
                </Link>
              </div>
            </div>
          </div>
        ))}
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
  )
}

// This gets called on every request

export default Page
