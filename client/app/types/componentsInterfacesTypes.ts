
export type UserCreType = {
    user_full_name: string,
    user_gender: string,
}

export type UserUpdType = {
    user_id: string,
    user_full_name: string,
    user_gender: string,
}

export type UserCompType = {
    user_id: string,
    user_name: string,
    user_gender?: string,
    user_gender_val?: string,
}

export type EditStoreType = {
    isEditPanelShown: boolean,
    user_data: UserCompType,
    setData: (payload: UserCompType) => void,
    toggleOpenState: (payload: boolean) => void,
}

export type APIRespCommonTypeA = {
    success: boolean,
    message: string
}

export type UserAPIResp = {
    id: string,
    user_full_name: string,
    user_gender: string,
}

export type UserGetAPIResp = {
    users: UserAPIResp[],
    totalPages?: number,
    currentPage?: number
} & APIRespCommonTypeA

export interface SWRCBtype {
    successCB?: () => void,
    errorCB?: () => void,
    onErrorCB?: () => void,
}

export interface PaginationConfig {
    enpg?: (boolean | undefined),
    pageIndex?: (number | undefined),
    limit?: (number | undefined)
}