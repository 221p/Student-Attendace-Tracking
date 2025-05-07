"use client"
import React, { useEffect, useState } from 'react'
import MonthSelection from '../_component/MonthSelection'
import GradeSelect from '../_component/GradeSelect'
import GlobalApi from '../_services/GlobalApi'
import moment from 'moment'
import StatusList from './_components/StatusList'
import BarChartComponent from './_components/BarChartComponent'


function Dashboard() {
  
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendaceList, setAttendanceList] = useState();
  const [totalPresentData, setTotalPresentData] = useState([]);

  useEffect(() => {
    getStudentAttendance();
    GetTotalPresentCountByDay();
  }, [selectedMonth])
  useEffect(() => {
   
    getStudentAttendance();
    GetTotalPresentCountByDay();
  }, [selectedGrade])

  const getStudentAttendance=()=>{
    GlobalApi.GetAttendaceList(selectedGrade , moment(selectedMonth).format('MM/yyyy'))
    .then(resp=>{
      setAttendanceList(resp.data);
    })
  }

  const GetTotalPresentCountByDay = ()=>{
    GlobalApi.TotalPresentCountByDay(moment(selectedMonth).format('MM/yyyy').selectedGrade)
    .then(resp=>{
      setTotalPresentData(resp.data);
    })
  }

  return (
    <div className='p-10'>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>

        <div className='flex items-center gap-4'>
          <MonthSelection selectedMonth={setSelectedMonth} />
          <GradeSelect selectedGrade={(value)=>setSelectedGrade(value)} />
        </div>
      </div>
      <StatusList attendenceList={attendaceList}/>
      <div className='grid grid-cols-1 md:grid-cols-3'>
        <div className='md:col-span-2'>
          <BarChartComponent attendaceList={attendaceList}
          totalPresentData={totalPresentData}
          />
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard