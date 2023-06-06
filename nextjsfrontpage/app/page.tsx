import Navbar from "@/components/Navbar"
import Banner from "@/components/Banner"
import CardBody from "@/components/CardBody"
import Footer from "@/components/Footer"

export default function Home() {
  return (
   <main>
     <div className="w-full bg-slate-200 flex flex-col min-h-screen">
      <div className="w-full"> 
      
      <Navbar/>
      <Banner/>
      
      </div>
      <CardBody/>
      <div className="flex-grow"></div> 
      <Footer/>
      </div>
   </main>
  )
}
