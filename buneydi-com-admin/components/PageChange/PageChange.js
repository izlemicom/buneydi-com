import React from "react";

// reactstrap components
// import { Spinner } from "reactstrap";

// core components

export default function PageChange(props) {
  return (
    <div>
      <div className="my-32 mx-auto max-w-sm text-center relative z-50 top-0">
        <div className="block mb-4">
          <i className="fas fa-circle-notch animate-spin text-black mx-auto text-6xl"></i>
        </div>
        <h4 className="text-lg font-medium text-black">
          Sayfa Yükleniyor: {props.path}
        </h4>
      </div>
    </div>
  );
}
