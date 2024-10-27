import { axiosInstance } from "./fetcher";
import { UserCreType, UserGetAPIResp, UserUpdType, PaginationConfig, APIRespCommonTypeA } from "../types/componentsInterfacesTypes";

export const getUsers = async (pgconf?: PaginationConfig) => {
    return (await axiosInstance.get<UserGetAPIResp>(`/get-users?enpg=${pgconf?.enpg}&page=${pgconf?.pageIndex}&limit=${pgconf?.limit}`)).data;
}

export const createUser = async (udata: UserCreType) => {
    return (await axiosInstance.post<UserCreType & APIRespCommonTypeA>('/create-user', udata)).data;
}

export const updateUser = async (udata: UserUpdType) => {
    return (await axiosInstance.put<UserUpdType & APIRespCommonTypeA>('/update-user', udata)).data;
}

export const deleteUser = async (user_id: string) => {
    const resp = await axiosInstance.delete<APIRespCommonTypeA>('/delete-user', {
        data: JSON.stringify({ user_id }),
        headers: {
            'Content-type': 'application/json'
        }
    }).then((pr: any) => pr.data);

    return resp;
}