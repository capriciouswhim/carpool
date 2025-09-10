import { AxiosError } from "axios";

export interface ApiException {
    axiosError?: AxiosError
    reason?: any
}