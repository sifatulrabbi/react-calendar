import React from "react";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";

import Calendar from "./components/Calendar";

dayjs.extend(calendar);

const App: React.FC = () => {
  return (
    <div className="w-full min-h-screen p-4 text-gray-600">
      <Calendar />
      <div className="mt-6"></div>
    </div>
  );
};

export default App;
