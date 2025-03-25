import axios from "axios";
//const BASE_URL = 'https://d203-49-36-91-66.ngrok-free.app/api/pdf'
const BASE_URL = 'https://cbdcontractsdev.azurewebsites.net/api/pdf';
export const filters = {
    jobId:'',
    clientName: ''
}
export class GeneratePDFService {
    
    static async FilterToPDF(filters) {
        const response = await axios.post(`${BASE_URL}/savefilter`,filters);
        return response.data;
    }
}