import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // 🆕 Import motion
import { createSemester, updateSemester } from '../services/api';

function SemGPACalculator({ semester, onSave }) {
  const [formData, setFormData] = useState({
    number: 1,
    courses: [{ code: '', name: '', credits: 3, grade: 4.0 }]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gpa, setGpa] = useState(0);

  useEffect(() => {
    if (semester) {
      setFormData({
        number: semester.number,
        courses: semester.courses
      });
    }
  }, [semester]);

  useEffect(() => {
    calculateGPA();
  }, [formData.courses]);

  const calculateGPA = () => {
    const courses = formData.courses;
    if (courses.length === 0) {
      setGpa(0);
      return;
    }

    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      if (course.credits && course.grade) {
        totalPoints += parseFloat(course.credits) * parseFloat(course.grade);
        totalCredits += parseFloat(course.credits);
      }
    });

    setGpa(totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0);
  };

  const handleSemesterNumberChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      number: value === '' ? '' : parseInt(value, 10) || 1
    });
  };

  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...formData.courses];
    if (field === 'credits' || field === 'grade') {
      updatedCourses[index][field] = value === '' ? '' : parseFloat(value) || 0;
    } else {
      updatedCourses[index][field] = value;
    }

    setFormData({
      ...formData,
      courses: updatedCourses
    });
  };

  const addCourse = () => {
    setFormData({
      ...formData,
      courses: [...formData.courses, { code: '', name: '', credits: 3, grade: 4.0 }]
    });
  };

  const removeCourse = (index) => {
    const updatedCourses = [...formData.courses];
    updatedCourses.splice(index, 1);

    setFormData({
      ...formData,
      courses: updatedCourses
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.courses.some(c => !c.code || !c.name)) {
      setError('Please fill in all course details');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (semester) {
        await updateSemester(semester._id, formData);
      } else {
        await createSemester(formData);
      }

      onSave();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save semester');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Semester Number
          </label>
          <input
            type="number"
            min="1"
            max={8}
            value={String(formData.number)}
            onChange={handleSemesterNumberChange}
            required
            className="w-full px-3 py-2 bg-black border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-800">Courses</h3>
            <span className="text-sm text-gray-500">
              GPA: <strong>{gpa}</strong>
            </span>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {formData.courses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 border border-gray-200 rounded-md bg-gray-50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Course Code</label>
                      <input
                        type="text"
                        value={course.code || ''}
                        onChange={(e) => handleCourseChange(index, 'code', e.target.value)}
                        required
                        className="w-full px-2 py-2  bg-black border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Course Name</label>
                      <input
                        type="text"
                        value={course.name || ''}
                        onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
                        required
                        className="w-full px-2 py-2 border bg-black border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-1">
  <label className="block text-xs font-medium text-gray-600 mb-1">Credits</label>
  <input
    type="number"
    min="0"
    step="0.5"
    value={String(course.credits || '')}
    onChange={(e) => handleCourseChange(index, 'credits', e.target.value)}
    required
    className="w-full px-2 py-2 border bg-black border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
  />
</div>


                    <div className="md:col-span-1">
  <label className="block text-xs font-medium text-gray-600 mb-1">Grade</label>
  <input
    type="number"
    min="0"
    max="10"
    step="0.1"
    value={String(course.grade || '')}
    onChange={(e) => handleCourseChange(index, 'grade', e.target.value)}
    required
    className="w-full px-2 py-2 border bg-black border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
  />
</div>

                  </div>

                  {formData.courses.length > 1 && (
                    <div className="mt-2 text-right">
                      <button
                        type="button"
                        onClick={() => removeCourse(index)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Remove Course
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={addCourse}
              className="text-sm px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
            >
              + Add Course
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? 'Saving...' : semester ? 'Update Semester' : 'Add Semester'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SemGPACalculator;
