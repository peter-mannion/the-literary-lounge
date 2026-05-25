import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../utils/api";
import "./Dashboard.css";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { user, token, logout } = useContext(AuthContext);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    api("http://localhost:5000/api/topics", "GET", null, token).then(setTopics);
  }, [token]);

  useEffect(() => {
    if (!selectedTopic) return;

    api(
      `http://localhost:5000/api/questions?topic=${selectedTopic}`,
      "GET",
      null,
      token,
    ).then((res) => {
      console.log("API returned questions:", res);
      setQuestions(res);
    });
  }, [selectedTopic, token]);
  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          {topics.map((topic) => (
            <div
              key={topic._id}
              className={
                selectedTopic === topic._id
                  ? "topic-item selected"
                  : "topic-item"
              }
              onClick={() => setSelectedTopic(topic._id)}
            >
              {topic.name}
            </div>
          ))}
        </div>

        <div className="dashboard-content">
          {!selectedTopic && <p>Select a Topic to view its questions.</p>}

          {selectedTopic && (
            <>
              <h2>Questions</h2>

              {questions.length === 0 && <p>No questions yet.</p>}

              {questions.map((q) => (
                <div key={q._id} className="question-item">
                  <h3>{q.title}</h3>
                  <p>{q.body}</p>
                  <div className="meta">
                    <span>
                      {q.user && <small>Posted by: {q.user.username}</small>}
                    </span>
                    <span>
                      <small>{new Date(q.createdAt).toLocaleString()}</small>
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
