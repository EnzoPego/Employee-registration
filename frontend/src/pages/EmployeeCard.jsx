import { useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPencil, faPenToSquare } from "@fortawesome/free-solid-svg-icons";


export const EmployeeCard = ({ employees, fetchEmployees }) => {

    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState("");
    const [updatingEmployeeId, setUpdatingEmployeeId] = useState(null);
   
  
    const handleUpdate = async (id) => {
        let updateData = {};
        if (newName !== "") {
          updateData.name = newName;
        }
        if (newAge !== "") {
          updateData.age = newAge;
        }
    
        try {
          await axios.put(`http://localhost:3001/employees`, { ...updateData, id: id });
          console.log("Employee was updated");
          setUpdatingEmployeeId(null);
          fetchEmployees();
        } catch (err) {
          console.log("Unable to update employee");
        }
    };

    
    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:3001/employees/${id}`);
          console.log("Employee deleted");
          fetchEmployees();
        } catch (err) {
          console.log("Unable to delete employee");
        }
    };

  return (
    <>
    {employees.map((employee) => (
        <div className="container max-w-3xl px-4 mx-auto sm:px-8" key={employee.id}>
          <div className="py-2">
            <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-300 uppercase bg-gray-800">Name</th>
                      <th scope="col" className="px-5 py-3 text-sm font-normal text-center text-gray-300 uppercase bg-gray-800">Age</th>
                      <th scope="col" className="px-5 py-3 text-sm font-normal text-center text-gray-300 uppercase bg-gray-800">Edit </th>
                      <th scope="col" className="px-5 py-3 text-sm font-normal text-center text-gray-300 uppercase bg-gray-800">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-2 py-5 text-sm bg-gray-400  border-gray-200">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap font-semibold">
                              {employee.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm bg-gray-400 border-gray-200 font-semibold">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {employee.age}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-gray-400 border-gray-200">
                        <button onClick={() => { setUpdatingEmployeeId(employee.id);  setNewName(employee.name); setNewAge(employee.age);}} >
                          <FontAwesomeIcon icon={faPencil} size="lg" style={{ color: "#FFD43B", }} />
                        </button>
                        {updatingEmployeeId === employee.id && (
                          <div>
                            <input
                              className="w-[180px] h-[30px] bg-zinc-600 p-2 text-white rounded-lg border-gray-800 border mt-4 mb-4 mr-2"
                              type="text"
                              placeholder="Name :"
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                            />
                            <input
                              className="w-[180px] h-[30px] bg-zinc-600 p-2 text-white rounded-lg border-gray-800 border"
                              type="number" placeholder="Age :"
                              value={newAge}
                              onChange={(e) => setNewAge(e.target.value)}
                            /> 
                            <button onClick={() => handleUpdate(employee.id)} className="text-lime-900 font-bold  mt-2" >
                              <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#365316", marginRight: "0.2rem" }} />
                              Update
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-5 text-sm bg-gray-400 border-gray-200">
                        <button onClick={() => handleDelete(employee.id)}>
                          <FontAwesomeIcon icon={faTrashCan} size="lg" style={{ color: "#bd0000" }} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ))}  
    </>   
  )
}

