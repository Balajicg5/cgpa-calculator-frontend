import React, { useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define PDF styles
const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 15,
  },
  courseRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderBottomStyle: 'solid',
    paddingVertical: 8,
  },
  courseHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    paddingVertical: 8,
    fontWeight: 'bold',
  },
  col1: { width: '20%' },
  col2: { width: '40%' },
  col3: { width: '20%' },
  col4: { width: '20%' },
  gpaSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  cgpa: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
  }
});

// PDF Document Component
const PDFReport = ({ semesters, calculateSemesterGPA, calculateCGPA }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Academic Performance Report</Text>
      
      {semesters.map((semester, index) => (
        <View key={index}>
          <Text style={pdfStyles.subtitle}>
            Semester {semester.number} - GPA: {calculateSemesterGPA(semester.courses)}
          </Text>
          
          <View style={pdfStyles.courseHeader}>
            <Text style={pdfStyles.col1}>Code</Text>
            <Text style={pdfStyles.col2}>Course</Text>
            <Text style={pdfStyles.col3}>Credits</Text>
            <Text style={pdfStyles.col4}>Grade</Text>
          </View>
          
          {semester.courses.map((course, courseIndex) => (
            <View key={courseIndex} style={pdfStyles.courseRow}>
              <Text style={pdfStyles.col1}>{course.code}</Text>
              <Text style={pdfStyles.col2}>{course.name}</Text>
              <Text style={pdfStyles.col3}>{course.credits}</Text>
              <Text style={pdfStyles.col4}>{course.grade}/10</Text>
            </View>
          ))}
        </View>
      ))}
      
      <Text style={pdfStyles.cgpa}>
        CGPA: {calculateCGPA()}/10
      </Text>
    </Page>
  </Document>
);


