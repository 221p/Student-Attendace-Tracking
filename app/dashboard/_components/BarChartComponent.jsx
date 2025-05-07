import { getUniqueRecord } from '@/app/_services/service';
import { set } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function BarChartComponent({ attendaceList, totalPresentData }) {

  const[data , setData] = useState();

  useEffect(()=>{
    formatAttendanceListCount();
  },[attendaceList || totalPresentData])

  const formatAttendanceListCount=()=>{
    const totalStudent = getUniqueRecord(attendaceList);
    const result = totalPresentData.map((item=>({
      day:item.day,
      presentCount:item.presentCount,
      absentCount:Number(totalStudent?.length)-Number(item.presentCount)
    })));
    console.log(result)
    setData(result)
  }
  return (
    <div>
      <ResponsiveContainer width={'100%'} height={300}>
      <BarChart  data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="presentCount" name="Total Prsent" fill="#8884d8" />
        <Bar dataKey="absentCount" name="Total Absent" fill="#82ca9d" />
      </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartComponent