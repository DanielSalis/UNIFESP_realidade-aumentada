import { create } from "zustand";

type Sidebar = {
  isOpen: boolean;
  onOpen: ()=>void;
  onClose: ()=>void;
}

export const useSidebar = create <Sidebar>((set) => {
  return ({
    isOpen :false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=>set({isOpen: false})
  })
})