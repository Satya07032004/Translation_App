const translateBtn = document.getElementById("translate");
const textArea = document.getElementById("textTranslation");

translateBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const textInput = textArea.value;

  const selectedLang = document.querySelector(`input[name="lang"]:checked`);

  if (!textInput.trim()) {
    alert("Please enter something in the text box");
    return;
  }
  if (!selectedLang) {
    alert("Please select a valid language to translate");
    return;
  }

  const apiKey = `useYourApiKey`;

  let confirmationBtn = translateBtn.innerText;
  translateBtn.innerText = "Translating...";
  translateBtn.disabled = true;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content: `You are a highly skilled translator. Translate the user's text into ${selectedLang.id}. Only respond with the translation itself, without any conversational filler or quotes.`,
          },
          {
            role: "user",
            content: textInput,
          },
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  let res = data.choices[0].message.content;
});
