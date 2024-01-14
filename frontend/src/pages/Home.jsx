import { useState, useEffect } from "react";
import axios from "axios";

import { Form } from "./Form";
import { EmployeeCard } from "./EmployeeCard";

export const Home = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:3001/employees");
      setEmployees(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <Form fetchEmployees={fetchEmployees} />
      <div className="text-center text-zinc-300 p-5 ">
        <h1 className="text-3xl">EMPLOYEES</h1>
        <div>
          <EmployeeCard employees={employees} fetchEmployees={fetchEmployees} />
        </div>
      </div>
    </>
  );
};

