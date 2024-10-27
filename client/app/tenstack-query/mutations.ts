
import { createUser, updateUser, deleteUser } from "./api";
import { SWRCBtype, UserCreType, UserUpdType } from "../types/componentsInterfacesTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateUser = (callbacks?: SWRCBtype) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["createUser"],
        mutationFn: (udata: UserCreType) => createUser(udata),
        onSuccess(data) {
            if (data.success) {
                if (callbacks?.successCB) {
                    callbacks.successCB();
                }
            } else {
                if (callbacks?.errorCB) {
                    callbacks.errorCB();
                }
            }
        },
        onError() {
            if (callbacks?.onErrorCB) {
                callbacks.onErrorCB();
            }
        },
        onSettled: async (_, error,) => {
            if (error) {
                console.log(error);
            } else {
                await queryClient.invalidateQueries({
                    queryKey: ["getUsers"]
                })
            }
        },
    })
};

export const useUpdateUser = (callbacks?: SWRCBtype) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["updateUser"],
        mutationFn: (udata: UserUpdType) => updateUser(udata),
        onSuccess(data) {
            if (data.success) {
                if (callbacks?.successCB) {
                    callbacks.successCB();
                }
            } else {
                if (callbacks?.errorCB) {
                    callbacks.errorCB();
                }
            }
        },
        onError() {
            if (callbacks?.onErrorCB) {
                callbacks.onErrorCB();
            }
        },
        onSettled: async (_, error,) => {
            if (error) {
                console.log(error);
            } else {
                await queryClient.invalidateQueries({
                    queryKey: ["getUsers"]
                })
            }
        },
    })
}

export const useDeleteUser = (callbacks?: SWRCBtype) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["deleteUser"],
        mutationFn: (user_id: string) => deleteUser(user_id),
        onSuccess(data) {
            if (data.success) {
                if (callbacks?.successCB) {
                    callbacks.successCB();
                }
            } else {
                if (callbacks?.errorCB) {
                    callbacks.errorCB();
                }
            }
        },
        onError() {
            if (callbacks?.onErrorCB) {
                callbacks.onErrorCB();
            }
        },
        onSettled: async (_, error,) => {
            if (error) {
                console.log(error);
            } else {
                await queryClient.invalidateQueries({
                    queryKey: ["getUsers"]
                })
            }
        },
    })
}