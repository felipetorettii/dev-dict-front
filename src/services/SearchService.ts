import AxiosHandler from '../services/AxiosHandler';

const URL = "search?query=$text$&start=$page$"

const doSearchRequest = async (text : string, page: number) => {
  const searchUrl = URL.replace("$text$", text).replace("$page$", page.toString());
  const response = await AxiosHandler.get(searchUrl);
  return response.data;
}

export default doSearchRequest