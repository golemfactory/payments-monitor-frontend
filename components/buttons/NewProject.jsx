// import usestate
import React, { useState } from "react"

export default function NewProject() {
  const [open, setOpen] = useState(false)
  const [project, setProject] = useState(projects)
  const [log, setLog] = useState(logs)
  console.log(log)
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
  )
}
