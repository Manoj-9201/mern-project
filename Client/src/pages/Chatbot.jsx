import React, { useEffect, useState } from "react";
import "../pages/Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState([]);
  const [options, setOptions] = useState([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    startChatSession();
  }, []);
  const startChatSession = async () => {
    const request = await fetch("http://localhost:5001/start", {
      method: "POST",
    });
    const response = await request.json();
    console.log(response);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const inputMessage = e.target.message.value;
    const message = inputMessage.trim();
    if (message !== "") {
      if (messages.length === 0) {
        await startChatSession();
      }
    }
    // const inputMessage = e.target.message.value;
    // if (inputMessage.trim() !== "") {
    const request = await fetch("http://localhost:5001/continue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: message }),
    });

    let response = await request.json();
    let botResponse = convertResponseToString(response.response.response);
    let botOptions = response.response.options;
    // if (
    //   botResponse === "Please be more specific" ||
    //   botResponse === "Entity not found" ||
    //   botResponse === "Code not found"
    // ) {
    //   // Send a new request to bardapi
    //   const bardapiRequest = await fetch("process.env.REACT_APP_BACKEND_URL +bardapi", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ input: message }),
    //   });

    //   let response = await bardapiRequest.json();
    //   let botResponse = convertResponseToString(response);
    //   console.log();
    //   console.log("res ", response);
    //   // console.log("botres ", botResponse);

    //   setMessages([
    //     ...messages,
    //     { content: message, sender: "user" },
    //     { content: botResponse, sender: "bot" },
    //   ]);
    //   setInputMessage("");
    // } else {

    if (
      botResponse === "Code not found" ||
      botResponse === "Please be more specific"
    ) {
      const chatGptResponse = await fetch(
        process.env.REACT_APP_BACKEND_URL + "ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: message }),
        }
      );

      const chatGptData = await chatGptResponse.json();
      botResponse = chatGptData.response;
    }

    console.log(response);
    console.log(botResponse);
    console.log(botOptions);
    setMessages([
      ...messages,
      { content: message, sender: "user" },
      { content: botResponse, sender: "bot" },
    ]);
    setInputMessage("");
    setOptions(botOptions);
  };
  const convertResponseToString = (response) => {
    if (typeof response === "object") {
      if (Array.isArray(response)) {
        // Convert arrays to comma-separated string
        return response.join(", ");
      } else {
        // Convert objects to JSON string
        return JSON.stringify(response);
      }
    } else {
      // Return other types as is (e.g., strings, numbers)
      return response.toString();
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleOptionSelect = async (option) => {
    let requestBody;

    if (typeof option === "string") {
      requestBody = option;
    } else {
      requestBody = option.title;
    }
    const request = await fetch("http://localhost:5001/continue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: requestBody }), // Pass the selected option ID instead of the option itself
    });

    const response = await request.json();
    const botResponse = convertResponseToString(response.response.response);
    const botOptions = response.response.options;

    // Update the messages state to include the user-selected option

    if (
      botResponse === "Code not found" ||
      botResponse === "Please be more specific"
    ) {
      const chatGptResponse = await fetch(
        process.env.REACT_APP_BACKEND_URL + "ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: requestBody }),
        }
      );

      const chatGptData = await chatGptResponse.json();
      botResponse = chatGptData.response;
    }

    setMessages((messages) => [
      ...messages,
      { content: option.title, sender: "user" },
      { content: botResponse, sender: "bot" },
    ]);

    // Update the options state with new options or clear it if no more options are available
    setOptions(Object.keys(botOptions).length > 0 ? botOptions : []);
  };

  return (
    <div className={`chatbot ${isOpen ? "open" : ""}`}>
      <div className="chat-header" onClick={handleToggle}>
        <h3>Chatbot</h3>
        <div className="toggle-icon">
          {isOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "user" : "bot"}`}
          >
            {message.content}
          </div>
        ))}
      </div>

      {/* {Array.isArray(options) && options.length > 0 && ( */}
      {options && Object.keys(options).length > 0 && (
        <div className="options">
          {/* {options.map((option) => (
            <button key={option} onClick={() => handleOptionSelect(option)}>
              {option.title} */}
          {Object.entries(options).map(([key, value]) => (
            <button key={key} onClick={() => handleOptionSelect(value)}>
              {value.title || value}
            </button>
          ))}
        </div>
      )}

      <form className="chat-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          name="message"
          placeholder="Type your message"
          value={inputMessage}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
