import { create } from "zustand";
import { EditStoreType } from "../types/componentsInterfacesTypes";

export const useEditUserStore = create<EditStoreType>((set) => ({
    isEditPanelShown: false,
    user_data: {
        user_id: '',
        user_name: '',
        user_gender: '',
        user_gender_val: ''
    },
    toggleOpenState: (payload) => set((state) => ({ ...state, isEditPanelShown: payload })),
    setData: (payload) => {
        set(() => ({
            user_data: {
                user_id: payload.user_id,
                user_name: payload.user_name,
                user_gender: payload.user_gender,
                user_gender_val: payload.user_gender_val
            }
        }))
    },
}));