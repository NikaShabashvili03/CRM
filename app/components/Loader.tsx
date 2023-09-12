'use client';

import { Circles } from "react-loader-spinner";

const Loader = () => {
  return ( 
    <div
    className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <Circles
        height="80"
        width="80"
        color="indigo"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
    </div>
   );
}
 
export default Loader;