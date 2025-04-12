
import { useState, useEffect } from 'react';

// Mock API response types
type ApiResponseStatus = 'idle' | 'loading' | 'success' | 'error';

export interface GoalProgressData {
  goalType: string;
  targetDate: string;
  progress: number;
  weeklyTarget: number;
  currentValue: number;
  lastUpdated: string;
}

export interface HealthTip {
  tip: string;
  category: string;
}

const useMockApi = <T>(
  mockData: T, 
  delay: number = 800
): { 
  data: T | null; 
  status: ApiResponseStatus; 
  error: string | null;
  refetch: () => void;
} => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<ApiResponseStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = () => {
    setStatus('loading');
    setError(null);
    
    // Simulate API call with timeout
    const timeout = setTimeout(() => {
      // Randomly succeed or fail (90% success rate)
      const shouldSucceed = Math.random() > 0.1;
      
      if (shouldSucceed) {
        setData(mockData);
        setStatus('success');
      } else {
        setError('An error occurred while fetching data. Please try again.');
        setStatus('error');
      }
    }, delay);
    
    return () => clearTimeout(timeout);
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const refetch = () => {
    fetchData();
  };
  
  return { data, status, error, refetch };
};

// Mock data for goals
const mockGoalData: GoalProgressData[] = [
  {
    goalType: 'Weight Loss',
    targetDate: '2025-06-15',
    progress: 35,
    weeklyTarget: 0.5,
    currentValue: 68.5,
    lastUpdated: '2025-04-10'
  },
  {
    goalType: 'Protein Intake',
    targetDate: '2025-05-01',
    progress: 72,
    weeklyTarget: 75,
    currentValue: 54,
    lastUpdated: '2025-04-11'
  },
  {
    goalType: 'Water Intake',
    targetDate: 'ongoing',
    progress: 45,
    weeklyTarget: 2.5,
    currentValue: 1.1,
    lastUpdated: '2025-04-11'
  }
];

// Health tips
const mockHealthTips: HealthTip[] = [
  {
    tip: "Start your day with a glass of warm water with lemon to boost digestion and metabolism.",
    category: "Morning Routine"
  },
  {
    tip: "Include a source of protein with every meal to help control hunger and stabilize blood sugar.",
    category: "Nutrition"
  },
  {
    tip: "Take a 5-minute stretching break for every hour of sitting to improve circulation and reduce stiffness.",
    category: "Physical Activity"
  },
  {
    tip: "Incorporate fermented foods like yogurt, idli or dosa into your diet for better gut health.",
    category: "Gut Health"
  },
  {
    tip: "Try replacing white rice with millets like ragi or jowar occasionally for more fiber and nutrients.",
    category: "Nutrition"
  },
  {
    tip: "Practice mindful eating by avoiding screens during meals and chewing food thoroughly.",
    category: "Mindfulness"
  },
  {
    tip: "Herbal teas like tulsi, ginger or cinnamon can help boost immunity and improve digestion.",
    category: "Immunity"
  }
];

// Hook exports
export const useGoalProgress = () => useMockApi<GoalProgressData[]>(mockGoalData);
export const useHealthTips = () => {
  const { data, status, error, refetch } = useMockApi<HealthTip[]>(mockHealthTips, 500);
  
  const getRandomTip = (): HealthTip | null => {
    if (!data || data.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  };
  
  return { tips: data, randomTip: getRandomTip(), status, error, refetch };
};

export default useMockApi;
