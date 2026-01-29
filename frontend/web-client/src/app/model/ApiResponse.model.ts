export interface ApiResponse<T> {
    data: T;
    error?: any;
    status?: number;
    timestamp?: string;
}