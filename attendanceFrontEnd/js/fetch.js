const SERVER = 'http://localhost:3001';

export const SendDataToServer = async (url, data) => {
  const res = await fetch(`${SERVER}/${url}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  });
  return await res.json();
};

export const GetDataFromServer = async (url='', data='') => {
  const res = await fetch(`${SERVER}/${url}`);
  return await res.json();
};