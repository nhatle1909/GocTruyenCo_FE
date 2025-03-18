import { client } from "../utils/BaseAPI";

export const LoginAPI = async (email: string, password: string) => {
  try {
    const response = await client.post("Authenticate/Login", {
      email: email,
      password: password
    });
        if (response.status === 200) {
      return {
        token: response.data.result,
        success: true
      };
    }
  } catch (error) {
    console.log("Error when logging in : " + error);
    return {
      token: null,
      success: false
    };
}
};