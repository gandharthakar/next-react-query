import { axiosInstance } from "./fetcher";
import { UserCreType, UserUpdType } from "../types/componentsInterfacesTypes";

export const createUser = (url: string, { arg }: { arg: UserCreType }) => {
    const resp = axiosInstance.post(url, {
        user_full_name: arg.user_full_name,
        user_gender: arg.user_gender,
    }).then((pr: any) => pr.data);

    return resp;
}

export const updateUser = (url: string, { arg }: { arg: UserUpdType }) => {
    const resp = axiosInstance.put(url, {
        user_id: arg.user_id,
        user_full_name: arg.user_full_name,
        user_gender: arg.user_gender,
    }).then((pr: any) => pr.data);

    return resp;
}

export const deleteUser = (url: string, { arg }: { arg: { user_id: string } }) => {
    const resp = axiosInstance.delete(url, {
        data: JSON.stringify({ user_id: arg.user_id, }),
        headers: {
            'Content-type': 'application/json'
        }
    }).then((pr: any) => pr.data);

    return resp;
}