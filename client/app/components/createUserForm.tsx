'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateUserForm = () => {
    const a = () => {
        console.log('suc--mut');
    }
    const b = () => {
        console.log('err--mut');
    }
    const c = () => {
        console.log('oerr--mut');
    }



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

    const { register, handleSubmit, reset, formState: { errors } } = useForm<validationSchema>({
        resolver: zodResolver(validationSchema)
    });

    const handleFormSubmit: SubmitHandler<validationSchema> = async (formData) => {

        reset();
    }

    return (
        <>
            <h1 className="text-[16px] md:text-[18px] font-semibold text-zinc-800 block mb-[10px]">
                Create New User
            </h1>
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
                        {isMutating ? 'Updating...' : 'Create User'}
                    </button>
                </div>
            </form>
        </>
    )
};

export default CreateUserForm;