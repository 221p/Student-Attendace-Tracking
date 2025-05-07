"use client"
import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule, PaginationModule, TextFilterModule, ValidationModule, QuickFilterModule, CheckboxEditorModule  } from "ag-grid-community";
import moment from 'moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { getUniqueRecord } from '@/app/_services/service';

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 50, 100];

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CheckboxEditorModule,
  QuickFilterModule,
  TextFilterModule,
  PaginationModule,
  

]);

function AttendanceGrid({ attendanceList, selectedMonth }) {
  const [rowData, setRowData] = useState([]);
  const [colDef, setcolDef] = useState([
    { field: 'studentId' , filter: true },
    { field: 'name', filter: true }
  ])

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const numberOfDays = daysInMonth(moment(selectedMonth).format('yyyy'), moment(selectedMonth).format('MM'));
  const daysArrays = Array.from({ length: numberOfDays }, (_, i) => i + 1)


  useEffect(() => {
    if (attendanceList) {
      const userList = getUniqueRecord(attendanceList);
      setRowData(userList);
      daysArrays.forEach((date) => {
        setcolDef(prevData => [...prevData, {
          field:date.toString(), width: 50, editable: true,
        }])
        userList.forEach(obj => {
          obj[date] = isPresent(obj.StudentId, date)
        })
      })
    }
  }, [attendanceList])

  // To checck the student Present or not
  const isPresent = (studentId, day) => {
    const result = attendanceList.find(item => item.day == day && item.StudentId == studentId);
    return result ? true : false
  }

  //Used to get Distinct User List
 
  

  // used to MArk Student Attendance
  const onMarkAttendance=(day , studentId , presentStatus) => {
    const date = moment(selectedMonth).format('MM/yyyy')
    if(presentStatus){

      const data ={
        day:day,
        studentId:studentId,
        present:presentStatus,
        date:date
      }
      console.log(data);
      GlobalApi.MarkAttendance(data).then(resp=>{
        console.log(resp);
        toast("Student Id: " +studentId+" Marked as Present");
    })

  }
  else{
    GlobalApi.MarkAbsent(studentId , day , date)
    .then(resp=>{
      toast("Student Id: " +studentId+" Marked as Absent");
    })
  }
}

  return (
    <div>
      <div style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDef}
          onCellValueChanged={(e)=>onMarkAttendance(e.colDef.field , e.data.studentId , e.newValue)}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>  
  )
}

export default AttendanceGrid 