const SemesterGPACalculator = () => {
  // Course database
  const courseDatabase = {
    "CS101": { name: "Introduction to Programming", credits: 4 },
    "CS102": { name: "Data Structures", credits: 4 },
    "CS201": { name: "Computer Architecture", credits: 3 },
    "CS202": { name: "Operating Systems", credits: 4 },
    "MA101": { name: "Calculus I", credits: 4 },
    "MA102": { name: "Linear Algebra", credits: 3 },
    "PH101": { name: "Physics I", credits: 4 },
    "EE101": { name: "Basic Electronics", credits: 3 },
    // Add more courses as needed
  };

  const [semesters, setSemesters] = useState([]);
  const [currentSemester, setCurrentSemester] = useState({
    number: '',
    courses: []
  });
  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    credits: '',
    grade: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'code') {
      // Auto-fill course details when code is entered
      const courseInfo = courseDatabase[value.toUpperCase()];
      if (courseInfo) {
        setNewCourse(prev => ({
          ...prev,
          code: value.toUpperCase(),
          name: courseInfo.name,
          credits: courseInfo.credits
        }));
      } else {
        setNewCourse(prev => ({
          ...prev,
          code: value.toUpperCase(),
          name: '',
          credits: ''
        }));
      }
    } else {
      setNewCourse(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSemesterNumberChange = (e) => {
    setCurrentSemester(prev => ({
      ...prev,
      number: e.target.value
    }));
  };

  const addCourse = () => {
    if (newCourse.code && newCourse.name && newCourse.credits && newCourse.grade) {
      setCurrentSemester(prev => ({
        ...prev,
        courses: [...prev.courses, newCourse]
      }));
      setNewCourse({
        code: '',
        name: '',
        credits: '',
        grade: ''
      });
    }
  };

  const removeCourse = (index) => {
    setCurrentSemester(prev => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index)
    }));
  };

  const addSemester = () => {
    if (currentSemester.number && currentSemester.courses.length > 0) {
      setSemesters(prev => [...prev, currentSemester]);
      setCurrentSemester({
        number: '',
        courses: []
      });
    }
  };

  const removeSemester = (index) => {
    setSemesters(prev => prev.filter((_, i) => i !== index));
  };

  const calculateSemesterGPA = (courses) => {
    if (courses.length === 0) return 0;
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    courses.forEach(course => {
      const credits = parseFloat(course.credits);
      const grade = parseFloat(course.grade);
      totalPoints += credits * grade;
      totalCredits += credits;
    });
    
    return (totalPoints / totalCredits).toFixed(2);
  };

  const calculateCGPA = () => {
    if (semesters.length === 0) return 0;

    let totalPoints = 0;
    let totalCredits = 0;

    semesters.forEach(semester => {
      semester.courses.forEach(course => {
        const credits = parseFloat(course.credits);
        const grade = parseFloat(course.grade);
        totalPoints += credits * grade;
        totalCredits += credits;
      });
    });

    return (totalPoints / totalCredits).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Semester-wise GPA Calculator
        </h1>
        
        <div className="space-y-6">
          {/* Semester Input */}
          <div className="flex gap-4 items-center">
            <input
              type="number"
              placeholder="Semester Number"
              value={currentSemester.number}
              onChange={handleSemesterNumberChange}
              className="w-40 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <span className="text-gray-600">Current Semester: {currentSemester.courses.length} courses</span>
          </div>

          {/* Course Input Form */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              name="code"
              placeholder="Course Code"
              value={newCourse.code}
              onChange={handleInputChange}
              className="md:col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none uppercase"
              list="course-codes"
            />
            <datalist id="course-codes">
              {Object.keys(courseDatabase).map(code => (
                <option key={code} value={code} />
              ))}
            </datalist>
            <input
              name="name"
              placeholder="Course Name"
              value={newCourse.name}
              onChange={handleInputChange}
              className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              readOnly
            />
            <input
              name="credits"
              type="number"
              placeholder="Credits"
              value={newCourse.credits}
              onChange={handleInputChange}
              className="md:col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              readOnly
            />
            <input
              name="grade"
              type="number"
              min="0"
              max="10"
              step="0.1"
              placeholder="Grade (0-10)"
              value={newCourse.grade}
              onChange={handleInputChange}
              className="md:col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="flex gap-4">
            <button 
              onClick={addCourse}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Add Course
            </button>
            <button 
              onClick={addSemester}
              disabled={!currentSemester.number || currentSemester.courses.length === 0}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Save Semester
            </button>
          </div>

          {/* Current Semester Courses */}
          {currentSemester.courses.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Current Semester Courses</h2>
              <div className="space-y-3">
                {currentSemester.courses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-4 md:grid-cols-5 gap-4 flex-1">
                      <span className="md:col-span-1 font-medium">{course.code}</span>
                      <span className="md:col-span-2 font-medium">{course.name}</span>
                      <span className="md:col-span-1">{course.credits} credits</span>
                      <span className="md:col-span-1">{course.grade}/10</span>
                    </div>
                    <button
                      onClick={() => removeCourse(index)}
                      className="ml-4 p-2 text-red-500 hover:bg-red-100 rounded-full transition duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Semesters */}
          {semesters.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Saved Semesters</h2>
              <div className="space-y-6">
                {semesters.map((semester, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Semester {semester.number}</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-blue-600 font-semibold">
                          GPA: {calculateSemesterGPA(semester.courses)}/10
                        </span>
                        <button
                          onClick={() => removeSemester(index)}
                          className="p-2 text-red-500 hover:bg-red-100 rounded-full transition duration-200"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {semester.courses.map((course, courseIndex) => (
                        <div key={courseIndex} className="grid grid-cols-4 md:grid-cols-5 gap-4 py-2 border-b border-gray-200 last:border-0">
                          <span className="md:col-span-1 font-medium">{course.code}</span>
                          <span className="md:col-span-2 font-medium">{course.name}</span>
                          <span className="md:col-span-1">{course.credits} credits</span>
                          <span className="md:col-span-1">{course.grade}/10</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


           {/* Add PDF Export button */}
        {semesters.length > 0 && (
          <div className="mt-8">
            <PDFDownloadLink
              document={
                <PDFReport 
                  semesters={semesters}
                  calculateSemesterGPA={calculateSemesterGPA}
                  calculateCGPA={calculateCGPA}
                />
              }
              fileName="academic_report.pdf"
            >
              {({ blob, url, loading, error }) => (
                <button
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={loading}
                >
                  {loading ? 'Generating PDF...' : 'Download Academic Report (PDF)'}
                </button>
              )}
            </PDFDownloadLink>
          </div>
        )}

        {/* Show CGPA if there are saved semesters */}
        {semesters.length > 0 && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-2xl font-bold text-center text-blue-800">
              Cumulative GPA: {calculateCGPA()}/10
            </h2>
            <div className="text-sm text-gray-600 mt-2">
                Total Semesters: {semesters.length}
              </div>
          </div>
        )}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default SemesterGPACalculator;