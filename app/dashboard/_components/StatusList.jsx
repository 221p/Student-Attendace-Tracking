"use client"
import { getUniqueRecord } from '@/app/_services/service';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';


function StatusList({attendenceList}) {
  const [totalStudent , setTotalStudent] = useState(0);
  const[presentPerc , setPresentPerc]=useState(0);

  useEffect(()=>{
    if(attendenceList){
          const totalSt=getUniqueRecord(attendenceList);
          setTotalStudent(totalSt.length);

          const today = moment().format('D');
          const PresentPrec = (attendenceList.length/(totalSt.length*Number(today))*100)
          setPresentPerc(PresentPrec);
    }

  },[attendenceList])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
      <Card icon={<GraduationCap/>} title='Total Student' value={totalStudent}/>
      <Card icon={<TrendingUp/>} title='Total  Present' value={presentPerc.toFixed(1)+"%"}/>
      <Card icon={<TrendingDown/>} title="Total  Absent" value={(100-presentPerc).toFixed(1)+"%"}/>
    </div>
  )
}

export default StatusList