import Payment from "@/components/Payment";
import React from "react";

const page = () => {
  return (
    <>
      <div className="text-center h-screen flex flex-col justify-center items-center space-y-6">
        <h1 className="text-3xl font-bold">Welcome to my shop</h1>
        <p>This is the best shop ever!</p>
        <Payment />
       
      </div>
    </>
  );
};

export default page;
