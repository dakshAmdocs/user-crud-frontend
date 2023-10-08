import axios from "axios";


const BASE_URL = "http://localhost:8080/api/"

class ApiCalls{

    async getUsers(page){

        axios.get(BASE_URL + "users/" + page).then(
            (response)=>{ 
              console.log(response.data)
              return response.data;
            }
          )
    
        // return [
        //     {
        //         id: 2098,
        //         first_name: "Daksh",
        //         last_name: "Bhatia",
        //         id_type: "aadhar",
        //         id_number: 123124343,
        //         dob: "Thu, 31 Aug 2023 18:30:00 GMT",
        //         gender: "male",
        //     },
        //     {
        //         id: 1000,
        //         first_name: "Daksh",
        //         last_name: "Bhatia",
        //         id_type: "aadhar",
        //         id_number: 123124343,
        //         dob: "Thu, 31 Aug 2023 18:30:00 GMT",
        //         gender: "male",
        //     },
        //     {
        //         id: 1001,
        //         first_name: "Daksh",
        //         last_name: "Bhatia",
        //         id_type: "aadhar",
        //         id_number: 123124343,
        //         dob: "Thu, 31 Aug 2023 18:30:00 GMT",
        //         gender: "male",
        //     },
        //     {
        //         id: 1002,
        //         first_name: "Daksh",
        //         last_name: "Bhatia",
        //         id_type: "aadhar",
        //         id_number: 123124343,
        //         dob: "Thu, 31 Aug 2023 18:30:00 GMT",
        //         gender: "male",
        //     },
        //     {
        //         id: 1003,
        //         first_name: "Daksh",
        //         last_name: "Bhatia",
        //         id_type: "aadhar",
        //         id_number: 123124343,
        //         dob: "Thu, 31 Aug 2023 18:30:00 GMT",
        //         gender: "male",
        //     },
        //     {
        //         id: 1004,
        //         first_name: "Daksh",
        //         last_name: "Bhatia",
        //         id_type: "aadhar",
        //         id_number: 123124343,
        //         dob: "Thu, 31 Aug 2023 18:30:00 GMT",
        //         gender: "male",
        //     },
        // ]
    }

    getUser(id){
        return {
            id: 2098,
            first_name: "Daksh",
            last_name: "Bhatia",
            id_type: "aadhar",
            id_number: 123124343,
            dob: "26/02/2001",
            gender: "male",
        };
    }

    createUser(user){
        axios.post(BASE_URL + "putCustomer", user).then(
            (res)=>{
                console.log("create user api call: ")
                console.log(res.data)
            }
        )
    }

    updateUser(user){
        axios.put(BASE_URL + "user/" +  user.customer_id, user).then(
            (res)=>{
                console.log("update user api call: ")
                console.log(res.data)
            }
        )
    }

    deleteUser(id){
        console.log("Delete id: " + id)
    }
}

export default new ApiCalls()
