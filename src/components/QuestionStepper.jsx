import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const QuestionStepper = ({ currentStep, totalSteps }) => {
  const { theme } = useTheme();
  const [animatedStep, setAnimatedStep] = useState(currentStep);
  const [progress, setProgress] = useState(0);
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  // Calculate responsive sizes based on total steps
  const getMobileSizes = () => {
    if (totalSteps > 10) {
      return {
        circle: 'w-5 h-5',
        text: 'text-[9px]',
        line: 'w-2',
        gap: '2px',
        icon: 'w-2.5 h-2.5'
      };
    } else if (totalSteps > 8) {
      return {
        circle: 'w-6 h-6',
        text: 'text-[10px]',
        line: 'w-3',
        gap: '3px',
        icon: 'w-3 h-3'
      };
    } else {
      return {
        circle: 'w-7 h-7',
        text: 'text-[11px]',
        line: 'w-4',
        gap: '4px',
        icon: 'w-3.5 h-3.5'
      };
    }
  };

  // Animate progress and step changes
  useEffect(() => {
    const targetProgress = (currentStep / totalSteps) * 100;
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const diff = targetProgress - prev;
        if (Math.abs(diff) < 0.5) {
          clearInterval(progressInterval);
          return targetProgress;
        }
        return prev + diff * 0.1; // Smooth easing
      });
    }, 16); // ~60fps

    // Animate step number with delay
    const stepTimeout = setTimeout(() => {
      setAnimatedStep(currentStep);
    }, 150);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [currentStep, totalSteps]);

  return (
    <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-2 sm:px-4">
      {/* Premium Progress Bar with Percentage */}
      <div className="mb-3 sm:mb-4 md:mb-6">
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            <div className="relative">
              <div 
                className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-lg transition-all duration-500"
                style={{
                  textShadow: '0 0 20px rgba(168, 85, 247, 0.5)',
                  minWidth: '45px',
                  textAlign: 'center'
                }}
              >
                {Math.round(progress)}%
              </div>
              <div 
                className="absolute inset-0 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent opacity-0 blur-sm transition-opacity duration-300"
                style={{
                  animation: progress > 0 ? 'pulseGlow 2s ease-in-out infinite' : 'none'
                }}
              >
                {Math.round(progress)}%
              </div>
            </div>
            <div className="text-white/60 text-[10px] sm:text-xs md:text-sm font-medium">
              Complete
            </div>
          </div>
          <div className="text-white/80 text-[10px] sm:text-xs md:text-sm font-semibold drop-shadow-sm">
            Step <span className="text-purple-300 font-black">{animatedStep}</span> / {totalSteps}
          </div>
        </div>
        
        {/* Animated Progress Bar */}
        <div 
          className="relative h-1.5 sm:h-2 md:h-2.5 lg:h-3 rounded-full overflow-hidden backdrop-blur-sm"
          style={{
            background: theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(255, 255, 255, 0.15)',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        >
          {/* Progress Fill with Gradient */}
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 50%, #d946ef 100%)',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.6), 0 0 40px rgba(236, 72, 153, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Shimmer Effect */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                animation: 'shimmer 2s infinite',
                transform: 'translateX(-100%)'
              }}
            />
            {/* Glow Pulse */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
                animation: 'pulseGlow 2s ease-in-out infinite'
              }}
            />
          </div>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="w-full max-w-3xl mx-auto">
        {/* Mobile: Scrollable horizontal stepper */}
        <div className="block md:hidden">
          {(() => {
            const mobileSizes = getMobileSizes();
            return (
              <div className="flex items-center justify-center pb-2 overflow-x-auto scrollbar-hide px-1" style={{ 
                gap: mobileSizes.gap
              }}>
                {steps.map((step, index) => {
                  const isActive = step === currentStep;
                  const isCompleted = step < currentStep;
                  const isUpcoming = step > currentStep;
                  
                  return (
                    <div key={step} className="flex items-center flex-shrink-0">
                      <div className="flex flex-col items-center relative">
                        {/* Step Circle */}
                        <div
                          className={`relative ${mobileSizes.circle} rounded-full flex items-center justify-center font-bold ${mobileSizes.text} transition-all duration-500 flex-shrink-0 ${
                            isCompleted
                              ? 'scale-100'
                              : isActive
                              ? 'scale-105'
                              : 'scale-95'
                          }`}
                      style={{
                        background: isCompleted
                          ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
                          : isActive
                          ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
                          : theme === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(255, 255, 255, 0.15)',
                        color: isCompleted || isActive ? '#ffffff' : theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.6)',
                        boxShadow: isActive
                          ? '0 0 20px rgba(168, 85, 247, 0.6), 0 4px 15px rgba(168, 85, 247, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                          : isCompleted
                          ? '0 4px 15px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                          : '0 2px 8px rgba(0, 0, 0, 0.1)',
                        border: isActive ? '2px solid rgba(255, 255, 255, 0.3)' : '2px solid transparent',
                        animation: isActive ? 'pulseStep 2s ease-in-out infinite' : 'none',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      {/* Pulse Ring for Active Step */}
                      {isActive && (
                        <div
                          className="absolute inset-0 rounded-full border-2 border-purple-400"
                          style={{
                            animation: 'pulseRing 2s ease-in-out infinite',
                            opacity: 0.6
                          }}
                        />
                      )}
                      
                          {isCompleted ? (
                            <svg
                              className={`${mobileSizes.icon} drop-shadow-sm`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              style={{
                                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={totalSteps > 10 ? 2.5 : 3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <span className="drop-shadow-sm">{step}</span>
                          )}
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`h-0.5 ${mobileSizes.line} transition-all duration-500 flex-shrink-0 rounded-full ${
                            isCompleted
                              ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500'
                              : theme === 'dark'
                              ? 'bg-white/10'
                              : 'bg-white/15'
                          }`}
                          style={{
                            boxShadow: isCompleted
                              ? '0 0 10px rgba(168, 85, 247, 0.4)'
                              : 'none',
                            marginLeft: mobileSizes.gap,
                            marginRight: mobileSizes.gap
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>

        {/* Desktop: Full stepper */}
        <div className="hidden md:block">
          <div className="flex items-center">
            {steps.map((step, index) => {
              const isActive = step === currentStep;
              const isCompleted = step < currentStep;
              const isUpcoming = step > currentStep;
              
              return (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    {/* Step Circle */}
                    <div
                      className={`relative w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all duration-500 ${
                        isActive ? 'scale-110' : isCompleted ? 'scale-100' : 'scale-90'
                      }`}
                      style={{
                        background: isCompleted
                          ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
                          : isActive
                          ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
                          : theme === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(255, 255, 255, 0.15)',
                        color: isCompleted || isActive ? '#ffffff' : theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.6)',
                        boxShadow: isActive
                          ? '0 0 25px rgba(168, 85, 247, 0.7), 0 6px 20px rgba(168, 85, 247, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                          : isCompleted
                          ? '0 4px 15px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                          : '0 2px 8px rgba(0, 0, 0, 0.1)',
                        border: isActive ? '2px solid rgba(255, 255, 255, 0.3)' : '2px solid transparent',
                        animation: isActive ? 'pulseStep 2s ease-in-out infinite' : 'none',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      {/* Pulse Ring for Active Step */}
                      {isActive && (
                        <div
                          className="absolute inset-0 rounded-full border-2 border-purple-400"
                          style={{
                            animation: 'pulseRing 2s ease-in-out infinite',
                            opacity: 0.6
                          }}
                        />
                      )}
                      
                      {isCompleted ? (
                        <svg
                          className="w-6 h-6 md:w-7 md:h-7 drop-shadow-sm"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{
                            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <span className="drop-shadow-sm">{step}</span>
                      )}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 transition-all duration-500 rounded-full ${
                        isCompleted
                          ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500'
                          : theme === 'dark'
                          ? 'bg-white/10'
                          : 'bg-white/15'
                      }`}
                      style={{
                        boxShadow: isCompleted
                          ? '0 0 10px rgba(168, 85, 247, 0.4)'
                          : 'none'
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        @keyframes pulseStep {
          0%, 100% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.6), 0 4px 15px rgba(168, 85, 247, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(168, 85, 247, 0.8), 0 6px 20px rgba(168, 85, 247, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }
        }
        
        @keyframes pulseRing {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.2;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default QuestionStepper;
