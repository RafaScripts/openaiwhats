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
  encodedParams.append("q", mensage);
  encodedParams.append("target", "pt");
  encodedParams.append("source", "en");

  let text;

  const options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': '0e0c63700emsh5ba4628c0e1e9f9p16284fjsnd25efb3adf2d',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    data: encodedParams
  };



  //@ts-ignore
  await axios.request(options).then(function (response) {
    console.log(response.data);
    const res = response.data;
    res.data.translations.map((item) => {
      if(item.translatedText){
        text = item.translatedText;
      }
    });
  }).catch(function (error) {
    console.error(error);
  });

  return text;
}

async function translateReciveFromWhats(mensage){
  const encodedParams = new URLSearchParams();
  encodedParams.append("q", mensage);
  encodedParams.append("target", "en");
  encodedParams.append("source", "pt");

  let text;

  const options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': '0e0c63700emsh5ba4628c0e1e9f9p16284fjsnd25efb3adf2d',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    data: encodedParams
  };



  //@ts-ignore
  await axios.request(options).then(function (response) {
    console.log(response.data);
    const res = response.data;
    res.data.translations.map((item) => {
      if(item.translatedText){
        text = item.translatedText;
      }
    });
  }).catch(function (error) {
    console.error(error);
  });

  return text;
}
