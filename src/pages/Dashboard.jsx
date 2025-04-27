import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getSemesters, getCGPA, deleteSemester } from '../services/api'
import SemesterGPACalculator from '../components/SemesterGPACalulator'

function Dashboard() {
  const { user, logout } = useAuth()
  const [semesters, setSemesters] = useState([])
  const [cgpa, setCgpa] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAddSemester, setShowAddSemester] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [semestersResponse, cgpaResponse] = await Promise.all([
        getSemesters(),
        getCGPA()
      ])
      setSemesters(semestersResponse.data)
      setCgpa(cgpaResponse.cgpa)
    } catch (err) {
      setError('Failed to load data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSemesterSaved = () => {
    setShowAddSemester(false)
    setSelectedSemester(null)
    fetchData()
  }

  const handleDeleteSemester = async (id) => {
    if (window.confirm('Are you sure you want to delete this semester?')) {
      try {
        await deleteSemester(id)
        fetchData()
      } catch (err) {
        setError('Failed to delete semester')
      }
    }
  }

  const handleEditSemester = (semester) => {
    setSelectedSemester(semester)
    setShowAddSemester(true)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">GPA Calculator</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg leading-6 font-medium text-gray-900">Your Academic Overview</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Cumulative GPA: <span className="font-bold">{cgpa}</span>
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedSemester(null)
                setShowAddSemester(true)
              }}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Add New Semester
            </button>
          </div>
        </div>

        {showAddSemester ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {selectedSemester ? 'Edit Semester' : 'Add New Semester'}
              </h3>
              <button
                onClick={() => {
                  setShowAddSemester(false)
                  setSelectedSemester(null)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
            <div className="border-t border-gray-200">
              <SemesterGPACalculator 
                semester={selectedSemester} 
                onSave={handleSemesterSaved} 
              />
            </div>
          </div>
        ) : null}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading your data...</p>
          </div>
        ) : semesters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No semesters found. Add your first semester!</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Your Semesters</h3>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {semesters.map((semester) => (
                  <li key={semester._id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-md font-medium text-gray-900">Semester {semester.number}</h4>
                        <p className="text-sm text-gray-500">GPA: {semester.gpa}</p>
                        <p className="text-sm text-pink-500">
                          {semester.courses.length} {semester.courses.length === 1 ? 'course' : 'courses'}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditSemester(semester)}
                          className="px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSemester(semester._id)}
                          className="px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    {semester.courses.length > 0 && (
                      <div className="mt-3">
                        <h5 className="text-sm font-medium text-yellow-700">Courses:</h5>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {semester.courses.map((course, index) => (
                            <div 
                              key={index} 
                              className="px-2 py-1 bg-gray-100 rounded-md text-xs text-pink-800"
                            >
                              {course.code}: {course.name} ({course.credits} cr, Grade: {course.grade})
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard