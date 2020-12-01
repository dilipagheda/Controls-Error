import React from "react";

import Card from "./Card";
import Button from "./Button";

export default ({ onTryAgain, children }) => (
  <div className="fixed top-0 left-0 w-screen h-screen">
    <div className="bg-black opacity-75 w-full h-full" />
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <Card>
        <div className="px-8 py-4">
          <p className="uppercase text-center font-medium tracking-widest text-gray-600">
            error
          </p>
          <p className="uppercase text-center tracking-widest text-3xl mb-40">
            {children}
          </p>
          <Button onClick={onTryAgain}>try again</Button>
        </div>
      </Card>
    </div>
  </div>
);
