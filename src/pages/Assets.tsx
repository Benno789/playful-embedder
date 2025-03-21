import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stock, NetWorthDataPoint } from '@/types';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NetWorthChart from '@/components/NetWorthChart';
import StockPortfolio from '@/components/StockPortfolio';
import { ArrowUpRight, ArrowDownRight, Dumbbell, LampDesk, BarChart } from 'lucide-react';
import ProfileSettings from '@/components/ProfileSettings';
import { Menu, User } from 'lucide-react';

const Assets: React.FC = () => {
  const [forecastMode, setForecastMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [bankBalance, setBankBalance] = useState(14500);
  const [investments, setInvestments] = useState(7000);
  const navigate = useNavigate();
  
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  
  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      if (profile.monthlyIncome) {
        setMonthlyIncome(profile.monthlyIncome);
        setBankBalance(profile.monthlyIncome * 5);
        setInvestments(profile.monthlyIncome * 3);
      }
    }
    
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const totalAssets = bankBalance + investments;
  
  const netWorthData: NetWorthDataPoint[] = [
    { month: 'Jan', value: totalAssets * 0.75, percentChange: 0 },
    { month: 'Feb', value: totalAssets * 0.79, percentChange: 5 },
    { month: 'Mar', value: totalAssets * 0.81, percentChange: 2.8 },
    { month: 'Apr', value: totalAssets * 0.82, percentChange: 1.8 },
    { month: 'May', value: totalAssets * 0.86, percentChange: 4.2 },
    { month: 'Jun', value: totalAssets * 0.92, percentChange: 7.5 },
    { month: 'Jul', value: totalAssets * 0.99, percentChange: 8.1 },
    { month: 'Aug', value: totalAssets, percentChange: 7.5 },
  ];

  const isLoggedIn = localStorage.getItem('onboardingCompleted') === 'true';
  
  if (!isLoggedIn) {
    React.useEffect(() => {
      navigate('/signin');
    }, [navigate]);
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <header className="bg-[#ccff75] dark:bg-primary p-4 flex items-center justify-between">
        <button className="text-black dark:text-white">
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center">
          <h1 className="font-bold text-xl mr-2 dark:text-white">payflow</h1>
          <img src="/lovable-uploads/5ab181e4-bee0-4a30-84c2-50d15ef08b4b.png" alt="PayFlow Logo" className="w-6 h-6 dark:invert" />
        </div>
        <button className="text-black dark:text-white" onClick={() => setProfileOpen(true)}>
          <User className="h-6 w-6" />
        </button>
      </header>

      <main className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Assets Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="dark:bg-gray-800 dark:text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Total Assets</CardTitle>
              <CardDescription className="dark:text-gray-400">Current Value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className="text-3xl font-bold">{totalAssets.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-[#ccff75]/10 text-[#ccff75] dark:bg-purple-900 dark:text-purple-200 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +12.4%
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-gray-800 dark:text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Monthly Savings</CardTitle>
              <CardDescription className="dark:text-gray-400">Based on your income</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className="text-3xl font-bold">{(monthlyIncome * 0.2).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 flex items-center">
                  20% of income
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold dark:text-white">Asset Trend</h3>
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <button 
                onClick={() => setForecastMode(false)} 
                className={`px-3 py-1.5 text-xs ${!forecastMode ? 'bg-black text-white dark:bg-primary' : 'dark:text-white'}`}
              >
                Current
              </button>
              <button 
                onClick={() => setForecastMode(true)} 
                className={`px-3 py-1.5 text-xs ${forecastMode ? 'bg-black text-white dark:bg-primary' : 'dark:text-white'}`}
              >
                Forecast
              </button>
            </div>
          </div>
          
          <style>
            {`
              :root {
                --chart-gradient-start: #ccff75;
                --chart-gradient-end: #ccff75;
                --chart-line: #ccff75;
              }
              
              .dark {
                --chart-gradient-start: #9b87f5;
                --chart-gradient-end: #9b87f5;
                --chart-line: #9b87f5;
              }
            `}
          </style>
          
          <NetWorthChart data={netWorthData} forecast={forecastMode} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          <div className="md:col-span-8">
            <Card className="dark:bg-gray-800 dark:text-white h-full">
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription className="dark:text-gray-400">Distribution of your assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 text-blue-600 dark:text-blue-300">
                        <LampDesk size={18} />
                      </div>
                      <span className="font-medium">Bank Balance</span>
                    </div>
                    <p className="text-xl font-semibold">{bankBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{Math.round(bankBalance/totalAssets*100)}% of your assets</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3 text-green-600 dark:text-green-300">
                        <BarChart size={18} />
                      </div>
                      <span className="font-medium">Investments</span>
                    </div>
                    <p className="text-xl font-semibold">{investments.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{Math.round(investments/totalAssets*100)}% of your assets</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-4">
            <Card className="h-full dark:bg-gray-800 dark:text-white">
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mr-2 text-amber-600 dark:text-amber-300">
                    <Dumbbell size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Diversify your portfolio</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">More stocks could increase your growth</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2 text-green-600 dark:text-green-300">
                    <ArrowUpRight size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Increase your savings rate</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">You could save more than 20%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <StockPortfolio />
      </main>

      <ProfileSettings open={profileOpen} onOpenChange={setProfileOpen} />
      <Navigation active="assets" />
    </div>
  );
};

export default Assets;
