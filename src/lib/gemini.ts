import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || '';

if (!apiKey) {
  console.warn('GEMINI_API_KEY is not set in .env.local');
}

export const genAI = new GoogleGenerativeAI(apiKey);

// 기본 모델 - 안정적인 구버전 사용
export const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash' // 가장 안정적인 모델
});
