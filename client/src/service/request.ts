import axios from "axios";
import { setupRequest, setupResponse } from "./interceptor";

const request = axios.create({
  baseURL: `${import.meta.env.VITE_APP_HOST}`,
});

setupRequest(request);
setupResponse(request);

export default request;
