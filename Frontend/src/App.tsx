import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
// @ts-ignore
import * as SimpleCodeEditor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Code, Bot, Loader2, Copy, Check } from "lucide-react";
import "./App.css";

// @ts-ignore
const Editor =
  SimpleCodeEditor.default?.default ||
  SimpleCodeEditor.default ||
  SimpleCodeEditor;

const INITIAL_CODE = `function sum() {
  return 1 + 1
}`;

// Custom Code Block Component
const CustomCode = ({ className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || "");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!match) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <span className="lang-tag">{match[1]}</span>
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? (
            <Check size={14} className="text-green-400" />
          ) : (
            <Copy size={14} />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <code className={className} {...props}>
        {children}
      </code>
    </div>
  );
};

function App() {
  const [code, setCode] = useState(INITIAL_CODE);
  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    if (loading) return;
    setLoading(true);
    setReview("");
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setReview(response.data);
    } catch (error) {
      setReview("Error fetching review. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="header"
      >
        <div className="logo-section">
          <div className="logo-icon glass">
            <Bot size={24} className="text-accent" />
          </div>
          <h1 className="title">
            AI <span className="gradient-text">CodeReviewer</span>
          </h1>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Panel: Editor */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="panel left-panel"
        >
          <div className="glass panel-inner">
            <div className="panel-header">
              <span className="file-name">
                <Code size={14} /> input.js
              </span>
              <div className="window-controls">
                <div className="control red"></div>
                <div className="control yellow"></div>
                <div className="control green"></div>
              </div>
            </div>
            <div className="editor-wrapper custom-scrollbar">
              <Editor
                value={code}
                onValueChange={(code: string) => setCode(code)}
                highlight={(code: string) =>
                  prism.highlight(
                    code,
                    prism.languages.javascript!,
                    "javascript",
                  )
                }
                padding={16}
                style={{
                  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                  fontSize: 16,
                  minHeight: "100%",
                }}
                className="editor-content"
              />
            </div>
          </div>

          {/* Review Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={reviewCode}
            disabled={loading}
            className={`review-btn ${loading ? "loading" : ""}`}
          >
            {loading ? (
              <Loader2 className="spinner" />
            ) : (
              <Play className="icon-play" />
            )}
            {loading ? "Analyzing..." : "Review Code"}
          </motion.button>
        </motion.div>

        {/* Right Panel: Review Output */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="panel right-panel glass"
        >
          <div className="panel-header">
            <span className="file-name">AI Feedback</span>
          </div>
          <div className="review-content custom-scrollbar md-content">
            {review ? (
              <Markdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code: CustomCode,
                }}
              >
                {review}
              </Markdown>
            ) : (
              <div className="placeholder">
                <Bot size={48} strokeWidth={1} />
                <p>Write or paste code and click Review</p>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default App;
