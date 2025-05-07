"use client"
import React, { useEffect, useState } from 'react'
import AddNewStudents from './_components/AddNewStudents'
import GlobalApi from '@/app/_services/GlobalApi'
import StudentListTable from './_components/StudentListTable'

function Student() {
 const [studentList , setStudentList]=useState([]);


  useEffect(()=>{
    GetAllStudents();
  },[])

  //use to get all thwe students
  const GetAllStudents=()=>{
    GlobalApi.GetAllStudents().then(resp=>{
      setStudentList(resp.data)
    })
  }
  return (
    <div className='p-4'>
      <h2 className='font-bold text-2xl flex justify-between items-center '>Students
      <AddNewStudents refreshData={GetAllStudents}/>
      </h2>
      <StudentListTable studentList={studentList}
      refreshData={GetAllStudents}/>
    </div>
  )
}

export default Student