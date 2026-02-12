import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FeedbackSection() {
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);

  return (
    <div className="bg-sidebar border-t border-sidebar-border py-4 px-6">
      <div className="flex items-center justify-between">
        {/* Question and Buttons */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-text-primary font-medium">
            ¿Te ha resultado útil esta página?
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFeedback(feedback === 'like' ? null : 'like')}
              className={cn(
                "w-9 h-9 rounded border flex items-center justify-center transition-all duration-100",
                feedback === 'like'
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-gray-300 text-text-secondary hover:bg-white/50"
              )}
            >
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFeedback(feedback === 'dislike' ? null : 'dislike')}
              className={cn(
                "w-9 h-9 rounded border flex items-center justify-center transition-all duration-100",
                feedback === 'dislike'
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-gray-300 text-text-secondary hover:bg-white/50"
              )}
            >
              <ThumbsDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Report Button */}
        <button className="px-4 py-2 border border-gray-300 text-text-secondary text-sm rounded hover:bg-white/50 hover:text-text-primary transition-colors">
          Reportar un problema
        </button>
      </div>
    </div>
  );
}
