import Head from "next/head"
import Image from "next/image"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

export default function Form() {
  const [data, setData] = useState(null)
  const [invoices, setInvoices] = useState(null)
  const [activites, setActivites] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const id = router.query
  const [agreementID, setAgreementID] = useState(id.id)
  const fetchInvoices = () => {
    fetch("https://api.pmonitor.golem.network/v1/agreement/to/invoice/" + agreementID)
      .then((r) => r.json())

      .then((data) => {
        setInvoices(data)
      })
  }
  const fetchActivities = () => {
    fetch("https://api.pmonitor.golem.network/v1/agreement/to/activity/" + agreementID)
      .then((r) => r.json())

      .then((data) => {
        setActivites(data)
      })
  }
  useEffect(() => {
    fetchInvoices()
    fetchActivities()
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!activites)
    return (
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <p>Fetching</p>
      </div>
    )

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-12 grid grid-cols-12 bg-white shadow p-4 mb-4 rounded-lg">
          <div className="col-span-12">
            <p className="font-semibold text-center text-xl">Agreement</p>
            <p className="font-semibold text-center text-slate-600 ">{agreementID}</p>
          </div>
        </div>
        <div className="col-span-6 text-center grid grid-cols-12 ">
          {invoices.map((row) => (
            <div key={row.invoice_id} className="bg-white col-span-12 rounded shadow">
              <h2 className="text-2xl text-center col-span-12 py-2 font-bold">Invoice</h2>
              <p className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                Invoice ID {""}
                <span className="text-gray-400 text-sm">{row.invoice_id}</span>
              </p>
              <p className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                Payment Status {""}
                <span className="text-gray-400 text-sm">{row.invoice_status}</span>
              </p>
              <p className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                GLM amount {""}
                <span className="text-gray-400 text-sm">{row.amount}</span>
              </p>
              <p className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                Issuer ID {""}
                <span className="text-gray-400 text-sm">{row.issuer_id}</span>
              </p>
              <p className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                Payment Platform {""}
                <span className="text-gray-400 text-sm">{row.payment_platform}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="col-span-6 text-center grid grid-cols-12 gap-y-4 ">
          {activites.map((row) => (
            <div key={row.activity_id} className="bg-white col-span-12 rounded shadow">
              <h2 className="text-2xl text-center col-span-12 py-2 font-bold">Activity</h2>
              <p className="block py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                Provider Node ID {""}
                <span className="inline-block text-gray-400 text-sm">{row.provider.node_name}</span>
              </p>
              <p className="block py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                Subnet {""}
                <span className="inline-block text-gray-400 text-sm">{row.provider.subnet}</span>
              </p>
              <p className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                Job Name {""}
                <span className="text-gray-400 text-sm">{row.job_name}</span>
              </p>
              <p className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                Job Unit {""}
                <span className="text-gray-400 text-sm">{row.job_unit}</span>
              </p>
              <p className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                Job Quantity {""}
                <span className="text-gray-400 text-sm">{row.job_quantity}</span>
              </p>
              <p className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                GLM Amount <span className="text-gray-400 text-sm">{row.amount_due}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
