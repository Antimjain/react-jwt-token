import axios from "axios";
const API_URL = "http://localhost:3000/users";

/**
 * calling login command
 * @method doLogin
 * @params {username, password}
 */
const doLogin = (username, password) => {
  // return new Promise((resolve, reject) => {
  //   ssCuratorCliUtils
  //     .runWithCLI(`auth login -u=${username} -p=${password} -r`, true)
  //     .then(response => {
  //       resolve(response);
  //     })
  //     .catch(error => {
  //       console.log('login error',error.status,error.message);
  //       reject(error);
  //     });
  // });

  return new Promise((resolve, reject) => {
    // axios.get(API_URL, config)
    axios.get(API_URL)
    .then(response => {
      console.log("response",response.data[0].accessToken)
      if (response.data[0].accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data[0].accessToken));
      }
      console.log("response.data[0]",response.data[0])
      resolve(response) 
    }).catch(error=>{
      console.log("error.response", error)
    });
  });
};

// class AuthService {
//   login(username, password) {
//     // return axios
//       // .post(API_URL + "signin", { username, password })
//       // .then((response) => {
//       //   console.log("response",response)
//       //   if (response.data.accessToken) {
//       //     localStorage.setItem("user", JSON.stringify(response.data));
//       //   }

//       //   return response.data;
//       // });



//       // const config = {
//       //   params: {
//       //     email: username,
//       //     status: password,
//       //   },
//       // }
//       return new Promise((resolve, reject) => {
//         // axios.get(API_URL, config)
//         axios.get(API_URL)
//         .then(response => {
//           console.log("response",response.data[0].accessToken)
//           if (response.data[0].accessToken) {
//               localStorage.setItem("user", JSON.stringify(response.data[0].accessToken));
//           }

//           // return response.data[0];
//           resolve(response.data[0]) 
//         }).catch(error=>{
//           console.log("getNotifications error.response", error)
//           if (error.response) {
//             reject(error.response.data.error);
//           } else {
//             console.error("Fetch notification failed, server err:", error.message);
//             reject(error.message);
//           }
//         });
//       });
//   }


const logout = () =>{
  localStorage.removeItem("user");
}

//export services
export const authServices = {
  doLogin,
  logout
};
