// import usestate
import React, { useState } from "react"

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export default function Logs(props) {
  const [log, setLog] = useState(props.logs)
  return (
    <>
      <ul role="list" className="divide-y divide-gray-200">
        {log.map((activity) => (
          <li key={activity.id} className="py-4">
            <div className="flex space-x-3">
              <img className="h-8 w-8 rounded-full" src="/golem-blue-bg.png" alt="" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">You</h3>
                  <p className="text-sm text-gray-500">{formatDate(activity.created_at)}</p>
                </div>
                <p className="text-sm text-gray-500">{activity.message}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="py-4 text-sm border-t border-gray-200">
        <a href="#" className="text-indigo-600 font-semibold hover:text-indigo-900">
          View all activity <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </>
  )
}
