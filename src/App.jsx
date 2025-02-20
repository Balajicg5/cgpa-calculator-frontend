import React, { useState } from 'react';
import { Analytics } from "@vercel/analytics/react"
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
const departmentDatabase = {
    "CSE": {
      name: "Computer Science Engineering",
      courses: {
        
        
         // "22SMC1Z0": { "name": "Induction Programme", "credits": 0 },
          "22SHS1Z1": { "name": "Heritage of Tamils", "credits": 1 },
          "22SHS1Z2": { "name": "Professional English", "credits": 3 },
          "22SBS1Z1": { "name": "Linear Algebra and Calculus", "credits": 4 },
          "22SBS1Z2": { "name": "Engineering Physics", "credits": 3 },
          "22SES101": { "name": "Programming in C", "credits": 3 },
         // "22SMC1Z1": { "name": "Environmental Science and Engineering", "credits": 0 },
          "22SHS1Z3": { "name": "Cambridge English", "credits": 1 },
          "22SBS1Z3": { "name": "Physics Laboratory", "credits": 1.5 },
          "22SES1Z2": { "name": "Workshop Practice", "credits": 1.5 },
          "22SES103": { "name": "Programming in C Laboratory", "credits": 1.5 },
            "22SHS2Z4": { "name": "Tamils and Technology", "credits": 1 },
            "22SHS2Z5": { "name": "Values and Ethics", "credits": 3 },
            "22SBS204": { "name": "Vector Spaces and Differential Equations with MATLAB", "credits": 4 },
            "22SBS205": { "name": "Physics for Information Science", "credits": 3 },
            "22SBS206": { "name": "Applied Chemistry", "credits": 3 },
            "22SES204": { "name": "Basics of Electrical and Electronics Engineering", "credits": 3 },
            "22SBS2Z7": { "name": "Chemistry Laboratory", "credits": 1.5 },
            "22SES2Z5": { "name": "Engineering Graphics", "credits": 3 },
            "22SBS308": { "name": "Probability, Random Processes and Queueing Theory", "credits": 4 },
  "22SES306": { "name": "Digital Systems", "credits": 3 },
  "22SES307": { "name": "Discrete Structures", "credits": 3 },
  "22SPC301": { "name": "Data Structures", "credits": 3 },
  "22SPC302": { "name": "Foundations of Data Science", "credits": 3 },
  "22SPC303": { "name": "Object Oriented Programming", "credits": 4 },
  "22SES308": { "name": "Engineering Exploration for Computer Science and Engineering", "credits": 1.5 },
  "22SES309": { "name": "Digital Systems Laboratory", "credits": 1.5 },
  "22SPC304": { "name": "Data Structures Laboratory ", "credits": 1.5 },
            "22SES410": { "name": "Analog and Digital Communication", "credits": 3 },
  "22SPC405": { "name": "Computer Architecture", "credits": 3 },
  "22SPC406": { "name": "Database Management Systems", "credits": 3 },
  "22SPC407": { "name": "System Programming and Operating Systems", "credits": 3 },
  "22SPC408": { "name": "Design and Analysis of Algorithms", "credits": 4 },
  "22SPC409": { "name": "Theory of Computation", "credits": 4 },
  "22SPC410": { "name": "Database Management Systems Laboratory", "credits": 1.5 },
  "22SPC411": { "name": "System Programming and Operating Systems Laboratory", "credits": 1.5 },
    "22SES511": { "name": "Embedded Computing Systems", "credits": 3 },
    "22SPC512": { "name": "Computer Networks ", "credits": 3 },
    "22SPC513": { "name": "Artificial Intelligence", "credits": 3 },
    "22SPC514": { "name": "Web Programming", "credits": 3 },
    //"22SMC5Z2": { "name": "Constitution of India", "credits": 0 },
    "22SPC515": { "name": "Software Engineering Methodologies", "credits": 4 },
    "22SPC516": { "name": "Computer Networks Laboratory", "credits": 1.5 },
    "22SEE501": { "name": "Embedded Computing Systems Laboratory", "credits": 1.5 }
  }
  },
        "ECE":{
      name: "Electronics & Communication Engineering",
      courses: {
       
        
         // "22LMC1Z0": { "name": "INDUCTION PROGRAMME", "credits": 0 },
          "22LHS1Z1": { "name": "HERITAGE OF TAMILS", "credits": 1 },
          "22LHS1Z2": { "name": "PROFESSIONAL ENGLISH", "credits": 3 },
          "22LBS1Z1": { "name": "LINEAR ALGEBRA AND CALCULUS", "credits": 4 },
          "22LBS1Z2": { "name": "ENGINEERING PHYSICS", "credits": 3 },
          "22LES101": { "name": "PROGRAMMING IN C", "credits": 3 },
        //  "22LMC1Z1": { "name": "ENVIRONMENTAL SCIENCE AND ENGINEERING", "credits": 0 },
          "22LHS1Z3": { "name": "CAMBRIDGE ENGLISH", "credits": 1 },
          "22LBS1Z3": { "name": "PHYSICS LABORATORY", "credits": 1.5 },
          "22LES1Z2": { "name": "WORKSHOP PRACTICE", "credits": 1.5 },
          "22LES103": { "name": "PROGRAMMING IN C LABORATORY", "credits": 1.5 },
          
            "22LHS2Z4": { "name": " TAMILS AND TECHNOLOGY", "credits": 1 },
            "22LHS2Z5": { "name": "VALUES AND ETHICS", "credits": 3 },
            "22LBS204": { "name": "DIFFERENTIAL EQUATIONS AND NUMERICAL METHODS", "credits": 4 },
            "22LBS205": { "name": "SEMICONDUCTOR PHYSICS", "credits": 3 },
            "22LBS206": { "name": "APPLIED CHEMISTRY", "credits": 3 },
            "22LES204": { "name": "BASICS OF ELECTRICAL ENGINEERING", "credits": 3 },
            "22LBS2Z7": { "name": "CHEMISTRY LABORATORY", "credits": 1.5 },
            "22LES2Z5": { "name": "ENGINEERING GRAPHICS", "credits": 3 },
            
              "22LES306": { "name": "CIRCUIT THEORY", "credits": 4 },
              "22LES307": { "name": "DATA STRUCTURES", "credits": 3 },
              "22LPC301": { "name": "SIGNALS AND SYSTEMS", "credits": 4 },
              "22LPC302": { "name": "ANALOG CIRCUITS", "credits": 3 },
              "22LPC303": { "name": "DIGITAL CIRCUITS DESIGN", "credits": 3 },
              "22LPC304": { "name": "ELECTROMAGNETIC WAVES AND WAVEGUIDES", "credits": 3 },
              "22LES308": { "name": "DATA STRUCTURES LABORATORY", "credits": 1.5 },
              "22LPC305": { "name": "ELECTRONIC CIRCUITS AND SIMULATION LABORATORY", "credits": 1.5 },
              
                "22LBS408": { "name": "PROBABILITY AND RANDOM PROCESS", "credits": 4 },
                "22LPC406": { "name": "ANALOG INTEGRATED CIRCUITS", "credits": 3 },
                "22LPC407": { "name": "ANALOG COMMUNICATION", "credits": 3 },
                "22LPC408": { "name": "DIGITAL SIGNAL PROCESSING", "credits": 3 },
                "22LPC409": { "name": "NETWORKS AND TRANSMISSION LINES", "credits": 3 },
                "22LPC410": { "name": "MICROPROCESSOR AND MICROCONTROLLER", "credits": 4 },
                "22LES409": { "name": "ENGINEERING EXPLORATION FOR ELECTRONICS ENGINEERING", "credits": 1.5 },
                "22LPC411": { "name": "ANALOG AND DIGITAL IC LABORATORY", "credits": 1.5 },
                "22LPC412": { "name": "DIGITAL SIGNAL PROCESSING LABORATORY", "credits": 1.5 },
                
                  "22LPC513": { "name": "CONTROL SYSTEM ENGINEERING", "credits": 3 },
                  "22LPC514": { "name": "DIGITAL COMMUNICATION", "credits": 3 },
                  "22LPC515": { "name": "EMBEDDED COMPUTING", "credits": 3 },
                  "22LPC516": { "name": "COMPUTER ARCHITECTURE AND ORGANIZATION", "credits": 3 },
                  "22LPE$XX": { "name": "PROFESSIONAL ELECTIVE I", "credits": 3 },
                //  "22LMC5Z2": { "name": "CONSTITUTION OF INDIA", "credits": 0 },
                  "22LPC517": { "name": "ANALOG AND DIGITAL COMMUNICATION LABORATORY", "credits": 1.5 },
                  "22LPC518": { "name": "EMBEDDED COMPUTING LABORATORY", "credits": 1.5 }
                
      }
    },
    "ME": {
      name: "Mechanical Engineering",
      courses: {
        
         // "22MMC1Z0": { "name": "Induction Programme", "credits": 0 },
          "22MHS1Z1": { "name": "Heritage of Tamils", "credits": 1 },
          "22MHS1Z2": { "name": "Values and Ethics", "credits": 3 },
          "22MBS1Z1": { "name": "Linear Algebra and Calculus", "credits": 4 },
          "22MBS1Z2": { "name": "Engineering Physics", "credits": 3 },
          "22MBS103": { "name": "Engineering Chemistry", "credits": 3 },
          "22MES101": { "name": "Basics of Electrical and Electronics Engineering", "credits": 3 },
          "22MHS1Z3": { "name": "Cambridge English", "credits": 1 },
          "22MBS1Z4": { "name": "Chemistry Laboratory", "credits": 1.5 },
          "22MES1Z2": { "name": "Engineering Graphics", "credits": 3 },
            "22MHS2Z4": { "name": "Tamils and Technology", "credits": 1 },
            "22MHS2Z5": { "name": "Professional English", "credits": 3 },
            "22MBS205": { "name": "Differential Equations and Numerical Methods", "credits": 4 },
            "22MBS206": { "name": "Materials Science", "credits": 3 },
            "22MES203": { "name": "Python Programming", "credits": 3 },
           // "22MMC2Z1": { "name": "Environmental Science and Engineering", "credits": 0 },
           // "NCC Credit Course (Optional)": { "name": "NCC Credit Course", "credits": 0 },
            "22MBS2Z7": { "name": "Physics Laboratory", "credits": 1.5 },
            "22MES2Z4": { "name": "Workshop Practice", "credits": 1.5 },
            "22MES205": { "name": "Python Programming Laboratory", "credits": 1.5 },
              "22MES306": { "name": "Applied Engineering Mechanics", "credits": 3 },
              "22MES307": { "name": "Solid Mechanics", "credits": 3 },
              "22MES308": { "name": "Fluid Mechanics and Machinery (Common to Mech & Prod)", "credits": 3 },
              "22MPC301": { "name": "Manufacturing Technology I", "credits": 3 },
              "22MPC302": { "name": "Materials Engineering and Metallurgy", "credits": 3 },
              "22MPC303": { "name": "Thermodynamics", "credits": 3 },
              "22MES309": { "name": "Electrical and Electronics Engineering Laboratory", "credits": 1.5 },
              "22MES310": { "name": "Material Testing and Fluid Machines Laboratory", "credits": 1.5 },
              "22MPC304": { "name": "Machine Drawing", "credits": 3 },
                "22MBS408": { "name": "Probability and Statistics", "credits": 4 },
                "22MPC405": { "name": "Hydraulics and Pneumatic Controls", "credits": 3 },
                "22MPC406": { "name": "Kinematics of Machines", "credits": 3 },
                "22MPC407": { "name": "Thermal Engineering", "credits": 3 },
                "22MPC408": { "name": "Manufacturing Technology II", "credits": 3 },
                "22MPC409": { "name": "Mechanical Measurements and Control", "credits": 3 },
                "22MPC410": { "name": "Manufacturing Technology Laboratory", "credits": 1.5 },
                "22MPC411": { "name": "Thermal Engineering Laboratory I", "credits": 1.5 },
                "22MES401": { "name": "Engineering Exploration for Mechanical Engineers", "credits": 1.5 },
                  "22MPC512": { "name": "HEAT AND MASS TRANSFER", "credits": 3 },
                  "22MPC513": { "name": "DESIGN OF MACHINE ELEMENTS", "credits": 3 },
                  "22MPC514": { "name": "DYNAMICS OF MACHINES", "credits": 3 },
                  "22MPC515": { "name": "THEORY OF ELASTICITY", "credits": 3 },
                  "22MPE$XX": { "name": "PROFESSIONAL ELECTIVE I", "credits": 3 },
                  //"22MMC5Z2": { "name": "CONSTITUTION OF INDIA (Common to all branches)", "credits": 0 },
                  "22MPC516": { "name": "CAD LABORATORY", "credits": 1.5 },
                  "22MPC517": { "name": "THERMAL ENGINEERING LABORATORY II", "credits": 1.5 },
                  "22MES512": { "name": "DESIGN THINKING FOR MECHANICAL ENGINEERING", "credits": 1.5 }
                }
                 
},
    "CE": {
    name:"Civil Engineering",
    courses: {
      
       // "22CMC1Z0": { "name": "Induction Programme", "credits": 0 },
        "22CHS1Z1": { "name": "Heritage of Tamils", "credits": 1 },
        "22CHS1Z2": { "name": "Values and Ethics", "credits": 3 },
        "22CBS1Z1": { "name": "Linear Algebra and Calculus", "credits": 4 },
        "22CBS1Z2": { "name": "Engineering Physics", "credits": 3 },
        "22CBS103": { "name": "Engineering Chemistry", "credits": 3 },
        "22CES101": { "name": "Basics of Electrical and Electronics Engineering", "credits": 3 },
        "22CHS1Z3": { "name": "Cambridge English", "credits": 1 },
        "22CBS1Z4": { "name": "Chemistry Laboratory", "credits": 1.5 },
        "22CES1Z2": { "name": "Engineering Graphics", "credits": 3 },
          "22CHS2Z4": { "name": "Tamils and Technology", "credits": 1 },
          "22CHS2Z5": { "name": "Professional English", "credits": 3 },
          "22CBS205": { "name": "Differential Equations and Numerical methods", "credits": 4 },
          "22CES203": { "name": "Engineering Mechanics", "credits": 3 },
          "22CES204": { "name": "Programming in C", "credits": 3 },
          //"22CMC2Z1": { "name": "Environmental Science and Engineering", "credits": 0 },
          "22CBS2Z6": { "name": "Physics Laboratory", "credits": 1.5 },
          "22CES2Z5": { "name": "Workshop Practice", "credits": 1.5 },
          "22CES206": { "name": "Programming in C Laboratory", "credits": 1.5 },
            "22CBS307": { "name": "Transform Calculus and Partial Differential Equations", "credits": 4 },
            "22CES307": { "name": "Mechanics of Fluids", "credits": 3 },
            "22CES308": { "name": "Engineering Geology", "credits": 3 },
            "22CPC301": { "name": "Mechanics of Solids I", "credits": 3 },
            "22CPC303": { "name": "Surveying", "credits": 3 },
            "22CPC302": { "name": "Construction Materials and Technology", "credits": 3 },
            "22CES309": { "name": "Materials Testing Laboratory", "credits": 1.5 },
            "22CPC304": { "name": "Survey Laboratory", "credits": 1.5 },          
              "22CES410": { "name": "Applied Hydraulics and Fluid Machinery", "credits": 3 },
              "22CPC405": { "name": "Mechanics of Solids II", "credits": 3 },
              "22CPC406": { "name": "Concrete Technology", "credits": 3 },
              "22CPC407": { "name": "Design of Reinforced Concrete Elements", "credits": 3 },
              "22CPC408": { "name": "Water Supply Engineering", "credits": 3 },
             // "22CMC4Z2": { "name": "Constitution of India (Common to all branches)", "credits": 0 },
              "22CES411": { "name": "Fluid Mechanics and Machinery Laboratory", "credits": 1.5 },
              "22CES412": { "name": "Engineering Exploration", "credits": 1.5 },
              "22CPC409": { "name": "Environmental Engineering Laboratory", "credits": 1.5 },
                "22CPC510": { "name": "Structural Analysis I", "credits": 3 },
                "22CPC511": { "name": "Design of Steel Structures", "credits": 3 },
                "22CPC512": { "name": "Wastewater Engineering", "credits": 3 },
                "22CPC513": { "name": "Highway and Railway Engineering", "credits": 3 },
                "22CPC514": { "name": "Mechanics of Soils", "credits": 4 },
                "22CPE$XX": { "name": "Professional Elective I", "credits": 3 },
                "22CPC515": { "name": "Geotechnical Engineering Laboratory", "credits": 1.5 },
                "22CEE501": { "name": "Concrete and Structural Analysis Laboratory", "credits": 1.5 }
               
    }
   },
   "PE":{
    name:"Production Engineering",
    courses:{
      
      //  "22PMC1Z0": { "name": "Induction Programme", "credits": 0 },
        "22PHS1Z1": { "name": "Heritage of Tamils", "credits": 1 },
        "22PHS1Z2": { "name": "Values and Ethics", "credits": 3 },
        "22PBS1Z1": { "name": "Linear Algebra and Calculus", "credits": 4 },
        "22PBS1Z2": { "name": "Engineering Physics", "credits": 3 },
        "22PBS103": { "name": "Engineering Chemistry", "credits": 3 },
        "22PES101": { "name": "Basics of Electrical and Electronics Engineering", "credits": 3 },
        "22PHS1Z3": { "name": "Cambridge English", "credits": 1 },
        "22PBS1Z4": { "name": "Chemistry Laboratory", "credits": 1.5 },
        "22PES1Z2": { "name": "Engineering Graphics", "credits": 3 },
        
          "22PHS2Z4": { "name": "Tamils and Technology", "credits": 1 },
          "22PHS2Z5": { "name": "Professional English", "credits": 3 },
          "22PBS205": { "name": "Differential Equations and Numerical Methods", "credits": 4 },
          "22PBS206": { "name": "Materials Science", "credits": 3 },
          "22PES203": { "name": "Python Programming", "credits": 3 },
         // "22PMC2Z1": { "name": "Environmental Science and Engineering", "credits": 0 },
          "22PBS2Z7": { "name": "Physics Laboratory", "credits": 1.5 },
          "22PES2Z4": { "name": "Workshop Practice", "credits": 1.5 },
          "22PES205": { "name": "Python Programming Laboratory", "credits": 1.5 },
          
            "22PES306": { "name": "Thermal Systems and Heat Transfer", "credits": 4 },
            "22PES307": { "name": "Engineering Mechanics (Common to CIVIL, EEE & PRODN Branches)", "credits": 3 },
            "22PPC301": { "name": "Machine Tools and Processes", "credits": 3 },
            "22PPC302": { "name": "Engineering Metallurgy", "credits": 3 },
            "22PPC303": { "name": "Manufacturing Technology", "credits": 3 },
           // "22PMC3Z2": { "name": "Constitution of India (Common to all Branches)", "credits": 0 },
            "22PPC304": { "name": "Metallurgy Laboratory and Thermal Science Laboratory", "credits": 1.5 },
            "22PPC305": { "name": "Manufacturing Processes Laboratory", "credits": 1.5 },
            
              "22PBS408": { "name": "Applied Probability and Statistics", "credits": 4 },
              "22PPC406": { "name": "Fluid Mechanics and Machinery", "credits": 3 },
              "22PPC407": { "name": "Mechanics of Materials", "credits": 4 },
              "22PPC408": { "name": "CNC Technology", "credits": 3 },
              "22PPC409": { "name": "Process Planning and Cost Estimation (Common to MECH & PRODN Branches)", "credits": 3 },
              "22PES408": { "name": "Engineering Exploration", "credits": 1.5 },
              "22PPC410": { "name": "Strength of Materials and Fluid Machinery Laboratory", "credits": 1.5 },
              "22PPC411": { "name": "Production Drawing", "credits": 1.5 },
              
                "22PPC512": { "name": "Operations Research Techniques", "credits": 4 },
                "22PPC513": { "name": "Mechanics of Machines", "credits": 4 },
                "22PPC514": { "name": "Metrology and Computer Aided Inspection", "credits": 3 },
                "22PPC515": { "name": "Production Planning and Control", "credits": 3 },
                "22PPC516": { "name": "Theory of Metal Cutting", "credits": 3 },
                "22PPE$XX": { "name": "Professional Elective I", "credits": 3 },
                "22PPC517": { "name": "Metrology Laboratory", "credits": 1.5 },
                "22PPC518": { "name": "Modelling Laboratory", "credits": 1.5 }
              
    }
   },
   "IT": {
    name:"Information Technology",
    courses:{
      
       // "22IMC1Z0": { "name": "Induction Programme", "credits": 0 },
        "22IHS1Z1": { "name": "Heritage of Tamils", "credits": 1 },
        "22IHS1Z2": { "name": "Professional English", "credits": 3 },
        "22IBS1Z1": { "name": "Linear Algebra and Calculus", "credits": 4 },
        "22IBS1Z2": { "name": "Engineering Physics", "credits": 3 },
        "22IES101": { "name": "Programming in C", "credits": 3 },
       // "22IMC1Z1": { "name": "Environmental Science and Engineering", "credits": 0 },
        "22IHS1Z3": { "name": "Cambridge English", "credits": 1 },
        "22IBS1Z3": { "name": "Physics Laboratory", "credits": 1.5 },
        "22IES1Z2": { "name": "Workshop Practice", "credits": 1.5 },
        "22IES103": { "name": "Programming in C Laboratory", "credits": 1.5 },
        
          "22IHS2Z4": { "name": "Tamils and Technology", "credits": 1 },
          "22IHS2Z5": { "name": "Values and Ethics", "credits": 3 },
          "22IBS204": { "name": "Vector Spaces and Differential Equations with MATLAB", "credits": 4 },
          "22IBS205": { "name": "Physics for Information Science", "credits": 3 },
          "22IBS206": { "name": "Applied Chemistry", "credits": 3 },
          "22IES204": { "name": "Basics of Electrical and Electronics Engineering", "credits": 3 },
         // "NCC Credit Course (Optional)": { "credits": 0 },
          "22IBS2Z7": { "name": "Chemistry Laboratory", "credits": 1.5 },
          "22IES2Z5": { "name": "Engineering Graphics", "credits": 3 },
          
            "22IBS308": { "name": "Probability, Random Processes and Queuing Theory", "credits": 4 },
            "22IES306": { "name": "Computer Organization and Architecture", "credits": 3 },
            "22IES307": { "name": "Digital Logic Design", "credits": 3 },
            "22IPC301": { "name": "Data Structures and Algorithms", "credits": 3 },
            "22IPC302": { "name": "Java Programming", "credits": 4 },
            "22IES308": { "name": "Engineering Exploration for Information Technology", "credits": 1.5 },
            "22IES309": { "name": "Digital Logic Design Laboratory", "credits": 1 },
            "22IPC303": { "name": "Data Structures and Algorithms Laboratory", "credits": 1.5 },
            
              "22IES410": { "name": "Elements of Discrete Structures", "credits": 3 },
              "22IPC404": { "name": "Embedded Systems Architecture", "credits": 3 },
              "22IPC405": { "name": "Database Systems", "credits": 3 },
              "22IES411": { "name": "Principles of Communication Engineering", "credits": 3 },
              "22IPC406": { "name": "Design and Analysis of Algorithms", "credits": 4 },
              "22IES412": { "name": "Foundations of Data Science", "credits": 3 },
              "22IPC407": { "name": "Database Systems Laboratory", "credits": 1.5 },
              "22IPC408": { "name": "Embedded Systems Laboratory", "credits": 1.5 },
              
                "22IPC509": { "name": "Computer Networks", "credits": 3 },
                "22IPC510": { "name": "Theory of Computation ", "credits": 4 },
                "22IPC511": { "name": "Artificial Intelligence ", "credits": 3 },
                "22IPC512": { "name": "Operating Systems", "credits": 3 },
                "22IPC513": { "name": "Advanced Programming using Python", "credits": 3 },
                "22IPE$XX": { "name": "Professional Elective - I", "credits": 3 },
                "22IPC514": { "name": "Open Source Tools Laboratory", "credits": 1.5 },
                "22IPC515": { "name": "Computer Networks Laboratory", "credits": 1.5 },
                "22IPC516": { "name": "Operating Systems Laboratory", "credits": 1.5 }
              
    }
   },
   "EEE":{
    name:"Electrical and Electronics Engineering",
    courses:{
      
      //  "22EMC1Z0": { "name": "Induction Programme", "credits": 0 },
        "22EHS1Z1": { "name": "Heritage of Tamils (Common to all Branches)", "credits": 1 },
        "22EHS1Z2": { "name": "Professional English (Common to all Branches)", "credits": 3 },
        "22EBS1Z1": { "name": "Linear Algebra and Calculus (Common to all Branches)", "credits": 4 },
        "22EBS1Z2": { "name": "Engineering Physics (Common to all Branches)", "credits": 3 },
        "22EES101": { "name": "Programming in C (Common to all Branches-Except MECH & PRODN)", "credits": 3 },
      //  "22EMC1Z1": { "name": "Environmental Science and Engineering (Common to all Branches)", "credits": 0 },
        "22EHS1Z3": { "name": "Cambridge English (Common to all Branches)", "credits": 1 },
        "22EBS1Z3": { "name": "Physics Laboratory (Common to all Branches)", "credits": 1.5 },
        "22EES1Z2": { "name": "Workshop Practice (Common to all Branches)", "credits": 1.5 },
        "22EES103": { "name": "Programming in C Laboratory (Common to all Branches-Except MECH & PRODN)", "credits": 1.5 },
        
          "22EHS2Z4": { "name": "Tamils and Technology (Common to all Branches)", "credits": 1 },
          "22EHS2Z5": { "name": "Values and Ethics (Common to all Branches)", "credits": 3 },
          "22EBS204": { "name": "Differential Equations and Numerical Methods", "credits": 4 },
          "22EBS205": { "name": "Applied Chemistry (Common to EEE,ECE,EIE,CSE & IT Branches)", "credits": 3 },
          "22EES204": { "name": "Engineering Mechanics (Common to CIVIL,EEE & PRODN Branches)", "credits": 3 },
          "22EES205": { "name": "Basics of Civil and Mechanical Engineering (Common to EEE & EIE Branches)", "credits": 3 },
         // "NCC Credit Course (Optional)": { "credits": 0 },
          "22EBS2Z6": { "name": "Chemistry Laboratory (Common to all Branches)", "credits": 1.5 },
          "22EES2Z6": { "name": "Engineering Graphics (Common to all Branches)", "credits": 3 },
          
            "22EES307": { "name": "Data Structures (Common to EEE, ECE & CSE)", "credits": 3 },
            "22EPC301": { "name": "Electric Circuit Theory", "credits": 4 },
            "22EPC302": { "name": "Field Theory", "credits": 4 },
            "22EPC303": { "name": "Electronic Devices and Circuits", "credits": 3 },
            "22EPC304": { "name": "Electrical Machines-I", "credits": 3 },
            "22EPC305": { "name": "Digital Circuits", "credits": 3 },
            "22EPC306": { "name": "Electric Circuits and Electronic Devices Laboratory", "credits": 1.5 },
            "22EPC307": { "name": "Electrical Machines Laboratory I", "credits": 1.5 },
            
              "22EBS407": { "name": "Fourier Series and Transform Calculus (Common to EEE & EIE Branches)", "credits": 4 },
              "22EPC408": { "name": "Linear Integrated Circuits", "credits": 3 },
              "22EPC409": { "name": "Electrical Machines-II", "credits": 3 },
              "22EPC410": { "name": "Power Generation, Transmission and Distribution", "credits": 3 },
              "22EPC411": { "name": "Principles of Signals and Systems", "credits": 3 },
              "22EPC412": { "name": "Electrical and Electronic Measurements", "credits": 4 },
              "22EES408": { "name": "Engineering Exploration", "credits": 1.5 },
              "22EPC413": { "name": "Analog Circuits and Digital IC Laboratory", "credits": 1.5 },
              "22EPC414": { "name": "Electrical Machines Laboratory - II", "credits": 1.5 },

            "22EES509": { "name": "Control Systems", "credits": 4 },
            "22EPC515": { "name": "Microprocessors, Microcontrollers and Applications", "credits": 4 },
            "22EPC516": { "name": "Power Electronics", "credits": 3 },
            "22EPC517": { "name": "Electrical Machine Design", "credits": 4 },
            "22EPE$XX": { "name": "Professional Elective - I", "credits": 3 },
            //"22EMC5Z2": { "name": "Constitution of India (Common to all Branches)", "credits": 0 },
            "22EPC518": { "name": "Microprocessors, Microcontrollers and Applications Laboratory", "credits": 1.5 },
            "22EES510": { "name": "Control Systems and Simulation Laboratory", "credits": 1.5 }
             
    }
   },
   "IBT":{
    name:"Industrial BioTechnology",
    courses:{
      
       // "22BMC1Z0": { "name": "Induction Programme", "credits": 0 },
        "22BHS1Z1": { "name": "Heritage of Tamils", "credits": 1 },
        "22BHS1Z2": { "name": "Values and Ethics", "credits": 3 },
        "22BBS1Z1": { "name": "Linear Algebra and Calculus", "credits": 4 },
        "22BBS1Z2": { "name": "Engineering Physics", "credits": 3 },
        "22BBS103": { "name": "Chemistry for Biotechnology", "credits": 3 },
        "22BES101": { "name": "Basics of Electrical and Electronics Engineering", "credits": 3 },
        "22BHS1Z3": { "name": "Cambridge English", "credits": 1 },
        "22BBS1Z4": { "name": "Chemistry Laboratory", "credits": 1.5 },
        "22BES1Z2": { "name": "Engineering Graphics", "credits": 3 },
        
          "22BHS2Z4": { "name": "Tamils and Technology", "credits": 1 },
          "22BHS2Z5": { "name": "Professional English", "credits": 3 },
          "22BBS205": { "name": "Differential Equations and Numerical Methods", "credits": 4 },
          "22BES203": { "name": "Programming in C", "credits": 3 },
          "22BPC201": { "name": "Biomolecules", "credits": 3 },
         // "22BMC2Z1": { "name": "Environmental Science and Engineering", "credits": 0 },
          //"NCC Credit Course (Optional)": { "credits": 0 },
          "22BBS2Z6": { "name": "Physics Laboratory", "credits": 1.5 },
          "22BES2Z4": { "name": "Workshop Practice", "credits": 1.5 },
          "22BES205": { "name": "Programming in C Laboratory", "credits": 1.5 },
    
            "22BBS307": {
              "name": "Transform Calculus and Partial Differential Equations",
              "credits": 4
            },
            "22BBS308": {
              "name": "Cell Biology",
              "credits": 3
            },
            "22BES306": {
              "name": "Process Calculations and Heat Transfer",
              "credits": 4
            },
            "22BPC302": {
              "name": "Industrial Microbiology",
              "credits": 3
            },
            "22BPC303": {
              "name": "Biochemistry",
              "credits": 3
            },
            "22BPC304": {
              "name": "Genetics",
              "credits": 3
            },
            "22BBS309": {
              "name": "Cell Biology Laboratory",
              "credits": 1.5
            },
            "22BPC305": {
              "name": "Microbiology Laboratory",
              "credits": 1.5
            },
            "22BPC306": {
              "name": "Biochemistry Laboratory",
              "credits": 1.5
            },
            
              "22BES407": { "name": "Fluid Mechanics", "credits": 3 },
              "22BPC407": { "name": "Molecular Biology", "credits": 3 },
              "22BPC408": { "name": "Biochemical Thermodynamics", "credits": 3 },
              "22BPC409": { "name": "Enzyme Engineering and Technology", "credits": 3 },
              "22BPC410": { "name": "Analytical Techniques in Biotechnology", "credits": 4 },
              "22BES408": { "name": "Engineering Exploration for Industrial Biotechnology", "credits": 1.5 },
              "22BES409": { "name": "Chemical Engineering Laboratory", "credits": 1.5 },
              "22BPC411": { "name": "Molecular Biology Laboratory", "credits": 1.5 },
              
                "22BES510": { "name": "Mass Transfer Operations", "credits": 4 },
                "22BPC512": { "name": "Bioprocess Principles", "credits": 3 },
                "22BPC513": { "name": "Genetic Engineering", "credits": 3 },
                "22BPC514": { "name": "Protein Engineering", "credits": 3 },
                "22BPE$XX": { "name": "Professional Elective I", "credits": 3 },
               // "22BMC5Z2": { "name": "Constitution of India", "credits": 0 },
                "22BPC515": { "name": "Bioprocess Laboratory I", "credits": 1.5 },
                "22BPC516": { "name": "Genetic Engineering Laboratory", "credits": 1.5 }
              
          
    }
   },
   "EIE":{
    name:"Electrical and Instrumental Engineering",
    courses:{
      
       // "22NMC1Z0": { "name": "Induction Programme", "credits": 0 },
        "22NHS1Z1": { "name": "Heritage of Tamils", "credits": 1 },
        "22NHS1Z2": { "name": "Professional English", "credits": 3 },
        "22NBS1Z1": { "name": "Linear Algebra and Calculus", "credits": 4 },
        "22NBS1Z2": { "name": "Engineering Physics", "credits": 3 },
        "22NES101": { "name": "Programming in C", "credits": 3 },
       // "22NMC1Z1": { "name": "Environmental Science and Engineering", "credits": 0 },
        "22NHS1Z3": { "name": "Cambridge English", "credits": 1 },
        "22NBS1Z3": { "name": "Physics Laboratory", "credits": 1.5 },
        "22NES1Z2": { "name": "Workshop Practice", "credits": 1.5 },
        "22NES103": { "name": "Programming in C Laboratory", "credits": 1.5 },
        
          "22NHS2Z4": { "name": "Tamils and Technology", "credits": 1 },
          "22NHS2Z5": { "name": "Values and Ethics", "credits": 3 },
          "22NBS204": { "name": "Differential Equations and Numerical Methods", "credits": 4 },
          "22NBS205": { "name": "Physics of Materials", "credits": 3 },
          "22NBS206": { "name": "Applied Chemistry", "credits": 3 },
          "22NES204": { "name": "Basics of Civil and Mechanical Engineering", "credits": 3 },
         // "NCC Credit Course (optional)": { "credits": 0 },
          "22NBS2Z7": { "name": "Chemistry Laboratory", "credits": 1.5 },
          "22NES2Z5": { "name": "Engineering Graphics", "credits": 3 },
          
            "22NES306": { "name": "Thermodynamics and Fluid Mechanics", "credits": 4 },
            "22NPC301": { "name": "Electrical Circuits and Networks", "credits": 4 },
            "22NPC302": { "name": "Analog Electronics", "credits": 3 },
            "22NPC303": { "name": "Sensors and Transducers", "credits": 3 },
            "22NPC304": { "name": "Electrical and Electronic Measurement Techniques", "credits": 3 },
            //"22NMC3Z2": { "name": "Constitution of India (Common to All Branches)", "credits": 0 },
            "22NES307": { "name": "Engineering Exploration", "credits": 1.5 },
            "22NPC305": { "name": "Sensors and Measurements Laboratory", "credits": 1.5 },
            "22NPC306": { "name": "Electrical and Electronic Circuits Laboratory", "credits": 1.5 },
            
              "22NBS408": { "name": "Fourier Series and Transform Calculus", "credits": 4 },
              "22NES408": { "name": "Electrical Machines", "credits": 3 },
              "22NPC407": { "name": "Electronics for Analog Signal Processing", "credits": 3 },
              "22NPC408": { "name": "Digital Electronics", "credits": 3 },
              "22NPC409": { "name": "Industrial Instrumentation", "credits": 3 },
              "22NPC410": { "name": "Fundamentals of Signals and Systems", "credits": 3 },
              "22NPC411": { "name": "Analog and Digital Circuits Laboratory", "credits": 1.5 },
              "22NPC412": { "name": "Virtual Instrumentation Laboratory", "credits": 1.5 },
                "22NPC513": { "name": "Control System Design", "credits": 4 },
                "22NPC514": { "name": "Fundamentals of Digital Signal Processing", "credits": 3 },
                "22NPC515": { "name": "Microprocessors, Microcontrollers and Interfacing", "credits": 3 },
                "22NPC516": { "name": "Principles of Communication Systems", "credits": 3 },
                "22NPC517": { "name": "Industrial Hydraulics and Pneumatics", "credits": 3 },
                "22NPE$XX": { "name": "Professional Elective - I", "credits": 3 },
                "22NPC518": { "name": "Control System Design Laboratory", "credits": 1.5 },
                "22NPC519": { "name": "Microprocessors, Microcontrollers and Interfacing Laboratory", "credits": 1.5 },
                "22NPC520": { "name": "Industrial Instrumentation Laboratory", "credits": 1 }
              
    }
   }



  };
  
  
  const pdfStyles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Helvetica',
      backgroundColor: '#ffffff',
    },
    pageMargin: {
      margin: 20,
      padding: 20,
      border: '2px solid #2563eb',
      flex: 1,
      position: 'relative',
    },
    innerMargin: {
      border: '1px solid #e5e7eb',
      padding: 15,
      flex: 1,
    },
    header: {
      marginBottom: 30,
      borderBottomWidth: 2,
      borderBottomColor: '#2563eb',
      paddingBottom: 10,
    },
    title: {
      fontSize: 28,
      marginBottom: 10,
      textAlign: 'center',
      color: '#1e40af',
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 20,
      marginBottom: 15,
      marginTop: 25,
      color: '#1e40af',
      borderLeftWidth: 4,
      borderLeftColor: '#2563eb',
      paddingLeft: 10,
      backgroundColor: '#f0f7ff',
      padding: 8,
    },
    courseRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
      borderBottomStyle: 'solid',
      paddingVertical: 10,
      minHeight: 40,
      alignItems: 'center',
    },
    courseHeader: {
      flexDirection: 'row',
      backgroundColor: '#2563eb',
      paddingVertical: 10,
      paddingHorizontal: 5,
      marginBottom: 10,
      borderRadius: 4,
    },
    headerText: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    col1: { 
      width: '20%',
      paddingLeft: 5,
    },
    col2: { 
      width: '40%',
      paddingLeft: 5,
    },
    col3: { 
      width: '20%',
      paddingLeft: 5,
    },
    col4: { 
      width: '20%',
      paddingLeft: 5,
    },
    gpaSection: {
      marginTop: 20,
      padding: 15,
      backgroundColor: '#f0f7ff',
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#2563eb',
    },
    gpaSectionTitle: {
      fontSize: 14,
      color: '#1e40af',
      marginBottom: 8,
      fontWeight: 'bold',
    },
    gpaValue: {
      fontSize: 16,
      color: '#2563eb',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    cgpa: {
      marginTop: 40,
      padding: 20,
      backgroundColor: '#1e40af',
      borderRadius: 8,
    },
    cgpaLabel: {
      fontSize: 16,
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: 5,
    },
    cgpaValue: {
      fontSize: 24,
      color: '#ffffff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 30,
      right: 30,
      textAlign: 'center',
      color: '#6b7280',
      fontSize: 10,
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
      paddingTop: 10,
    },
    pageNumber: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      fontSize: 10,
      color: '#6b7280',
    },
    studentInfo: {
      marginBottom: 20,
      padding: 15,
      backgroundColor: '#f8fafc',
      borderRadius: 6,
    },
    infoRow: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    infoLabel: {
      width: '30%',
      color: '#64748b',
      fontSize: 12,
    },
    infoValue: {
      width: '70%',
      color: '#0f172a',
      fontSize: 12,
      fontWeight: 'bold',
    },
    summaryBox: {
      marginTop: 20,
      padding: 15,
      backgroundColor:"#f0f7ff",
      borderRadius: 6,
      borderLeftWidth: 4,
      borderLeftColor: '#2563eb',
    },
    warningText: {
      color: '#dc2626',
      fontSize: 10,
      marginTop: 5,
      textAlign: 'center',
    },
  });


