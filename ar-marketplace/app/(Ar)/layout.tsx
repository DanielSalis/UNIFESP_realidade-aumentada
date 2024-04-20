import { Toaster } from "sonner"

interface ARInterface{
  children: React.ReactNode
}

const ArLayout = ({
  children
}: ARInterface) => {
  return (
    <>
      <Toaster position="top-right"/>
      {children}
    </>
  )
}

export default ArLayout