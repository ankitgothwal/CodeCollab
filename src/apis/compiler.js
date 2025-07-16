import axios from "axios";

export const compileCode = async (code, language) => {
  const languageMap = {
    cpp: 54,      // C++ (GCC 9.2.0)
    java: 62,     // Java (OpenJDK 13.0.1)
    python: 71,   // Python (3.8.1)
    javascript: 63 // JavaScript (Node.js 12.14.0)
  };

  const languageId = languageMap[language.toLowerCase()];
  if (!languageId) {
    return { stderr: "Unsupported language" };
  }

  try {
    const submission = await axios.post(
      `${process.env.REACT_APP_JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
      {
        source_code: code,
        language_id: languageId,
      },
      {
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_JUDGE0_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      }
    );

    return submission.data;
  } catch (err) {
    return { stderr: "Compilation failed." };
  }
};
