import Axios from "axios";
let API_URL = `https://csssmailing.herokuapp.com/api/files/`;

export const FileUploadApi = async (file) => {
  // console.log(file['0']);
  let formData = new FormData();
  formData.append("myfile", file['0']);

  const res = await Axios.post(`${API_URL}`, formData).catch((err) => {
    return err.response;
  });
  return res;
};

export const InvokeEmailApi = async (senderInfo, uuid) => {
  const data = {
    uuid: uuid,
    destination: senderInfo.destination,
    source: senderInfo.source,
  };
  
  const res = await Axios.post(`${API_URL}/send`, data).catch((err) => {
    return err.response;
  });
  // console.log(res);
  return res;
};
