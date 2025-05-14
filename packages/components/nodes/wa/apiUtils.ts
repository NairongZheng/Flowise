import axios, { AxiosResponse } from 'axios'

/**
 * Utility functions for interacting with the narrative generator API
 */
export const apiUtils = {
    /**
     * Makes a request to the narrative generator API
     * @param endpoint API endpoint path
     * @param method HTTP method
     * @param baseUrl Base URL of the API
     * @param data Request body data
     * @returns API response
     */
    async makeRequest(
        endpoint: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST',
        baseUrl: string,
        data?: any
    ): Promise<any> {
        try {
            const url = `${baseUrl.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`
            
            let response: AxiosResponse
            
            if (method === 'GET') {
                response = await axios.get(url, { params: data })
            } else if (method === 'POST') {
                response = await axios.post(url, data)
            } else if (method === 'PUT') {
                response = await axios.put(url, data)
            } else if (method === 'DELETE') {
                response = await axios.delete(url, { data })
            } else {
                throw new Error(`Unsupported method: ${method}`)
            }
            
            return response.data
        } catch (error: any) {
            if (error.response) {
                throw new Error(`API error (${error.response.status}): ${JSON.stringify(error.response.data)}`)
            } else if (error.request) {
                throw new Error(`No response from API: ${error.message}`)
            } else {
                throw new Error(`Request error: ${error.message}`)
            }
        }
    },
    
    /**
     * Validates connection to the API
     * @param baseUrl Base URL of the API
     * @returns True if connection successful
     */
    async validateConnection(baseUrl: string): Promise<boolean> {
        try {
            await axios.get(`${baseUrl.replace(/\/+$/, '')}/docs`)
            return true
        } catch (error) {
            return false
        }
    }
}