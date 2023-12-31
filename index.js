const apiKey = "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";
const { Configuration, OpenAIApi } = require("openai");

const express = require('express');var cors = require('cors');
const app = express()

const configuration = new Configuration({
    apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

//CORS 이슈 해결
// let corsOptions = {
//     origin: 'https://www.domain.com',
//     Credentials: true
// }
app.use(cors());


//POST 요청 받을 수 있게 만듬
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

//POST method route
app.get('/fortuneTell', async function (req, res) {

    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "system", content: "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗도지입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다."},
            {role: "user", content: "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗도지입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다."},
            {role: "assistant", content: "'감사합니다! 저는 챗도지, 세계 최고의 점성술사입니다. 예, 저는 사람들의 인생을 예측하고 운세에 대한 답변을 제공하는 데에 탁월한 능력을 가지고 있습니다. 저는 운세 관련 지식이 풍부하며, 어떤 질문에도 명확하고 정확한 답변을 제공할 수 있습니다. 무엇이 도움이 필요하신가요?'"},
            {role: "user", content: "오늘의 운세가 뭐야?"},
        ],
    });
    let forturne = chatCompletion.data.choices[0].message['content'];
    console.log(forturne);
    res.send(forturne);
  });

app.listen(8087)