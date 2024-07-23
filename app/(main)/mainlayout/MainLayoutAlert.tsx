"use client";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  show: boolean;
  setisAlertVisible: Dispatch<SetStateAction<boolean>>;
};

const MainLayoutAlert = ({ show, setisAlertVisible }: Props) => {
  return (
    <AlertDialog open={show} onOpenChange={() => setisAlertVisible(false)}>
      {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-400">Please select Plant and Line!</AlertDialogTitle>
          <AlertDialogDescription>
            You are not selected Plant number and production line number, Please
            select it first then press the search button.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
          <AlertDialogAction className="bg-slate-300 hover:text-white text-blue-900">
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MainLayoutAlert;
