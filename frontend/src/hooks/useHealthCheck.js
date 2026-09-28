import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';

export function useHealthCheck() {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [statusMessage, setStatusMessage] = useState('Checking connection...');
  const [error, setError] = useState(null);

  const checkHealth = useCallback(async () => {
    setIsChecking(true);
    try {
      const response = await axiosInstance.get('/api/health');
      if (response.data && response.data.status === 'UP') {
        setIsConnected(true);
        setStatusMessage(response.data.message || 'FitForge backend is healthy');
        setError(null);
      } else {
        setIsConnected(false);
        setStatusMessage('Backend returned non-UP status');
      }
    } catch (err) {
      setIsConnected(false);
      setStatusMessage('Backend Offline');
      setError(err.message || 'Unable to reach backend server');
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
    const timer = setInterval(checkHealth, 30000);
    return () => clearInterval(timer);
  }, [checkHealth]);

  return { isConnected, isChecking, statusMessage, error, checkHealth };
}