const PDFReport = ({ department, semesters, calculateSemesterGPA, calculateCGPA }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>CGPA REPORT</Text>
      <Text style={{ fontSize: 16, marginBottom: 20, textAlign: 'center' }}>
        Department: {departmentDatabase[department].name}
      </Text>
      
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


  const [selectedDepartment, setSelectedDepartment] = useState('');
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
    const [isCustomCourse, setIsCustomCourse] = useState(false);
  
    const handleDepartmentChange = (e) => {
      const department = e.target.value;
      setSelectedDepartment(department);
      // Reset all other states when department changes
      setSemesters([]);
      setCurrentSemester({
        number: '',
        courses: []
      });
      setNewCourse({
        code: '',
        name: '',
        credits: '',
        grade: ''
      });
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      
      if (name === 'code'&&!isCustomCourse) {
        // Auto-fill course details when code is entered
        const courseInfo = selectedDepartment && 
          departmentDatabase[selectedDepartment].courses[value.toUpperCase()];
        
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
  
    const toggleCourseMode = () => {
      setIsCustomCourse(!isCustomCourse);
      setNewCourse({
        code: '',
        name: '',
        credits: '',
        grade: ''
      });
    };
  
  
    const handleSemesterNumberChange = (e) => {
      setCurrentSemester(prev => ({
        ...prev,
        number: e.target.value
      }));
    };
  
    const addCourse = () => {
      if (newCourse.code && newCourse.name && newCourse.credits >0 && newCourse.grade) {
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
      else{
        alert("Please fill the course details correctly");
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
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Semester-wise GPA Calculator
        </h1>
        
        {/* Department Selection */}
        <div className="mb-8">
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
            Select Department
          </label>
          <select
            id="department"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Select a department</option>
            {Object.keys(departmentDatabase).map(deptCode => (
              <option key={deptCode} value={deptCode}>
                {departmentDatabase[deptCode].name} ({deptCode})
              </option>
            ))}
          </select>
        </div>

        {selectedDepartment && (
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
              <span className="text-gray-600">
                Current Semester: {currentSemester.courses.length} courses
              </span>
            </div>

            {/* Course Input Form */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <input
                name="code"
                placeholder="Course Code"
                value={newCourse.code}
                onChange={handleInputChange}
                className="col-spal-1 md:col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none uppercase"
                list="course-codes"
              />
              <datalist id="course-codes">
                {selectedDepartment && 
                  Object.keys(departmentDatabase[selectedDepartment].courses).map(code => (
                    <option key={code} value={code} />
                  ))
                }
              </datalist>
              <input
                name="name"
                placeholder="Course Name"
                value={newCourse.name}
                onChange={handleInputChange}
                className="col-span-1 md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                readOnly={!isCustomCourse}
              />
              <input
                name="credits"
                type="number"
                placeholder="Credits"
                value={newCourse.credits}
                onChange={handleInputChange}
                className="col-span-1 md:col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                readOnly={!isCustomCourse}
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
                className=" col-span-1 md:col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
             {/* Toggle Custom Course Mode */}
             <div className="flex gap-4">
                            <button
                                onClick={toggleCourseMode}
                                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                            >
                                {isCustomCourse ? 'Auto-fill Mode' : 'Add Electives'}
                            </button>
                        </div>

            {/* Add Course and Save Semester Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={addCourse}
                disabled={!newCourse.code || !newCourse.grade}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200"
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1">
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
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
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
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {semester.courses.map((course, courseIndex) => (
              <div key={courseIndex} className="grid grid-cols-1 md:grid-cols-5 gap-4 py-2 border-b border-gray-200 last:border-0">
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

    {/* CGPA Display */}
    <div className="mt-8 p-6 bg-blue-50 rounded-lg">
      <h2 className="text-2xl font-bold text-center text-blue-800">
        Cumulative GPA: {calculateCGPA()}/10
      </h2>
      <div className="text-sm text-gray-600 mt-2 text-center">
        Total Semesters: {semesters.length}
      </div>
    </div>

    {/* PDF Download Button */}
    <div className="mt-8">
      <PDFDownloadLink
        document={
          <PDFReport 
            department={selectedDepartment}
            semesters={semesters}
            calculateSemesterGPA={calculateSemesterGPA}
            calculateCGPA={calculateCGPA}
          />
        }
        fileName={`${selectedDepartment}_academic_report.pdf`}
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
  </div>
)}
          </div>
        )}
      </div>
    </div>
  );
};

export default SemesterGPACalculator;