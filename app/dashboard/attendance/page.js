"use client"
import GradeSelect from '@/app/_component/GradeSelect'
import MonthSelection from '@/app/_component/MonthSelection'
import GlobalApi from '@/app/_services/GlobalApi'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import React, { useState } from 'react'
import AttendanceGrid from './_components/AttendanceGrid'

function Attendance() {
  const [selectedMonth, setselectedMonth] = useState();
  const [selectedGrade, setselectedGrade] = useState();
  const [attendanceList , setattendanceList] = useState();

  // use to fetch attendance list for given Month and Grade  // date:3 may
  const onSearchHandler = () => {
    
    const month = moment(selectedMonth).format('MM/yyyy');
   
    GlobalApi.GetAttendaceList(selectedGrade , month).then(resp=>{
      setattendanceList(resp.data);
    })
  }
  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>Attendance</h2>

      {/* Search Option */}
      <div className='flex gap-4 p-3 border rounded-lg'>
        <div className='flex gap-4 items-center'>
          <label>Select Month:</label>
          <MonthSelection selectedMonth ={(value) => setselectedMonth(value)} />
        </div>
        <div className='flex gap-3 items-center'>
          <label>Select Grade:</label>
          <GradeSelect selectedGrade={(v) => setselectedGrade(v)} />
        </div>
        <Button
          onClick={() => onSearchHandler()}
        >Search</Button>
      </div>



      {/* Student Attendance Grid */}
      <AttendanceGrid attendanceList={attendanceList}
      selectedMonth={selectedMonth}
      />
    </div>
  )
}

export default Attendance