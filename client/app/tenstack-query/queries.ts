
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getUsers } from "./api";
import { PaginationConfig } from "../types/componentsInterfacesTypes";

const defConfig = {
    refetchOnWindowFocus: false,
    staleTime: 2 * (60 * 1000),
    gcTime: 2 * (60 * 1000),
}

export const useGetUsers = (pgconf?: PaginationConfig) => {
    return useQuery({
        queryKey: ["getUsers", pgconf],
        queryFn: () => getUsers(pgconf),
        ...defConfig,
        placeholderData: keepPreviousData,
    })
}