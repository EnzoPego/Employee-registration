
export const Home = () => {
  return (
    <div className="w-full h-[1200px]" >
        <h1 className="text-center text-zinc-300 p-5 text-3xl">EMPLOYEE FORM</h1>
        <div className="flex justify-center items-center">
            <form action="">
                {/* EMPLOYEE name Input */}
                <label className="text-white">Employee Name</label>
                <br />
                <input className="w-[400px] h-[40px] bg-zinc-600 p-2 text-white rounded-lg border-orange-600 border"  type="text" />
                <br />
                <br />
                 {/* EMPLOYEE age Input */}
                <label className="text-white">Employee Age</label>
                <br />
                <input className="w-[400px] h-[40px] bg-zinc-600 p-2 text-white rounded-lg border-orange-600 border"  type="text" />
                <br />
                <br />
                <button className="text-white w-[400px] h-[40px] border bg-[#1a1a1a] hover:bg-zinc-800 "
                >Submit Form</button>
            </form>
        </div>
    </div>
  )
}

