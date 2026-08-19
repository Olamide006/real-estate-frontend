import axios from "axios"
import {toast} from "sonner"

export const apiClient = axios.create({
    baseURL: "http://localhost:8000",
    
})



export const userServices = {
    createUser: async( username:string , email:string ,password:string)=>{
        try {
              const {data} = await apiClient.post("/create/user", {username, password,email})
            toast.success(data?.message)
            return data

        } catch (error:any) {
            toast.error(error?.response.data.message)
            throw error
        }
      
    },

    loginUser:async(username:string, password:string)=>{
        try {
            const res = await apiClient.post("/user",{username,password})
            return res.data
        } catch (error:any) {
            toast.error(error?.response.data.message)
            throw error
        }
    },


  addProperty: async (formData: FormData) => {
    try {
      const { data } = await apiClient.post("/add/property", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(data?.message);
      return data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add property");
      throw error;
    }
  },

  getAllProperties:async()=>{
    try {
      const res = await apiClient.get("/properties")
      return res
    } catch (error:any) {
      toast.error(error?.response.data.message)
    }
  },


    deleteProperty: async (property_id: number) => {
    try {
      const { data } = await apiClient.delete(`/delete/${property_id}`);
      toast.success(data?.message);
      return data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete property");
      throw error;
    }
  },

  getPropertyById :async (property_id:number)=>{
     try {
      const { data } = await apiClient.get(`/property/${property_id}`);
      return data;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch property"
      );
      throw error;
    }
  },

  }



