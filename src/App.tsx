import { useState } from "react";
import { QUESTIONS } from "./data";
import type { Question } from "./type";

function ProgressBar({ currentIndex, total }: { currentIndex: number; total: number }) {
  const percent = ((currentIndex + 1) / total) * 100;
  return (
    <div className="w-full mt-6 mb-6">
      <div className="h-1.5 w-full bg-slate-200/80 rounded-full overflow-hidden">
        <div
          className="h-1.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-2 text-[11px] text-slate-400 text-right tracking-wide uppercase">
        Question {currentIndex + 1} of {total}
      </div>
    </div>
  );
}

function AIBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/90 px-3 py-1 text-[11px] text-slate-100 shadow-lg shadow-sky-500/30 border border-sky-500/40">
      <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      <span className="font-semibold tracking-wide">AI Quiz Engine</span>
    </div>
  );
}

function QuizCard({
  question,
  currentIndex,
  total,
  selectedId,
  onSelect,
  onPrev,
  onNext,
  isLast,
}: {
  question: Question;
  currentIndex: number;
  total: number;
  selectedId: number | null;
  onSelect: (id: number) => void;
  onPrev: () => void;
  onNext: () => void;
  isLast: boolean;
}) {
  return (
    <div className="relative">
      {/* soft glow behind card */}
      <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-sky-300/40 via-purple-300/30 to-blue-400/40 -z-10" />
      <div className="w-[1000px] h-[600px] bg-white/95 backdrop-blur rounded-[40px] shadow-2xl shadow-sky-500/20 border border-sky-100 flex items-center justify-center">
        <div className="w-[780px]">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-serif text-sky-950 tracking-tight">
                Test Your Knowledge
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Answer all questions and let the AI evaluate your score.
              </p>
            </div>
            <AIBadge />
          </div>

          <ProgressBar currentIndex={currentIndex} total={total} />

          <div className="space-y-3 mt-4">
            <div className="rounded-2xl bg-gradient-to-r from-sky-100 via-blue-50 to-indigo-100 px-6 py-4 text-slate-800 text-sm font-semibold shadow-inner border border-sky-100">
              <span className="mr-2 text-sky-600 text-xs font-bold tracking-wide uppercase">
                Question {currentIndex + 1}
              </span>
              {question.text}
            </div>

            {question.options.map((opt) => {
              const isSelected = selectedId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelect(opt.id)}
                  className={`w-full text-left px-6 py-3.5 rounded-2xl border text-sm transition
                  flex items-center justify-between
                  ${
                    isSelected
                      ? "bg-gradient-to-r from-sky-500 to-indigo-500 border-transparent text-white shadow-md shadow-sky-400/60 scale-[1.01]"
                      : "bg-white border-slate-200/80 text-slate-700 hover:bg-sky-50/70 hover:border-sky-300"
                  }`}
                >
                  <span>{opt.text}</span>
                  <span
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-semibold
                    ${
                      isSelected
                        ? "bg-white/90 text-sky-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {String.fromCharCode(64 + opt.id)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-between">
            {currentIndex === 0 ? (
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/90 shadow px-4 py-2 text-xs text-slate-600 border border-slate-100">
                  Best of luck! The AI is cheering for you.
                </div>
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-pink-200 border-4 border-pink-300 flex items-center justify-center shadow">
                    <div className="w-7 h-7 rounded-full bg-pink-300" />
                  </div>
                  <div className="absolute -top-1 -right-1 flex gap-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-200 border border-pink-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-200 border border-pink-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-200 border border-pink-300" />
                  </div>
                </div>
              </div>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onPrev}
                disabled={currentIndex === 0}
                className="w-9 h-9 rounded-full border border-slate-300/80 flex items-center justify-center text-slate-500 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={onNext}
                className="px-5 h-9 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-medium flex items-center gap-1.5 shadow-md hover:shadow-lg hover:brightness-110 transition"
              >
                {isLast ? "Finish" : "Next"}
                <span className="text-xs">{isLast ? "✓" : "›"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultCard({
  score,
  total,
  onRestart,
}: {
  score: number;
  total: number;
  onRestart: () => void;
}) {
  const percentage = Math.round((score / total) * 100);
  const good = percentage >= 70;

  return (
    <div className="relative">
      <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-emerald-300/40 via-sky-300/30 to-indigo-400/40 -z-10" />
      <div className="w-[1000px] h-[600px] bg-white/95 backdrop-blur rounded-[40px] shadow-2xl shadow-emerald-400/30 border border-emerald-100 flex items-center justify-center">
        <div className="w-[720px] text-center">
          <AIBadge />
          <h1 className="mt-4 text-4xl font-serif text-sky-950 mb-2">
            Your AI Quiz Result
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            The AI has analysed your answers and generated this score.
          </p>

          <div className="mx-auto mb-8 inline-flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-500 p-[3px] shadow-lg shadow-sky-500/40">
            <div className="h-40 w-40 rounded-full bg-slate-950 flex flex-col items-center justify-center text-white">
              <span className="text-xs uppercase tracking-[0.2em] text-sky-200">
                Score
              </span>
              <span className="mt-2 text-5xl font-bold">{percentage}%</span>
              <span className="mt-1 text-xs text-slate-300">
                {score} / {total} correct
              </span>
            </div>
          </div>

          <p
            className={`mb-6 text-sm ${
              good ? "text-emerald-600" : "text-amber-600"
            }`}
          >
            {good
              ? "Great job! You have strong general knowledge."
              : "Nice attempt! Review the questions and try again to improve your score."}
          </p>

          <button
            onClick={onRestart}
            className="px-7 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 shadow-md shadow-slate-500/40"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const total = QUESTIONS.length;
  const currentQuestion = QUESTIONS[index];

  const handleSelect = (optionId: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handlePrev = () => {
    setIndex((i) => (i > 0 ? i - 1 : i));
  };

  const handleNext = () => {
    if (index === total - 1) {
      if (Object.keys(answers).length < total) {
        alert("Please answer all questions before finishing.");
        return;
      }
      setShowResult(true);
      return;
    }
    setIndex((i) => (i < total - 1 ? i + 1 : i));
  };

  const handleRestart = () => {
    setAnswers({});
    setIndex(0);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-indigo-100">
      {showResult ? (
        <ResultCard
          score={QUESTIONS.filter((q) => answers[q.id] === q.correctId).length}
          total={total}
          onRestart={handleRestart}
        />
      ) : (
        <QuizCard
          question={currentQuestion}
          currentIndex={index}
          total={total}
          selectedId={answers[currentQuestion.id] ?? null}
          onSelect={handleSelect}
          onPrev={handlePrev}
          onNext={handleNext}
          isLast={index === total - 1}
        />
      )}
    </div>
  );
}
