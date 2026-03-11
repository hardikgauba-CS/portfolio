'use client';

import { useState } from 'react';
import { MessageSquare, Send, Smile } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from 'framer-motion';

interface FeedbackWidgetProps {
  isDark: boolean;
}

export function FeedbackWidget({ isDark }: FeedbackWidgetProps) {
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState({
    name: '',
    design: '',
    usability: '',
    content: '',
    additionalSuggestions: '',
  });
  const [thankYou, setThankYou] = useState(false);

  const questions = [
    {
      question: "What is your name?",
      type: "input",
      key: "name",
    },
    {
      question: "How would you rate the design of this portfolio?",
      options: ["Excellent", "Good", "Average", "Poor"],
      type: "radio",
      key: "design",
    },
    {
      question: "How easy is it to navigate this portfolio?",
      options: ["Very Easy", "Easy", "Somewhat Difficult", "Very Difficult"],
      type: "radio",
      key: "usability",
    },
    {
      question: "How informative is the content of this portfolio?",
      options: ["Very Informative", "Informative", "Somewhat Informative", "Not Informative"],
      type: "radio",
      key: "content",
    },
    {
      question: "Any additional suggestions?",
      type: "textarea",
      key: "additionalSuggestions",
    },
  ];

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback), // Send all feedback fields
      });
  
      if (res.ok) {
        setThankYou(true);
        setTimeout(() => {
          setThankYou(false);
          setFeedback({
            name: '',
            design: '',
            usability: '',
            content: '',
            additionalSuggestions: '',
          });
          setStep(0);
        }, 5000);
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  if (thankYou) {
    return (
      <Card className={`backdrop-blur-sm h-full transition-colors duration-300 rounded-3xl ${
        isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
      }`}>
        <CardContent className="p-6 h-full flex flex-col items-center justify-center">
          <Smile className="w-12 h-12 text-primary mb-4" />
          <p className="text-xl font-medium mb-2 text-center">Thank you for your feedback!</p>
          <p className="text-sm text-muted-foreground text-center">
            Check back later for updates and new features on my portfolio.
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[step];

  return (
    <Card className={`backdrop-blur-sm h-full transition-colors duration-300 rounded-3xl ${
      isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
    }`}>
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-primary" />
          <span className="font-medium">Feedback</span>
        </div>
        <div className="space-y-4 flex-grow">
          <p className="text-lg font-medium">{currentQuestion.question}</p>
          {currentQuestion.type === "radio" && (
            <RadioGroup
              value={feedback[currentQuestion.key as keyof typeof feedback]}
              onValueChange={(value) =>
                setFeedback({ ...feedback, [currentQuestion.key]: value })
              }
            >
              {currentQuestion.options?.map((option) => (
                <motion.div
                  key={option}
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </motion.div>
              ))}
            </RadioGroup>
          )}
          {currentQuestion.type === "input" && (
            <input
              type="text"
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                isDark ? 'bg-[#1e1e2f] text-white border-gray-600' : 'bg-white text-black border-gray-300'
              }`}
              placeholder="Enter your name"
              value={feedback.name}
              onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
            />
          )}
          {currentQuestion.type === "textarea" && (
            <textarea
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                isDark ? 'bg-[#1e1e2f] text-white border-gray-600' : 'bg-white text-black border-gray-300'
              }`}
              rows={4}
              placeholder="Your suggestions..."
              value={feedback.additionalSuggestions}
              onChange={(e) =>
                setFeedback({ ...feedback, additionalSuggestions: e.target.value })
              }
            />
          )}

        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-4"
        >
          <Button onClick={handleNext} className="w-full">
            {step === questions.length - 1 ? 'Submit' : 'Next'}
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
