"use client";

import React, { useState, useEffect } from "react";
import Icon from "@/components/icon";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

interface Scenario {
  id: string;
  title: string;
  icon: string;
  userMessage: string;
  aiResponse: string;
  contextBar: {
    icon: string;
    text: string;
    status: string;
  };
}

const scenarios: Scenario[] = {
  emergency: {
    id: "emergency",
    title: "Emergency",
    icon: "RiAlertLine",
    userMessage: "There's been an earthquake, what should I do?",
    aiResponse: "DROP immediately to hands and knees. Take COVER under a sturdy desk or table. HOLD ON and protect your head/neck with your arms. Stay where you are until shaking stops. Do NOT run outside during shaking.\n\nQuick Actions:\n1. DROP to hands and knees\n2. Take COVER under sturdy furniture\n3. HOLD ON and protect head/neck",
    contextBar: {
      icon: "🔴",
      text: "Post-earthquake 00:52",
      status: "Responding"
    }
  },
  medical: {
    id: "medical",
    title: "Medical Help",
    icon: "RiFirstAidKitLine",
    userMessage: "Someone is unconscious and not breathing",
    aiResponse: "Call emergency services if possible. Start CPR immediately:\n\n1. Place heel of hand on center of chest\n2. Give 30 chest compressions (2 inches deep, 100-120/min)\n3. Tilt head back, lift chin\n4. Give 2 rescue breaths\n5. Continue cycle until help arrives\n\nRemember: Push hard and fast. Don't stop unless the person starts breathing or help arrives.",
    contextBar: {
      icon: "🏥",
      text: "Medical Emergency",
      status: "First Aid Mode"
    }
  },
  trapped: {
    id: "trapped",
    title: "Trapped",
    icon: "RiErrorWarningLine",
    userMessage: "I'm trapped under debris and can't move",
    aiResponse: "Stay calm and conserve energy. Do not shout unless you hear rescuers - save your voice. Tap on pipes or walls to signal location. Use whistle if available. Cover mouth with cloth to avoid dust. Do not light matches or lighters. Move as little as possible to avoid kicking up dust.\n\nQuick Actions:\n1. Stay calm, conserve energy\n2. Tap on pipes to signal rescuers\n3. Cover mouth to avoid dust",
    contextBar: {
      icon: "⚠️",
      text: "Trapped",
      status: "100%"
    }
  },
  sos: {
    id: "sos",
    title: "SOS",
    icon: "RiSignalTowerLine",
    userMessage: "I need to send an SOS signal",
    aiResponse: "Multiple ways to signal for help:\n\n1. Visual: Use mirrors, flashlight, or bright cloth\n2. Audio: Three short, three long, three short (SOS pattern)\n3. Ground signals: Make large X or SOS with rocks/debris\n4. Smoke signals: If safe, create smoke during day\n5. Phone: Even without signal, try 911 - it may connect\n\nStay in open area if possible. Make yourself visible.",
    contextBar: {
      icon: "🆘",
      text: "SOS Mode",
      status: "Signaling"
    }
  }
};

export default function InteractiveMazuDemo() {
  const [activeScenario, setActiveScenario] = useState<string>("emergency");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState("12:32");

  // Update clock every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleScenarioClick = (scenarioId: string) => {
    const scenario = scenarios[scenarioId];
    if (!scenario) return;

    setActiveScenario(scenarioId);
    setIsTyping(true);

    // Clear previous messages and add user message
    setMessages([
      {
        role: "user",
        content: scenario.userMessage,
        timestamp: currentTime
      }
    ]);

    // Simulate AI response with typing delay
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: scenario.aiResponse,
        timestamp: currentTime
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const currentScenario = scenarios[activeScenario];

  return (
    <section className="py-16 overflow-hidden">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Try Mazu in Action</h2>
          <p className="text-muted-foreground text-lg">
            Click any emergency scenario below to see how Mazu responds. No internet required - all AI processing happens on your device.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Phone Mockup */}
            <div className="relative mx-auto">
              <div className="relative bg-gray-900 rounded-[3rem] p-4 shadow-2xl" style={{ width: "375px", height: "812px" }}>
                {/* Phone Frame */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem]" />
                
                {/* Screen */}
                <div className="relative bg-[#0F0F0F] rounded-[2.5rem] h-full overflow-hidden">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-6 py-2 text-white text-sm">
                    <span>{currentTime}</span>
                    <div className="flex items-center gap-1">
                      <Icon name="RiWifiOffLine" className="w-4 h-4" />
                      <Icon name="RiSignalWifiOffLine" className="w-4 h-4" />
                      <Icon name="RiBatteryFill" className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Header */}
                  <div className="text-center py-3 border-b border-gray-800">
                    <h3 className="text-white text-xl font-semibold">Mazu</h3>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <span className="text-gray-400 text-sm">Powered by Gemma 3n</span>
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                  </div>

                  {/* Context Bar */}
                  <div className={cn(
                    "px-4 py-2 flex items-center justify-between text-white text-sm",
                    activeScenario === "medical" ? "bg-blue-600" : 
                    activeScenario === "sos" ? "bg-orange-600" : "bg-red-600"
                  )}>
                    <div className="flex items-center gap-2">
                      <span>{currentScenario.contextBar.icon}</span>
                      <span>{currentScenario.contextBar.text}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {activeScenario === "trapped" && "⚠️ "}
                      {currentScenario.contextBar.status}
                      {activeScenario === "trapped" && " | 🔋 100%"}
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto" style={{ height: "calc(100% - 280px)" }}>
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex gap-3 p-3 rounded-lg animate-in fade-in slide-in-from-bottom-2",
                          message.role === "user" ? "bg-blue-600" : "bg-gray-800"
                        )}
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                          {message.role === "user" ? "👤" : "🤖"}
                        </div>
                        <div className="flex-1">
                          <p className="text-white whitespace-pre-wrap">{message.content}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-400">{message.timestamp}</span>
                            {message.role === "assistant" && (
                              <span className="text-xs text-gray-500">• Gemma 3n • 0.5s • Offline mode • Based on Red Cross protocols</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-3 p-3 rounded-lg bg-gray-800 animate-pulse">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                          🤖
                        </div>
                        <div className="flex gap-1 items-center">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="absolute bottom-20 left-0 right-0 px-4">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {Object.values(scenarios).map((scenario) => (
                        <button
                          key={scenario.id}
                          onClick={() => handleScenarioClick(scenario.id)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all",
                            activeScenario === scenario.id
                              ? "bg-red-600 text-white"
                              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          )}
                        >
                          <Icon name={scenario.icon} className="w-4 h-4" />
                          <span className="text-sm font-medium">{scenario.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input Area (Visual Only) */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#1A1A1A] border-t border-gray-800">
                    <div className="flex gap-2">
                      <div className="flex-1 bg-[#242424] rounded-full px-4 py-3 text-gray-500 text-sm">
                        Type your message...
                      </div>
                      <button className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                        <Icon name="RiSendPlaneFill" className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scenario Cards */}
            <div className="lg:w-1/2 space-y-4">
              <h3 className="text-xl font-semibold mb-4">Click to simulate emergency scenarios:</h3>
              {Object.values(scenarios).map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => handleScenarioClick(scenario.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border-2 transition-all",
                    activeScenario === scenario.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon name={scenario.icon} className="w-6 h-6 text-primary" />
                    <div>
                      <h4 className="font-semibold">{scenario.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        "{scenario.userMessage}"
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}