import corsU from "cors";
import { format } from "date-fns";

export const getServerTime = () => { 
  return `Server times: ${format(new Date(), "d/MM/yyyy - hh:mmaaa")}\n`; 
};

export const cors = corsU({
  origin: (origin, callback) => {
    // console.log(origin)
    if (["http://localhost:3000", "http://localhost"].indexOf(origin ?? "") !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
});
