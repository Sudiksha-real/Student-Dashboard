import { useState } from "react"
import { motion } from "framer-motion"

const students = [
  { id: 1, name: "Aanya Sharma", score: 87, status: "Excellent", attendance: 92 },
  { id: 2, name: "Rohan Mehta", score: 72, status: "On Track", attendance: 81 },
  { id: 3, name: "Priya Nair", score: 58, status: "Needs Attention", attendance: 70 },
  { id: 4, name: "Arjun Patel", score: 45, status: "At Risk", attendance: 60 },
  { id: 5, name: "Sneha Iyer", score: 91, status: "Excellent", attendance: 97 },
  { id: 6, name: "Kabir Singh", score: 66, status: "On Track", attendance: 78 },
  { id: 7, name: "Divya Reddy", score: 52, status: "Needs Attention", attendance: 65 },
  { id: 8, name: "Ishaan Das", score: 38, status: "At Risk", attendance: 55 },
  { id: 9, name: "Meera Joshi", score: 83, status: "Excellent", attendance: 89 },
  { id: 10, name: "Aarav Kumar", score: 74, status: "On Track", attendance: 82 },
  { id: 11, name: "Tanya Verma", score: 49, status: "At Risk", attendance: 61 },
  { id: 12, name: "Kartik Shah", score: 78, status: "On Track", attendance: 85 },
]

function App() {
  const [sortBy, setSortBy] = useState("name")
  const [filter, setFilter] = useState("All")
  const [dark, setDark] = useState(true)

  const filtered = filter === "All"
    ? students
    : students.filter(s => s.status === filter)

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name)
    if (sortBy === "score") return b.score - a.score
    return 0
  })

  return (
    <div className={`min-h-screen p-8 ${dark ? "bg-slate-900" : "bg-slate-100"}`}>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-3xl font-bold ${dark ? "text-white" : "text-slate-800"}`}>
          Student Progress
        </h1>
        <button
          onClick={() => setDark(d => !d)}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            dark ? "bg-slate-700 text-white" : "bg-slate-200 text-slate-800"
          }`}
        >
          {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Sort Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            sortBy === "name"
            ? "bg-indigo-600 text-white"
            : dark ? "bg-slate-700 text-slate-300" : "bg-slate-200 text-slate-700"
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("score")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            sortBy === "score"
            ? "bg-indigo-600 text-white"
            : dark ? "bg-slate-700 text-slate-300" : "bg-slate-200 text-slate-700"
          }`}
        >
          Sort by Score
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["All", "Excellent", "On Track", "Needs Attention", "At Risk"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === f
              ? "bg-indigo-600 text-white"
              : dark ? "bg-slate-700 text-slate-300" : "bg-slate-200 text-slate-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map(student => (
          <motion.div
            key={student.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`rounded-xl p-5 shadow-lg ${dark ? "bg-slate-800" : "bg-white"}`}
          >
            <div className="flex justify-between items-start">
              <h2 className={`font-semibold text-lg ${dark ? "text-white" : "text-slate-800"}`}>
                {student.name}
              </h2>
              <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                student.status === "Excellent" ? "bg-emerald-500/20 text-emerald-400" :
                student.status === "On Track" ? "bg-indigo-500/20 text-indigo-400" :
                student.status === "Needs Attention" ? "bg-amber-500/20 text-amber-400" :
                "bg-red-500/20 text-red-400"
              }`}>
                {student.status}
              </span>
            </div>
            <p className={`text-sm mt-3 ${dark ? "text-slate-400" : "text-slate-500"}`}>
              Score: <span className={`font-mono ${dark ? "text-white" : "text-slate-800"}`}>{student.score}</span>
            </p>
            <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
              Attendance: <span className={`font-mono ${dark ? "text-white" : "text-slate-800"}`}>{student.attendance}%</span>
            </p>
          </motion.div>
        ))}
      </motion.div>

    </div>
  )
}

export default App