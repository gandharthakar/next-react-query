'use client';

import UpdateUserForm from "../components/updateUserForm";
import { useEditUserStore } from "../zustand/store";

const HomePager = () => {

    const isOpen = useEditUserStore((state) => state.isEditPanelShown);
    const udata = useEditUserStore((state) => state.user_data);

    return (
        <>
            {
                isOpen && (
                    <>
                        <div className="border-b-0 mda-1:border-b-[2px] border-solid border-zinc-800">
                            <UpdateUserForm
                                user_id={udata.user_id}
                                user_name={udata.user_name}
                                user_gender={udata.user_gender}
                                user_gender_val={udata.user_gender_val}
                            />
                        </div>
                    </>
                )
            }
        </>
    )
};

export default HomePager;