import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const GiftForLucy = () => {
  const [stage, setStage] = useState(0);
  const [opened, setOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // For the floating hearts effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useEffect(() => {
    if (stage > 0) {
      const timer = setTimeout(() => {
        if (hearts.length < 15) {
          setHearts(prev => [...prev, {
            id: Date.now(),
            x: mousePos.x - 10,
            y: mousePos.y - 10,
            size: Math.random() * 20 + 10,
            duration: Math.random() * 2 + 1,
            opacity: Math.random() * 0.7 + 0.3
          }]);
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [mousePos, hearts, stage]);
  
  useEffect(() => {
    if (hearts.length > 0) {
      const timer = setTimeout(() => {
        setHearts(hearts.slice(1));
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [hearts]);
  
  const messages = [
    "Dear Lucy Wakiini,",
    "You bring light to my day. You’ve got this way about you that’s hard to ignore.",
    "Your smile is contagious",
    "I make time for things that matter—and right now, you’re one of them.",
    "Sorry for keeping you awake till now btw ",
    ""
  ];
  
  const advanceStage = () => {
    if (stage < messages.length - 1) {
      setStage(stage + 1);
    } else if (!showMessage) {
      setShowMessage(true);
    }
  };
  
  const handleEnvelopeClick = () => {
    setOpened(true);
    setTimeout(() => {
      setStage(1);
    }, 1000);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 relative overflow-hidden p-4">
      {/* Floating hearts effect */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute pointer-events-none animate-float"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            animationDuration: `${heart.duration}s`,
            opacity: heart.opacity,
          }}
        >
          <Heart
            size={heart.size}
            color="#ff6b81"
            fill="#ff6b81"
            className="animate-pulse"
          />
        </div>
      ))}
      
      {/* Main container */}
      <div className="max-w-md w-full">
        {!opened ? (
          // Envelope when closed
          <div 
            className="bg-rose-600 rounded-lg shadow-xl p-4 cursor-pointer transform hover:scale-105 transition-all duration-300 envelope"
            onClick={handleEnvelopeClick}
          >
            <div className="flex flex-col items-center justify-center p-12 bg-rose-500 rounded text-white">
              <div className="text-2xl font-bold mb-2">For Lucy</div>
              <div className="text-sm">Click to open</div>
              <Heart className="mt-4 animate-pulse" color="white" fill="white" size={36} />
            </div>
          </div>
        ) : (
          // Content after opening
          <div 
            className="bg-white rounded-lg shadow-2xl p-8 cursor-pointer transform transition-all duration-700 flex flex-col items-center opened-card"
            style={{ 
              boxShadow: '0 0 30px rgba(255, 107, 129, 0.5)',
              minHeight: '400px'
            }}
            onClick={advanceStage}
          >
            {showMessage ? (
              // Final message
              <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
                <h1 className="text-3xl font-bold text-rose-600">Lucy Wakini</h1>
                <p className="text-gray-700 leading-relaxed">
                  This is just a small token to show you how special you are.
                </p>
                <div className="flex space-x-2 mt-4">
                  <Heart className="text-rose-500" fill="#fb7185" />
                  <Heart className="text-rose-500 animate-bounce" fill="#fb7185" />
                  <Heart className="text-rose-500" fill="#fb7185" />
                </div>
                {/* <p className="text-sm text-gray-500 mt-8">
                  Click anywhere to see the messages again
                </p> */}
              </div>
            ) : (
              // Progressive messages
              <div className="flex flex-col items-center justify-center h-full w-full text-center">
                <div className="text-3xl font-serif text-rose-600 mb-4 transition-all duration-500 transform"
                     style={{ opacity: 1 }}>
                  {messages[stage]}
                </div>
                {stage > 0 && (
                  <div className="mt-6 text-gray-500 text-sm">
                    {stage < messages.length - 1 ? "Click to continue" : "Click for a special message"}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftForLucy;