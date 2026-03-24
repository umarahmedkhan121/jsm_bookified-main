// Define exactly what each tier gets
export const PLAN_LIMITS = {
  free: { 
    maxBooks: 1, 
    maxSessionsPerMonth: 5, 
    maxSessionMinutes: 5 
  },
  standard: { 
    maxBooks: 10, 
    maxSessionsPerMonth: 100, 
    maxSessionMinutes: 15 
  },
  pro: { 
    maxBooks: 100, 
    maxSessionsPerMonth: Infinity, 
    maxSessionMinutes: 60 
  },
};

// Helper to track when their monthly limit resets
export const getCurrentBillingPeriodStart = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1);
};