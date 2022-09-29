import AxiosHandler from '../services/AxiosHandler';

const URL = "search?query=$text$&start=0"

const doSearchRequest = async (text : string) => {
  const searchUrl = URL.replace("$text$", text);
  const response = await AxiosHandler.get(searchUrl);
  return response.data;
}

export default doSearchRequest