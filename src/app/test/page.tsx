'use client';

import { useState } from 'react';

export default function TestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('안녕하세요! 자기소개를 해주세요.');

  const testAPI = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/test');
      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const chatWithAI = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🧪 Google Gemini API 테스트</h1>
      
      {/* 간단한 테스트 */}
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h2>1. 간단한 연결 테스트</h2>
        <p>Google Gemini API 키가 제대로 작동하는지 확인합니다.</p>
        <button 
          onClick={testAPI}
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: loading ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '테스트 중...' : 'API 테스트 실행'}
        </button>
      </div>

      {/* 대화형 테스트 */}
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h2>2. 대화형 테스트</h2>
        <p>AI와 직접 대화해보세요.</p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
          style={{
            width: '100%',
            height: '100px',
            padding: '10px',
            fontSize: '14px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            fontFamily: 'Arial, sans-serif',
          }}
        />
        <button 
          onClick={chatWithAI}
          disabled={loading || !input.trim()}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: loading || !input.trim() ? '#ccc' : '#10a37f',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '응답 기다리는 중...' : 'AI에게 질문하기'}
        </button>
      </div>

      {/* 결과 표시 */}
      {result && (
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          backgroundColor: result.success ? '#e6ffe6' : '#ffe6e6',
          borderRadius: '8px',
          border: `2px solid ${result.success ? '#00cc00' : '#cc0000'}`,
        }}>
          <h3>{result.success ? '✅ 성공!' : '❌ 오류 발생'}</h3>
          
          {result.success ? (
            <>
              <div style={{ marginTop: '15px' }}>
                <strong>AI 응답:</strong>
                <p style={{ 
                  marginTop: '10px', 
                  padding: '15px', 
                  backgroundColor: 'white', 
                  borderRadius: '5px',
                  whiteSpace: 'pre-wrap',
                }}>
                  {result.message}
                </p>
              </div>
              
              {result.usage && (
                <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
                  <strong>사용량:</strong>
                  <ul style={{ marginTop: '5px' }}>
                    <li>입력 토큰: {result.usage.prompt_tokens}</li>
                    <li>출력 토큰: {result.usage.completion_tokens}</li>
                    <li>총 토큰: {result.usage.total_tokens}</li>
                    <li>모델: {result.model}</li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div style={{ marginTop: '15px' }}>
              <strong>에러 메시지:</strong>
              <p style={{ 
                marginTop: '10px', 
                padding: '15px', 
                backgroundColor: 'white', 
                borderRadius: '5px',
                color: '#cc0000',
                fontFamily: 'monospace',
              }}>
                {result.error}
              </p>
              
              <div style={{ marginTop: '15px', fontSize: '14px' }}>
                <strong>해결 방법:</strong>
                <ul style={{ marginTop: '5px' }}>
                  <li>`.env.local` 파일에 올바른 API 키가 있는지 확인</li>
                  <li>API 키가 `GEMINI_API_KEY=AIza...` 형식인지 확인</li>
                  <li>서버를 재시작 (Ctrl+C 후 `npm run dev`)</li>
                  <li>Google AI Studio에서 키가 활성화되었는지 확인</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 안내 사항 */}
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#fff9e6', borderRadius: '8px' }}>
        <h3>💡 사용 방법</h3>
        <ol style={{ marginTop: '10px', lineHeight: '1.8' }}>
          <li>`.env.local` 파일에 Google Gemini API 키를 설정하세요</li>
          <li>서버를 재시작하세요 (Ctrl+C 후 `npm run dev`)</li>
          <li>위의 "API 테스트 실행" 버튼을 클릭하세요</li>
          <li>성공하면 AI 응답이 표시됩니다!</li>
        </ol>
      </div>
    </div>
  );
}
