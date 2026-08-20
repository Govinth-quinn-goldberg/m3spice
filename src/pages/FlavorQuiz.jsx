import React, { useState } from 'react';
import { Sparkles, ChevronRight, RotateCcw, CheckCircle, Eye } from 'lucide-react';
import { products } from '../data/products';

const FlavorQuiz = ({ onProductClick }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    cookingLevel: '',
    heatLevel: '',
    aromaPref: ''
  });
  const [quizFinished, setQuizFinished] = useState(false);
  const [matchedProduct, setMatchedProduct] = useState(null);

  const stepsCount = 3;

  const handleSelectAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    if (step < stepsCount) {
      setStep(prev => prev + 1);
    } else {
      const finalAnswers = { ...answers, [key]: value };
      const matched = evaluateMatch(finalAnswers);
      setMatchedProduct(matched);
      setQuizFinished(true);
    }
  };

  const evaluateMatch = (selections) => {
    const { heatLevel, aromaPref } = selections;

    // Kashmiri Chili Powder is mild & earthy
    if (heatLevel === 'Fiery' || heatLevel === 'Mild' && aromaPref === 'Earthy') {
      return products.find(p => p.id === 'm3-kashmiri-chili') || products[0];
    }
    // Cardamom is sweet & herbal & camphorous
    if (aromaPref === 'Herbal') {
      return products.find(p => p.id === 'm3-standard-cardamom') || products[1];
    }
    // Saffron is sweet Hay/metallic & premium
    if (aromaPref === 'Sweet' && heatLevel === 'Mild') {
      return products.find(p => p.id === 'm3-saffron') || products[5];
    }
    // Turmeric (Golden Milk) is earthy & herbal
    if (aromaPref === 'Earthy' && heatLevel === 'Mild') {
      return products.find(p => p.id === 'm3-lakadong-turmeric') || products[6];
    }
    
    // Default to signature Garam Masala (Balanced heat, Warm aroma)
    return products.find(p => p.id === 'm3-organic-garam-masala') || products[3];
  };

  const handleResetQuiz = () => {
    setStep(1);
    setAnswers({
      cookingLevel: '',
      heatLevel: '',
      aromaPref: ''
    });
    setQuizFinished(false);
    setMatchedProduct(null);
  };

  const currentQuestions = {
    1: {
      key: 'cookingLevel',
      question: "Which describes your relationship with cooking?",
      options: [
        { label: "Home Cook", desc: "I enjoy daily comfort meals and simple ingredients.", emoji: "🍳" },
        { label: "Enthusiast Baker", desc: "I love sweets, bread doughs, and delicate flavorings.", emoji: "🥐" },
        { label: "Gourmet Chef", desc: "I experiment with slow-cooked stews, tandoori grills, and layered broths.", emoji: "🧑‍🍳" }
      ]
    },
    2: {
      key: 'heatLevel',
      question: "What level of heat warming makes your palate sing?",
      options: [
        { label: "Mild & Fruity", desc: "Flavor and color are everything, sharp heat is not for me.", emoji: "🍓" },
        { label: "Balanced Warmth", desc: "I want slow-release depth and throat-coating warmth.", emoji: "🔥" },
        { label: "Bold & Fiery", desc: "Give me intense heat alongside rich volatile spice oils.", emoji: "🌶️" }
      ]
    },
    3: {
      key: 'aromaPref',
      question: "Which scent trail draws you in when blooming spices?",
      options: [
        { label: "Earthy & Grounding", desc: "Musky, dry clay soil, turmeric root, and leather notes.", emoji: "🌳" },
        { label: "Sweet & Woodsy", desc: "Cinnamon bark, star anise pod, nutmeg, and cozy honey.", emoji: "🪵" },
        { label: "Herbal & Camphorous", desc: "Floral pods, cooling eucalyptus, fresh pine, and mint.", emoji: "🌿" }
      ]
    }
  };

  const activeQuestion = currentQuestions[step];

  return (
    <div className="max-w-2xl mx-auto pb-16 font-sans">
      
      {/* Quiz Progress Header */}
      {!quizFinished && (
        <div className="space-y-6 mt-4">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1 bg-saffron-100 text-terracotta-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full font-sans">
              <Sparkles className="h-3.5 w-3.5 text-saffron-500" /> M3 Aroma Quiz
            </span>
            <h1 className="text-3xl font-serif font-bold text-neutral-800">
              Find Your Signature Spice Blend
            </h1>
            <p className="text-xs text-neutral-500 font-sans leading-relaxed">
              Answer 3 simple questions about your culinary inclinations to receive a personalized spice recommendation and a 15% discount.
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-bold text-neutral-400 uppercase font-sans">
              <span>Step {step} of {stepsCount}</span>
              <span>{Math.round(((step - 1) / stepsCount) * 100)}% Complete</span>
            </div>
            <div className="h-1.5 w-full bg-cream-300 rounded-full overflow-hidden">
              <div 
                className="h-full bg-terracotta-500 rounded-full transition-all duration-300"
                style={{ width: `${((step - 1) / stepsCount) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Step Card */}
      {!quizFinished && activeQuestion && (
        <div className="bg-white border border-saffron-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 mt-8 animate-scale-in text-left">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-neutral-800">
            {activeQuestion.question}
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {activeQuestion.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => handleSelectAnswer(activeQuestion.key, opt.label.split(' ')[0])}
                className="w-full flex items-start gap-4 p-4 bg-cream-50 hover:bg-saffron-50/60 border border-saffron-100/50 hover:border-saffron-300 rounded-2xl text-left transition-all duration-200 group cursor-pointer"
              >
                <span className="text-2xl pt-0.5 select-none">{opt.emoji}</span>
                <div className="space-y-0.5 flex-1">
                  <h3 className="font-bold text-sm text-neutral-800 group-hover:text-terracotta-600 transition-colors">
                    {opt.label}
                  </h3>
                  <p className="text-[11px] text-neutral-500 leading-normal font-sans">
                    {opt.desc}
                  </p>
                </div>
                <ChevronRight className="h-4.5 w-4.5 text-neutral-400 self-center group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Results Screen */}
      {quizFinished && matchedProduct && (
        <div className="space-y-8 animate-fade-in mt-4 text-left">
          
          {/* Congrats banner */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-serif font-bold text-emerald-900">Your Taste Profile is Matched!</h2>
              <p className="text-[11px] text-emerald-700 font-sans leading-normal">
                Congratulations! We matched your preferences to a unique heritage spice. Use code <strong className="font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">VEDASPIZE15</strong> at checkout to claim **15% off**.
              </p>
            </div>
          </div>

          {/* Matched product showcase */}
          <div className="bg-white border border-saffron-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row gap-6 items-center">
            
            {/* Image */}
            <div className="w-full md:w-2/5 aspect-video md:aspect-square rounded-2xl overflow-hidden bg-neutral-100 border border-saffron-50">
              <img src={matchedProduct.image} alt={matchedProduct.name} className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4">
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-terracotta-600 uppercase tracking-widest font-sans bg-terracotta-50 px-2.5 py-0.5 rounded-full">
                  Signature Spice Match
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-800 pt-1 leading-none">{matchedProduct.name}</h3>
                <p className="text-[10px] text-neutral-400 font-sans tracking-wide">{matchedProduct.subtitle} • {matchedProduct.origin}</p>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Since you cook as a <strong className="text-neutral-800">{answers.cookingLevel}</strong>, prefer <strong className="text-neutral-800">{answers.heatLevel} heat</strong>, and lean toward <strong className="text-neutral-800">{answers.aromaPref} aromas</strong>, the natural volatile oil profile of {matchedProduct.name} is the perfect companion for your dishes.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onProductClick(matchedProduct.slug)}
                  className="px-5 py-2.5 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
                >
                  View Detailed Profile
                </button>
                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2.5 border border-saffron-200 text-neutral-500 hover:text-terracotta-500 hover:bg-saffron-50/50 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer font-sans"
                >
                  Retake Quiz
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default FlavorQuiz;
