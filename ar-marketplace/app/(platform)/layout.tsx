import { Toaster } from "sonner"

interface PlatformInterface{
  children: React.ReactNode
}

const PlatformLayout = ({
  children
}: PlatformInterface) => {
  return (
    <div className="h-full bg-slate-100">
      <Toaster position="top-right"/>
      {/* <Navbar></Navbar> */}
      <main className="pt-40 pb-20 bg-slate-100">
        {children}
      </main>
      {/* <Footer></Footer> */}
    </div>
  )
}

export default PlatformLayout