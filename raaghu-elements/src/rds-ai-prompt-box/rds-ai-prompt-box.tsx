import React, { useState, useRef } from "react";
import "./rds-ai-prompt-box.css";
import RdsIcon from "../rds-icon/rds-icon";

export interface RdsAiPromptBoxProps {
  prefilledprompt?: { question: string }[];
  colorVariant?: string;
  outputtype?: string;
  showVariations?: boolean;
  onClick?: ($event: React.MouseEvent<HTMLLIElement>, val: string) => void;
  generateButtonText?: string;
  designText?: string;
  codeText?: string;
  aiPunditLogoImage?: string;
  placeholderText?: string;
}

const RdsAiPromptBox = (props: RdsAiPromptBoxProps) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [outputImages, setOutputImages] = useState<string[]>([]);
  const [chatHistory, setChatHistory] = useState<
    { type: "input" | "output"; text: string; images: string[] }[]
  >([]);
  const [selectedViews, setSelectedViews] = useState<{ [key: number]: string }>(
    {}
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const defaultImage = "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/default-image.png";

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (event.target.files.length > 2) {
        event.preventDefault();
        alert("You can only select up to 2 images.");
      } else {
        const filesArray = Array.from(event.target.files);
        const newImages: string[] = [];

        filesArray.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              newImages.push(e.target.result as string);
              if (newImages.length === filesArray.length) {
                setSelectedImages((prevImages) => {
                  const totalImages = [...prevImages, ...newImages];
                  if (totalImages.length > 2) {
                    return totalImages.slice(totalImages.length - 2);
                  }
                  return totalImages;
                });
              }
            }
          };
          reader.readAsDataURL(file);
        });

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handlePromptText = (question: any) => {
    setInputText(question);
    setSelectedImages([]);
  };

  const handleGenerateButtonClick = () => {
    // Use default text if inputText is empty
    const textToUse = inputText.trim() !== "" ? inputText : "Message Bubble";
    const imagesToUse = selectedImages.length > 0 ? selectedImages : [];

    // Add input to chat history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { type: "input", text: textToUse, images: imagesToUse },
    ]);

    // Simulate generating output
    setTimeout(() => {
      const generatedText = `${textToUse}`;
      setOutputText(generatedText);
      setOutputImages(imagesToUse);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "output", text: generatedText, images: imagesToUse },
      ]);

      // Set default view to "Design" for the new response
      setSelectedViews((prevViews) => ({
        ...prevViews,
        [chatHistory.length + 1]: "Design",
      }));
    }, 1000); // Simulate delay for generating response

    // Clear input and selected images
    setInputText("");
    setSelectedImages([]);
  };

  const handleButtonClick = (button: any) => {
    let incrementValue = 0;
    switch (button.id) {
      case "1":
        incrementValue = 1;
        break;
      case "2":
        incrementValue = 2;
        break;
      case "4":
        incrementValue = 4;
        break;
      default:
        break;
    }

    if (incrementValue > 0) {
      const newOutputs = Array(incrementValue).fill({
        type: "output",
        text: outputText,
        images: outputImages,
      });

      setChatHistory((prevHistory) => [...prevHistory, ...newOutputs]);

      // Set default view to "Design" for the new responses
      setSelectedViews((prevViews) => {
        const newViews = { ...prevViews };
        const startIndex = chatHistory.length;
        for (let i = 0; i < incrementValue; i++) {
          newViews[startIndex + i] = "Design";
        }
        return newViews;
      });
    }

    if (button.id === "Chat") {
      // Clear chat history, input text, and selected images
      setChatHistory([]);
      setInputText("");
      setSelectedImages([]);
    }
  };

  const handleClick = (index: number, view: string) => {
    setSelectedViews((prevViews) => ({
      ...prevViews,
      [index]: view,
    }));
  };

  const handleRegenerate = () => {
    const lastInput = chatHistory
      .slice()
      .reverse()
      .find((entry) => entry.type === "input");
    if (lastInput) {
      const { text, images } = lastInput;
      const generatedText = `${text}`;
      setOutputText(generatedText);
      setOutputImages(images);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "output", text: generatedText, images },
      ]);

      // Set default view to "Design" for the regenerated response
      setSelectedViews((prevViews) => ({
        ...prevViews,
        [chatHistory.length]: "Design",
      }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
    if (checked) {
      // Perform actions to select all data into the frame
    } else {
      // Perform actions to deselect all data from the frame
    }
  };

  const handleStarClick = () => {
    setIsStarred(!isStarred);
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    if (isDisliked) {
      setIsDisliked(false); // Ensure dislike is reset if like is clicked
    }
  };

  const handleDislikeClick = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) {
      setIsLiked(false); // Ensure like is reset if dislike is clicked
    }
  };

  const preCode = `<!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles.css">
        <title>Login Screen</title>
    </head>
    <body>
        <div class="login-container">
            <h2>Login</h2>
                <form action="submit_login.php" method="POST">
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit">Login</button>
                </form>
        </div>
    </body>
 </html>`;

  return (
    <div className="container-fluid p-0">
      {/* Chat History Section */}
      <div className="chat-history form-controls">
        {chatHistory.map((entry, index) => (
          <div key={index} className={`chat-entry ${entry.type}`}>
            {entry.type === "output" && (
              <div className="output-container">
                <span className="pundit-image-container mt-3">
                  <img
                    className="img"
                    src={
                      props.aiPunditLogoImage ||
                      "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/pundit-color-logo.png"
                    }
                    alt="ai pundit"
                    style={{ height: "3.3rem" }}
                  />
                </span>
                <div className="output-content">
                  {entry && (
                    <>
                      <div
                        id="custominputoutput"
                        className={`p-3 text-light rounded bg-white border position-relative`}
                      >
                        {entry.text && (
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <div>{entry.text}</div>
                            <div className="d-flex ml-auto">
                              {props.outputtype ===
                                "Raaghu_reply_with_design" && (
                                <div className="toggle-container ms-2">
                                  <div
                                    className={`toggle-option ${
                                      selectedViews[index] === "Design"
                                        ? "selected"
                                        : "unselected"
                                    }`}
                                    onClick={() => handleClick(index, "Design")}
                                  >
                                    {props.designText || "Design"}
                                  </div>
                                  <div
                                    className={`toggle-option ${
                                      selectedViews[index] === "Code"
                                        ? "selected"
                                        : "unselected"
                                    }`}
                                    onClick={() => handleClick(index, "Code")}
                                  >
                                    {props.codeText || "Code"}
                                  </div>
                                </div>
                              )}
                              <span
                                className="form-controls border-primary ms-1 cursor-pointer"
                                style={{ height: "2.5rem" }}
                                onClick={handleRegenerate}
                                title="Regenerate"
                              >
                                <RdsIcon
                                  name="sync"
                                  height="22px"
                                  width="22px"
                                  colorVariant="primary"
                                  fill={false}
                                  stroke={false}
                                />
                              </span>
                            </div>
                          </div>
                        )}
                        {entry.images.length > 0 &&
                          selectedViews[index] === "Design" && (
                            <div className="mb-3">
                              {entry.images.map((image, imgIndex) => (
                                <img
                                  key={imgIndex}
                                  src={image}
                                  alt={`Chat ${entry.type} ${imgIndex}`}
                                  className="chat-image mt-2"
                                />
                              ))}
                            </div>
                          )}
                        {selectedViews[index] === "Code" && (
                          <div className="mb-3">
                            <pre className="code-block">{preCode}</pre>
                          </div>
                        )}
                        <div className="hover-buttons">
                          <span className="hover-button" title="Select All">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              className={
                                "form-check-input customcheckbox border-primary"
                              }
                              onChange={(e) =>
                                handleCheckboxChange(e.target.checked)
                              }
                            />
                          </span>
                          <span
                            className="hover-button"
                            title="Favourite"
                            onClick={handleStarClick}
                          >
                            <RdsIcon
                              name="star"
                              height="33px"
                              width="24px"
                              colorVariant="primary"
                              fill={isStarred}
                              stroke={!isStarred}
                            />
                          </span>
                          <span
                            className="hover-button"
                            title="Like"
                            onClick={handleLikeClick}
                          >
                            <RdsIcon
                              name="likeaiprompt"
                              height="33px"
                              width="24px"
                              colorVariant="primary"
                              fill={isLiked}
                              stroke={!isLiked}
                            />
                          </span>
                          <span
                            className="hover-button"
                            title="Dislike"
                            onClick={handleDislikeClick}
                          >
                            <RdsIcon
                              name="dislikeaiprompt"
                              height="33px"
                              width="24px"
                              colorVariant="primary"
                              fill={isDisliked}
                              stroke={!isDisliked}
                            />
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            {entry.type === "input" && (
              <div
                id="custominputoutput"
                className={`p-3 text-light rounded custombg`}
              >
                {entry.text && <div>{entry.text}</div>}
                {entry.images.length > 0 && (
                  <div className="mb-3">
                    {entry.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        alt={`Chat ${entry.type} ${imgIndex}`}
                        className="chat-image mt-2"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={`prefilled-prompts d-flex justify-content-between`}>
        {props.prefilledprompt &&
          props.prefilledprompt.map(
            (prompt: { question: string }, index: number) => (
              <button
                key={index}
                className={`form-controls prompt-button text-primary border-primary`}
                onClick={(e) =>
                  handlePromptText((e.target as HTMLButtonElement).value)
                }
                value={prompt.question}
              >
                {prompt.question}
              </button>
            )
          )}
      </div>
      <div className="main-content d-lg-flex d-md-flex">
        <div className="d-flex w-100">
          <div className="button-column">
            {props.showVariations && (
              <div className="button-row">
                <button
                  className={`form-controls sidebar-button me-2 text-primary border-primary`}
                  onClick={() => handleButtonClick({ id: "1" })}
                >
                  1
                </button>
                <button
                  className={`form-controls sidebar-button me-2 text-primary border-primary`}
                  onClick={() => handleButtonClick({ id: "2" })}
                >
                  2
                </button>
              </div>
            )}
            <div className={`button-row ${props.showVariations ? "mt-2" : ""}`}>
              {props.showVariations && (
                <button
                  className={`form-controls sidebar-button me-2 text-primary border-primary`}
                  onClick={() => handleButtonClick({ id: "4" })}
                >
                  4
                </button>
              )}
              <button
                className={`form-controls sidebar-button me-2 text-primary border-primary`}
                onClick={() => handleButtonClick({ id: "Chat" })}
                title="Clear Chat"
              >
                <RdsIcon
                  name="newchat"
                  height="33px"
                  width="24px"
                  colorVariant="primary"
                  fill={false}
                  stroke={false}
                />
              </button>
            </div>
          </div>
          <div className="input-column">
            <div className="input-wrapper">
              <div className="ai-prompt">
              <div className="input-with-image">
                <textarea
                  className={`form-controls input-box text-${props.colorVariant} border-${props.colorVariant}`}
                  placeholder={props.placeholderText || "Placeholder Text"}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  title="Enter your prompt here"
                />
                <div className="image-preview-group">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="image-preview me-2">
                      <img
                        src={image}
                        alt={`Selected ${index}`}
                        className="selected-image"
                        title={`Selected image ${index + 1}`}
                      />
                      <button
                        className="remove-image-button"
                        onClick={() => removeImage(index)}
                        title="Remove image"
                      >
                        ✖
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              </div>
              <label
                htmlFor="file-upload"
                className={`file-upload-label`}
                title="Attach image"
              >
                <RdsIcon
                  name="attachment"
                  height="20px"
                  width="20px"
                  colorVariant={props.colorVariant}
                  fill={false}
                  stroke={true}
                />
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                className="file-input"
                style={{ display: "none" }}
                onChange={handleImageChange}
                ref={fileInputRef}
                title="Upload images"
              />
            </div>
          </div>
        </div>
        <div className="action-column mt-1">
          <button
            disabled={inputText.trim() === "" && selectedImages.length === 0}
            className={`btn form-controls generate-button mb-1 btn-primary bg-primary text-white`}
            onClick={handleGenerateButtonClick}
            title={props.generateButtonText || "Generate"}
          >
            <RdsIcon
              name="aigenerate"
              height="20px"
              width="20px"
              colorVariant="light"
              fill={false}
              stroke={true}
            />
            {props.generateButtonText || "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RdsAiPromptBox;