import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPencil,faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [updatingEmployeeId, setUpdatingEmployeeId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get("http://localhost:3001/employees").then((res) => {
      setEmployees(res.data);
      console.log(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/create", { name, age })
      .then(() => {
        console.log("Enployee Added");
        setName("");
        setAge("");
        fetchEmployees();
      })
      .catch((error) => {
        console.log("Unable to add employee");
      });
  };

  const handleUpdate = (id) => {
    let updateData = {};
    if (newName !== "") {
      updateData.name = newName;
    }
    if (newAge !== "") {
      updateData.age = newAge;
    }
    
    axios
      .put(`http://localhost:3001/employees`, { ...updateData, id: id })
      .then(() => {
        console.log("Employee was updated");
        setUpdatingEmployeeId(null);
        fetchEmployees();
      })
      .catch((error) => {
        console.log("Unable to update employee");
      });
  };
  

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/employees/${id}`)
      .then(() => {
        console.log("Employee deleted");
        fetchEmployees();
      })
      .catch((error) => {
        console.log("Unable to delete employee");
      });
  };

  return (
    <div className="w-full h-[1200px]">
      <h1 className="text-center text-zinc-300 p-5 text-3xl">EMPLOYEE FORM</h1>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          {/* EMPLOYEE name Input */}
          <label className="text-white">Employee Name</label>
          <br />
          <input
            className="w-[400px] h-[40px] bg-zinc-600 p-2 text-white rounded-lg border-orange-600 border"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
          {/* EMPLOYEE age Input */}
          <label className="text-white">Employee Age</label>
          <br />
          <input
            className="w-[400px] h-[40px] bg-zinc-600 p-2 text-white rounded-lg border-orange-600 border"
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <br />
          <br />
          <button
            className="text-white w-[400px] h-[40px] border bg-[#1a1a1a] hover:bg-zinc-800 "
            type="submit"
          >
            Submit Form
          </button>
        </form>
      </div>
      <br />
      <br />
      <hr />
      <br />
      <div className="text-center text-zinc-300 p-5 ">
        <h1 className="text-3xl">EMPLOYEES</h1>
        <div>
        {employees.map((employee) => (
  <div class="container max-w-3xl px-4 mx-auto sm:px-8">
    <div class="py-2">
      <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="px-5 py-3 text-sm font-normal text-left text-gray-300 uppercase bg-gray-800 "
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 text-sm font-normal text-center text-gray-300 uppercase bg-gray-800 "
                >
                  Age
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 text-sm font-normal text-center text-gray-300 uppercase bg-gray-800 "
                >
                  Edit
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 text-sm font-normal text-center text-gray-300 uppercase bg-gray-800 "
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-2 py-5 text-sm bg-gray-400  border-gray-200">
                  <div class="flex items-center">
                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-no-wrap font-semibold">
                        {employee.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-5 text-sm bg-gray-400 border-gray-200 font-semibold">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {employee.age}
                  </p>
                </td>
                <td class="px-5 py-5 text-sm bg-gray-400 border-gray-200">
                  <button
                    onClick={() => {
                      setUpdatingEmployeeId(employee.id);
                      setNewName(employee.name);
                      setNewAge(employee.age);
                    }}
                  >
                    <FontAwesomeIcon icon={faPencil} size="lg" style={{color: "#FFD43B",}} />
                  </button>
                  {updatingEmployeeId === employee.id && (
                    <div>
                      <input
                        className="w-[180px] h-[30px] bg-zinc-600 p-2 text-white rounded-lg border-orange-600 border mt-4 mb-4 mr-2"
                        type="text"
                        placeholder="Name :"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                      <input
                        className="w-[180px] h-[30px] bg-zinc-600 p-2 text-white rounded-lg border-orange-600 border"
                        type="number" placeholder="Age :"
                        value={newAge}
                        onChange={(e) => setNewAge(e.target.value)}
                      /> <br />
                      <button
                        onClick={() => handleUpdate(employee.id)}
                        className="text-lime-900 font-bold "
                      >
                        <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{color: "#365314", marginRight: "0.2rem"}} />
                        Update
                      </button>
                    </div>
                  )}
                </td>
                <td class="px-5 py-5 text-sm bg-gray-400 border-gray-200">
                  <button onClick={() => handleDelete(employee.id)}>
                    <FontAwesomeIcon icon={faTrashCan} size="lg" style={{color: "#bd0000",}} />
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
        </div>
      </div>
    </div>
  );
};
