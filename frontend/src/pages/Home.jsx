import { useState, useEffect } from "react"
import axios from 'axios'


export const Home = () => {

  const [employees, setEmployees] = useState([])
  const [name, setName] = useState('')   
  const [age, setAge] = useState('')  
  
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/create', {name, age})
    .then(()=>{
      console.log('Enployee Added')
      setName('')
      setAge('')
    })
    .catch((error)=>{
      console.log('Unable to add employee')
    })
  }  


  return (
    <div className="w-full h-[1200px]" >
        <h1 className="text-center text-zinc-300 p-5 text-3xl">EMPLOYEE FORM</h1>
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit}>
                {/* EMPLOYEE name Input */}
                <label className="text-white">Employee Name</label>
                <br />
                <input className="w-[400px] h-[40px] bg-zinc-600 p-2 text-white rounded-lg border-orange-600 border"  type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <br />
                <br />
                 {/* EMPLOYEE age Input */}
                <label className="text-white">Employee Age</label>
                <br />
                <input className="w-[400px] h-[40px] bg-zinc-600 p-2 text-white rounded-lg border-orange-600 border"  type="number"
                placeholder="Age"
                value={age}
                onChange={(e)=>setAge(e.target.value)} />
                <br />
                <br />
                <button className="text-white w-[400px] h-[40px] border bg-[#1a1a1a] hover:bg-zinc-800 "
                type="submit"
                >Submit Form</button>
            </form>
        </div>
    </div>
  )
}

