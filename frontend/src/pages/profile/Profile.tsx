import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { typingAPI, type TypingStats } from '../../services/api';
import Header from '../../components/Header';

export default function Profile() {
  const { user, isAuthenticated } = useAuthStore();
  const [stats, setStats] = useState<TypingStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const userStats = await typingAPI.getStats();
        setStats(userStats);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-gray-400">Your typing performance and statistics</p>
        </div>

        {/* User Info */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-gray-400">Username:</span>
              <span className="text-white ml-2 font-medium">{user?.username}</span>
            </div>
            <div>
              <span className="text-gray-400">Email:</span>
              <span className="text-white ml-2 font-medium">{user?.email}</span>
            </div>
          </div>
        </div>

        {/* Typing Statistics */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Typing Statistics</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="text-gray-400">Loading statistics...</div>
            </div>
          ) : stats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">
                  {stats.averageWpm}
                </div>
                <div className="text-gray-400 text-sm">Average WPM</div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {stats.averageAccuracy}%
                </div>
                <div className="text-gray-400 text-sm">Average Accuracy</div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {stats.totalSessionsCompleted}
                </div>
                <div className="text-gray-400 text-sm">Sessions Completed</div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {stats.totalWordsTyped}
                </div>
                <div className="text-gray-400 text-sm">Total Words Typed</div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-400 mb-1">
                  {stats.bestWpm}
                </div>
                <div className="text-gray-400 text-sm">Best WPM</div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-1">
                  {stats.bestAccuracy}%
                </div>
                <div className="text-gray-400 text-sm">Best Accuracy</div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-pink-400 mb-1">
                  {Math.round(stats.totalTimeSpent / 60000)}
                </div>
                <div className="text-gray-400 text-sm">Minutes Practiced</div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-emerald-400 mb-1">
                  {stats.totalSessionsCompleted > 0 ? 
                    Math.round(stats.totalWordsTyped / stats.totalSessionsCompleted) : 0}
                </div>
                <div className="text-gray-400 text-sm">Words per Session</div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              <p>No typing statistics available yet.</p>
              <p className="mt-2">Start typing to see your progress!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
