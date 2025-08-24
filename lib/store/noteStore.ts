import { create } from "zustand";
import { NewNoteData } from "@/types/note";
import { persist } from "zustand/middleware";


type NoteDraft ={
    draft: NewNoteData ;
    setDraft: (newData: NewNoteData) => void;
    clearDraft: () => void;
}



const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};


export const useNoteDraft = create<NoteDraft>()(
    persist( (set)=>{
    
    return{
draft: initialDraft,
setDraft: (newData: NewNoteData) => set({draft:newData}),
clearDraft:() => set({draft:initialDraft}),
    }
},{
    name:'draft',
    partialize: (state) =>{return {draft:state.draft}}
}))