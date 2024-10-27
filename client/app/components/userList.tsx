'use client';

import { useDeleteUser } from "../tenstack-query/mutations";
import { UserCompType } from "../types/componentsInterfacesTypes";
import { useEditUserStore } from "../zustand/store";

const UserList = (props: UserCompType) => {
    const a = () => {
        console.log('suc--mut --del');
    }
    const b = () => {
        console.log('err--mut  --del');
    }
    const c = () => {
        console.log('oerr--mut  --del');
    }

    const { user_id, user_name, user_gender, user_gender_val } = props;
    const setPayload = useEditUserStore((state) => state.setData);
    const isOpen = useEditUserStore((state) => state.toggleOpenState);

    const { mutate } = useDeleteUser({ successCB: a, errorCB: b, onErrorCB: c });

    const handleEdit = () => {
        setPayload({ user_id, user_name, user_gender, user_gender_val });
        isOpen(true);
    }

    const handleDelete = () => {
        const conf = confirm("Are you sure want to delete this user ?");
        if (conf) {
            mutate(user_id);
        }
    }

    return (
        <>
            <div className="border-b-[2px] last:border-b-0 border-solid border-zinc-800 p-[20px]">
                <div className="pb-[10px]">
                    <h3 className="text-[14px] md:text-[16px] text-zinc-800">
                        <strong>Name : </strong>
                        {user_name}
                    </h3>
                    <h4 className="text-[14px] md:text-[16px] text-zinc-800">
                        <strong>Gender : </strong>
                        {user_gender}
                    </h4>
                </div>
                <div className="flex gap-x-[15px] gap-y-[10px] flex-wrap">
                    <button
                        type="button"
                        title="Edit"
                        className="text-[12px] md:text-[14px] font-semibold text-blue-700"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        title="Delete"
                        className="text-[12px] md:text-[14px] font-semibold text-red-600"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </>
    )
};

export default UserList;