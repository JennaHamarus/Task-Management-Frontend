import axios from "axios";
import { baseUrl } from "../constants/url.constants";

const httpHelper = axios.create({
  baseURL: baseUrl,
});

export default httpHelper;