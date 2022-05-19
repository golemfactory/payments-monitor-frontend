// import usestate
import React, { useState } from "react"
import { ChevronRightIcon, UserGroupIcon } from "@heroicons/react/solid"
import Link from "next/link"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function DisplayProjects(props) {
  const [projects, setProjects] = useState(props.projects)
  return (
    <ul role="list" className="relative z-0 divide-y divide-gray-200 border-b border-gray-200">
      {projects.map((project) => (
        <li key={project.id} className="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6">
          <div className="flex items-center justify-between space-x-4">
            {/* Repo name and link */}
            <div className="min-w-0 space-y-3">
              <div className="flex items-center space-x-3">
                <span
                  className={classNames(
                    project.active ? "bg-green-100" : "bg-gray-100",
                    "h-4 w-4 rounded-full flex items-center justify-center"
                  )}
                  aria-hidden="true"
                >
                  <span className={classNames(project.active ? "bg-green-400" : "bg-green-400", "h-2 w-2 rounded-full")} />
                </span>

                <span className="block">
                  <h2 className="text-sm font-medium">
                    <a href={project.href}>
                      <span className="absolute inset-0" aria-hidden="true" />
                      {project.name} <span className="sr-only">{project.active ? "Running" : "Not running"}</span>
                    </a>
                  </h2>
                </span>
              </div>
              <a href={project.repoHref} className="relative group flex items-center space-x-2.5">
                <UserGroupIcon className="h-4 w-4 text-gray-500"></UserGroupIcon>
                <span className="text-sm text-gray-500 group-hover:text-gray-900 font-medium truncate">
                  {Math.floor(Math.random() * 10)} members
                </span>
              </a>
            </div>
            <div className="sm:hidden">
              <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            {/* Repo meta info */}
            <div className="hidden sm:flex flex-col flex-shrink-0 items-end space-y-3">
              <p className="flex items-center space-x-4">
                <Link
                  href={{
                    pathname: `/dashboard/project/` + project.apikey,
                  }}
                >
                  <a className="relative text-sm text-gray-500 hover:text-gray-900 font-medium">View Project</a>
                </Link>
              </p>
              <p className="flex text-gray-500 text-sm space-x-2">
                <span>{project.tech}</span>
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
