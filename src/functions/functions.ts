import apiOpen from "../services/apiopen";
import api from "../services/sendWhats";
//import apiTranslate from "../services/translate";
import axios from "axios";
export async function sendChatGPT(mensage){

  let enviar = await translateReciveFromWhats(mensage);

  let body = {
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        "role": "user",
        "content": enviar
      }
    ]
  }

  let res;

  await apiOpen.post('/chat/completions', body).then((response) => {
    //console.log(response.data);
    let data = response.data;
    data.choices.map((item) => {
      if(item.message){
        res = item.message.content;
      }
    });

    console.log(res);
  });

  res = await translateReciveFromAPI(res);

  return res;
}

export async function sendDalle(mensage){
  let enviar = await translateReciveFromWhats(mensage);

  let body = {
    "prompt": enviar,
    "n": 2,
    "size": "1024x1024"
  }

  let res = "";

  await apiOpen.post('/images/generations', body).then((response) => {
    //console.log(response.data);
    let data = response.data;

    data.data.map((item) => {
      if(item.url){
        res += "imagem: " + item.url + "\n\n\n";
      }
    });

  });

  return res;
}

export async function sendWhatsRes(message, number) {
  let body = {
    "number": number,
    "text": message
  };

  await api.post('', body).then((response) => {
    //console.log(response.data);
  });

  return;
}

async function translateReciveFromAPI(mensage){

  const encodedParams = new URLSearchParams();
  encodedParams.append("text", mensage);
  encodedParams.append("to", "pt");
  encodedParams.append("from", "en");

  const options = {
    method: 'POST',
    url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '0e0c63700emsh5ba4628c0e1e9f9p16284fjsnd25efb3adf2d',
      'X-RapidAPI-Host': 'nlp-translation.p.rapidapi.com'
    },
    data: encodedParams
  };

  let text;

  //@ts-ignore
  await axios.request(options).then(function (response) {
    console.log(response.data);
    const res = response.data;
    text = res.translated_text;
    console.log(text);
    text = text.pt;
    console.log(text);
  }).catch(function (error) {
    console.error(error);
  });

  return text;
}

async function translateReciveFromWhats(mensage){
  const encodedParams = new URLSearchParams();
  encodedParams.append("text", mensage);
  encodedParams.append("to", "en");
  encodedParams.append("from", "pt");

  const options = {
    method: 'POST',
    url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '0e0c63700emsh5ba4628c0e1e9f9p16284fjsnd25efb3adf2d',
      'X-RapidAPI-Host': 'nlp-translation.p.rapidapi.com'
    },
    data: encodedParams
  };

  let text;

  //@ts-ignore
  await axios.request(options).then(function (response) {
    console.log(response.data);
    const res = response.data;
    text = res.translated_text;
    console.log(text);
    text = text.en;
    console.log(text);
  }).catch(function (error) {
    console.error(error);
  });

  return text;
}
