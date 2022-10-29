export default function Counter(props) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 text-center ">
      <p className="text-lg font-medium">{props.title}</p>
      <span className="text-2xl font-bold">{props.count}</span>
    </div>
  )
}
