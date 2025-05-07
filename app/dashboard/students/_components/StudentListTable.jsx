"use client";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule, PaginationModule , TextFilterModule, ValidationModule,QuickFilterModule} from "ag-grid-community";

import "ag-grid-community/styles/ag-theme-quartz.css"; // ✅ Only theme CSS (no base ag-grid.css)

import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

// Register required modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  ValidationModule,
  QuickFilterModule,
  TextFilterModule,
]);

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 50, 100];

function StudentListTable({ studentList , refreshData }) {
  const CustomButtons = (props) => (
    (
      <AlertDialog>
  <AlertDialogTrigger >
    <Button size="sm" variant="destructive">
      <Trash />
    </Button>
    </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your record
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>DeleteRecord(props?.data?.id)}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    )
  );

  const [columnDefs, setColumnDefs] = useState([
    { field: "id" },       // Number filter for IDs
    { field: "name", filter: "agTextColumnFilter" },        // Text filter for names
    { field: "address", filter: "agTextColumnFilter" },     // Text filter for addresses
    { field: "contact", filter: "agTextColumnFilter" },     // Text filter for contacts    
    { field: "Action", cellRenderer: CustomButtons },
  ]);

  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (studentList) setRowData(studentList);
  }, [studentList]);

  const DeleteRecord=(id)=>{
    GlobalApi.DeleteStudentRecord(id).then(resp=>{
      if(resp){
        toast('Record deleted successfully..!')
        refreshData()
      }
    })
  }
  return (
  

    <div className="my-7">
      <div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
        <div className="p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm">
          <Search />
          <input
            type="text"
            placeholder="Search on anything..."
            className="outline-none w-full"
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          quickFilterText={searchInput}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
}

export default StudentListTable;
