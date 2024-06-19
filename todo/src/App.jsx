import Footer from "./Footer"
import Header from "./Header"
import ToDoList from "./ToDoList"

function App() {
  return(
    <><div className="bg-gradient-to-b from-slate-900 to-red-900 h-max min-h-screen">
      <Header/>
      <ToDoList/>
      <div className="min-h-[1vh]"></div>


    </div>
      <Footer/>
    
    </>
  )
}

export default App
