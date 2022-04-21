import Link from "next/link"

function Page({ data }) {
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
          {/* {invoices.map((row) => (
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
          ))} */}
        </div>
        <div className="col-span-6 text-center grid grid-cols-12 ">
          {/* {activites.map((row) => (
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
          ))} */}
        </div>
      </div>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.pmonitor.golem.network/v1/agreement/296d483f-68c7-4811-9421-580cbba74095`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page
