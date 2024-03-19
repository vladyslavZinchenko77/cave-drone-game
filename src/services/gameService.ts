import axios from "axios";

const URL = 'https://cave-drone-server.shtoa.xyz'; 


 export const  initGame = async (name: string, complexity: number): Promise<string> => {
    try {
        const response = await axios.post(`${URL}/init`, { name, complexity });
        return response.data.id;
      } catch (error) {
        console.error('Error initializing game:', error);
        throw error;
      }
}