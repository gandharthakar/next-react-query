'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCompType } from "../types/componentsInterfacesTypes";
import { useEffect } from "react";
import { useEditUserStore } from "../zustand/store";

const UpdateUserForm = (props: UserCompType) => {
    const a = () => {
        console.log('suc--mut --upd');
    }
    const b = () => {
        console.log('err--mut  --upd');
    }
    const c = () => {
        console.log('oerr--mut  --upd');
    }

    const { user_id, user_name, user_gender, user_gender_val } = props;

    const isOpen = useEditUserStore((state) => state.toggleOpenState);
    const setPayload = useEditUserStore((state) => state.setData);



    const validationSchema = z.object({
        user_full_name: z.string({
            required_error: "Please enter Full Name",
            invalid_type_error: "Full Name must be in string format."
        }).min(3, { message: "Full name must be contains at least 3 characters." }),

        user_gender: z.string({
            required_error: "Please select User Gender",
            invalid_type_error: "User Gender must be in string format."
        }).min(2, { message: "User Gender must be contains at least 2 characters." }),
    });

    type validationSchema = z.infer<typeof validationSchema>;

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<validationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const handleClose = () => {
        isOpen(false);
        setPayload({ user_id: '', user_name: '', user_gender: '', user_gender_val: '' });
        setValue("user_full_name", "");
        setValue("user_gender", "");
    }

    const handleFormSubmit: SubmitHandler<validationSchema> = (formData) => {

        handleClose();
    }

    useEffect(() => {
        setValue("user_full_name", user_name);
        setValue("user_gender", user_gender_val ?? "");
        //eslint-disable-next-line
    }, [user_id]);

    return (
        <>
            <input type="hidden" value={user_gender} />
            <div className="block mda-1:hidden fixed z-[8] w-full h-full left-0 top-0 bg-[rgba(255,255,255,0.7)] blur-sm"></div>
            <div className="fixed mda-1:relative flex items-center justify-center min-h-[calc(100vh-40px)] mda-1:min-h-[auto] left-0 top-0 z-[10] p-[20px] mda-1:p-[0] w-full">
                <div className="p-[20px] mda-1:border-0 mda-1:bg-transparent bg-white border-[2px] border-solid border-zinc-800">
                    <div className="flex relative items-center justify-between flex-wrap gap-x-[20px] gap-y-[10px]">
                        <h1 className="text-[16px] md:text-[18px] font-semibold text-zinc-800 block mb-[10px]">
                            Update User
                        </h1>
                        <button
                            type="button"
                            className="text-[28px] leading-[0px] text-zinc-700 absolute right-0 top-[12px]"
                            onClick={handleClose}
                        >
                            &times;
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="pb-[15px]">
                            <label
                                htmlFor="cuf-ufn"
                                className="text-[12px] md:text-[14px] font-semibold text-zinc-700"
                            >
                                User Full Name
                            </label>
                            <input
                                type="text"
                                id="cuf-ufn"
                                className="w-full text-[14px] font-semibold border-[1px] py-[5px] px-[15px] border-solid border-zinc-700 focus:outline-0"
                                autoComplete="off"
                                {...register("user_full_name")}
                            />
                            {errors.user_full_name && (<div className="errmsg">{errors.user_full_name.message}</div>)}
                        </div>
                        <div className="pb-[20px]">
                            <label
                                htmlFor="cuf-ugn"
                                className="text-[12px] md:text-[14px] font-semibold text-zinc-700"
                            >
                                User Gender
                            </label>
                            <select
                                id="cuf-ugn"
                                className="w-full text-[14px] font-semibold border-[1px] py-[5px] px-[15px] border-solid border-zinc-700 focus:outline-0"
                                {...register("user_gender")}
                            >
                                <option value="">-- Select --</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.user_gender && (<div className="errmsg">{errors.user_gender.message}</div>)}
                        </div>
                        <div className="text-right">
                            <button
                                type="submit"
                                title="Create User"
                                className="inline-block text-[14px] font-semibold border-[1px] py-[7px] px-[15px] border-solid border-zinc-800 focus:outline-0 bg-zinc-800 text-zinc-200"
                            >
                                {isMutating ? 'Creating...' : 'Update User'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default UpdateUserForm;