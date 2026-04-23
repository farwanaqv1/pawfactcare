import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

const staticFAQ = [
  { q: "How often should I feed my cat?", a: "Feed adult cats 2x a day, kittens 3-4x." },
  { q: "Best food for cats?", a: "High-protein wet food and some dry kibble." },
  { q: "Do cats need vaccinations?", a: "Yes, core vaccines include rabies, FVRCP." },
  { q: "How often should I walk my dog?", a: "At least 30-60 min daily." },
  { q: "Best food for dogs?", a: "High-quality kibble or raw diet (consult vet)." },
  { q: "Do dogs need grooming?", a: "Yes, every 4-6 weeks depending on breed." },
  { q: "Can pets eat chocolate?", a: "No! Chocolate is toxic for both dogs and cats." },
  { q: "How often should I clean a litter box?", a: "Scoop it daily and deep-clean weekly." },
  { q: "Should I brush my dog’s teeth?", a: "Yes, 2-3 times a week with pet-safe toothpaste." },
  { q: "How to keep my dog cool in summer?", a: "Provide shade, fresh water, and avoid walks in peak heat." }
];

const searchableQA = [
  { q: "hi", a: "Hi 👋! How can I help you with your pet today?" },
  { q: "hello", a: "Hello! 😊 Ask me anything about your pet’s care." },
  { q: "hey", a: "Hey there! 🐾 Need help with feeding, health, or grooming?" },
  { q: "what is this website about", a: "This website is a PetCare platform — it guides owners about feeding, grooming, health tips, adoption, and more." },
  { q: "how can it help me", a: "PetCare helps you manage your pet’s routine, find tips, explore products, and even connect with vets & shelters." },
  { q: "who can use this website", a: "Pet owners, veterinarians, and animal shelters — anyone interested in better pet care!" },
  { q: "is it free", a: "Yes! All guides, tips, and basic features of PetCare are free to access." },
  { q: "can i adopt pets here", a: "Yes 🐶🐱 — visit the Shelter section to explore pets ready for adoption." },
  { q: "how do i contact a vet", a: "Go to the Veterinarian page to see profiles and available time slots of vets." },
  { q: "how do i give feedback", a: "Open the Feedback page to share your suggestions or experiences." },
  { q: "what is ai doctor", a: "The AI Doctor is a smart helper that gives quick guidance for common pet issues, like basic eye or health tips." },
  { q: "feeding tips", a: "Feed your pet high-quality food appropriate for its age, size, and breed." },
  { q: "how often to bathe dog", a: "Most dogs should be bathed every 4-6 weeks, depending on coat type." },
  { q: "how to socialize my puppy", a: "Introduce your puppy to different people, pets, and places early — keep sessions positive." },
  { q: "cat litter training", a: "Keep the litter box clean, place your cat inside after meals, and reward good behavior." },
  { q: "what to do if my pet is sick", a: "If your pet seems ill, contact a vet immediately or use the AI Doctor for basic guidance." },
  { q: "exercise for indoor cats", a: "Use toys, climbing trees, and playtime to keep indoor cats active." },
  { q: "dog walking tips", a: "Walk at least 30 minutes daily, use a comfortable leash, and let them explore safely." },
  { q: "can i share my pet story", a: "Yes! You can post your success stories in the community section." },
  { q: "are my details safe", a: "Yes, this platform only shows static info and does not store personal data on a server." },
  { q: "how to report lost pet", a: "Contact local shelters or vets — you can also post in our community board." },
  { q: "thank you", a: "You're welcome! 🐕🐈 Always happy to help." },
  { q: "bye", a: "Goodbye 👋! Take care of your furry friends." },
  { q: "good morning", a: "Good morning ☀️! How can I help you and your pet today?" },
  { q: "good night", a: "Good night 🌙! Sweet dreams to you and your pets." }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! 👋 I’m your PetCare assistant. Ask me anything about pets or select a question below!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // ✅ Add ref for messages container
  const messagesEndRef = useRef(null);

  const fetchAnswer = async (question) => {
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question }),
      });
      const data = await response.json();
      return data.reply || "Sorry, I couldn’t find an answer 😅";
    } catch (error) {
      console.error(error);
      return "⚠️ Error connecting to server!";
    }
  };

  const getStaticAnswer = (question) => {
    const lowerQ = question.toLowerCase();
    for (let item of staticFAQ) {
      if (lowerQ.includes(item.q.toLowerCase())) return item.a;
    }
    for (let item of searchableQA) {
      if (lowerQ.includes(item.q.toLowerCase())) return item.a;
    }
    return null;
  };

  const handleSend = async (question) => {
    if (!question.trim()) return;

    setMessages(prev => [...prev, { from: "user", text: question }]);
    setInput("");
    setIsTyping(true);

    let answer = getStaticAnswer(question);
    if (!answer) answer = await fetchAnswer(question);

    setMessages(prev => [...prev, { from: "bot", text: answer }]);
    setIsTyping(false);
  };

  // ✅ Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  return (
    <>
      <img
        src="/chatboticon.png"
        alt="Chat"
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
      />

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>PetCare Chat</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.from}`}>{msg.text}</div>
            ))}
            {isTyping && <div className="message bot">Typing...</div>}
            {/* ✅ Dummy div to scroll into view */}
            <div ref={messagesEndRef}></div>
          </div>

          <div className="horizontal-scroll">
            {staticFAQ.map((faq, idx) => (
              <button key={idx} className="suggestion-btn" onClick={() => handleSend(faq.q)}>
                {faq.q}
              </button>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend(input)}
            />
            <button onClick={() => handleSend(input)}>➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
