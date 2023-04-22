import express from 'express';
import cors from 'cors';
import {sendChatGPT, sendDalle, sendWhatsRes} from "./functions/functions";

const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());

app.get('/', (req, res) => {
  console.log("body: ",req.body);
  console.log(" ");
  console.log("query: ",req.query);

  res.json("");
});

let help = "*instruções*\n\n para usar o chatGPT envie /gpt (sua pergunta)\n\n para usar o Dalle-Ai envie /dalle (descrição da imagem que quer)\n\n by:RafaScripts";

app.post('/', async (req, res) => {
  const {data} = req.body;
  //const infos = data.data;
  //console.log("dados: ",data);
  //console.log(" ");
  let wook = data.wook;
  //console.log("wook: ",wook);
  let dados = data.data;
  //console.log("dados: ",dados);

  if(wook == "RECEIVE_MESSAGE"){
    let mensage = dados.body;
    let number = dados.from;
    number = number.replace("@c.us","");
    let type = mensage.split(" ");
    if(type[0] == "/gpt"){
      let send = mensage.replace("/gpt ","");
      let sendgpt = await sendChatGPT(send);
      //console.log(sendgpt);
      await sendWhatsRes(sendgpt, number);
    }else if(type[0] == "/dalle"){
      let send = mensage.replace("/dalle ","");
      let senddale = await sendDalle(send);
      await sendWhatsRes(senddale, number);
      //console.log(senddale);
    }else if(type[0] == "/help") {
      //console.log("help");
      await sendWhatsRes(help, number);
    }
  }

  return res.json("");
});

app.put('/', (req, res) => {
  console.log("body: ",req.body);
  console.log(" ");
  console.log("query: ",req.query);

  res.json("");
});

app.delete('/', (req, res) => {
  console.log("body: ",req.body);
  console.log(" ");
  console.log("query: ",req.query);

  res.json("");
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

/*
body:  {
    session: "cc8ae6f5-bb1c-4a24-b10c-a5bcbd159961",
    data: {
      data: {
        id: "false_557791716934@c.us_3EB02A8B8D5A48AA8A6A94",
        body: "aaa",
        type: "chat",
        t: 1682127045,
        notifyName: "Rafa",
        from: "557791716934@c.us",
        to: "5577935059366@c.us",
        self: "in",
        ack: 1,
        isNewMsg: true,
        star: false,
        kicNotified: false,
        recvFresh: true,
        isFromTemplate: false,
        pollInvalidated: false,
        isSentCagPollCreation: false,
        latestEditMsgKey: null,
        latestEditSenderTimestampMs: null,
        broadcast: false,
        mentionedJidList: [],
        groupMentions: [],
        isVcardOverMmsDocument: false,
        isForwarded: false,
        labels: [],
        hasReaction: false,
        productHeaderImageRejected: false,
        lastPlaybackProgress: 0,
        isDynamicReplyButtonsMsg: false,
        isMdHistoryMsg: false,
        stickerSentTs: 0,
        isAvatar: false,
        requiresDirectConnection: false,
        chatId: "557791716934@c.us",
        fromMe: false,
        sender: [Object],
        timestamp: 1682127045,
        content: "aaa",
        isGroupMsg: false,
        isMedia: false,
        isNotification: false,
        isPSA: false,
        mediaData: []
      },
      wook: "RECEIVE_MESSAGE",
      type: "text",
      fromMe: false,
      id: "false_557791716934@c.us_3EB02A8B8D5A48AA8A6A94",
      session: "cc8ae6f5-bb1c-4a24-b10c-a5bcbd159961",
      isGroupMsg: false,
      author: null,
      name: "Rafa",
      to: "5577935059366",
      from: "557791716934",
      content: "aaa",
      quotedMsg: null,
      quotedMsgId: null,
      status: "RECEIVED",
      timestamp: 1682127045,
      datetime: "21-04-2023 22:30:45",
      queue: "messages"
    }
  }
 */

/*

 */
