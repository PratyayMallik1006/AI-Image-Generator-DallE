# AI-Image-Generator-DallE
# Notes
## Using ChatGPT API
- Genereating API Key : https://platform.openai.com/account/api-keys
### Generating Images from prompt
1. backend
```js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/images", async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: req.body.message,
      n: 3,
      size: "1024x1024",
    });
    console.log(response.data.data);
    res.send(response.data.data);
  } catch (error) {
    console.error(error);
  }
});
```
2. frontend
```js

const getImages = async () => {
    console.log("generate clicked");
    
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: "Dancing Robots",
        }),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch("http://localhost:8000/images", options);
      const data = await response.json();
      console.log(data);
      setImages(data);
   
    } catch (error) {
      console.error(error);
    }
  };
```
