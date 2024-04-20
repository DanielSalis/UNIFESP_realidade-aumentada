import { Toaster } from "sonner"

interface PlatformInterface{
  children: React.ReactNode
}

const PlatformLayout = ({
  children
}: PlatformInterface) => {
  return (
    <>
      <Toaster position="top-right"/>
      {children}
    </>
  )
}

export default PlatformLayout