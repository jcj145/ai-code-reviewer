'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdSense from '@/components/AdSense';

export default function Home() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    if (!code.trim()) {
      alert('코드를 입력해주세요!');
      return;
    }

    setLoading(true);
    setReview(null);

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const data = await response.json();
      setReview(data);
    } catch (error: any) {
      setReview({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const exampleCode = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}`;

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '48px', 
            margin: '0 0 10px 0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            🤖 AI Code Reviewer
          </h1>
          <p style={{ color: '#666', fontSize: '18px', margin: 0 }}>
            Google Gemini로 구동되는 지능형 코드 리뷰 시스템
          </p>
          <div style={{ marginTop: '20px' }}>
            <Link href="/test" style={{ 
              color: '#667eea', 
              textDecoration: 'none',
              fontSize: '14px',
              padding: '8px 16px',
              border: '1px solid #667eea',
              borderRadius: '4px',
              display: 'inline-block',
            }}>
              🧪 API 테스트 페이지
            </Link>
          </div>
        </div>

        {/* 상단 광고 */}
        <AdSense adSlot="pub-2560477584416882" />

        {/* 입력 영역 */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ marginBottom: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label style={{ fontWeight: 'bold', color: '#333' }}>언어:</label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '14px',
              }}
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="react">React</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
            </select>
            <button
              onClick={() => setCode(exampleCode)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f0f0f0',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              📋 예제 코드 불러오기
            </button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="여기에 코드를 붙여넣으세요..."
            style={{
              width: '100%',
              height: '300px',
              padding: '15px',
              fontSize: '14px',
              fontFamily: 'Consolas, Monaco, monospace',
              borderRadius: '8px',
              border: '2px solid #e0e0e0',
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* 리뷰 버튼 */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <button
            onClick={handleReview}
            disabled={loading || !code.trim()}
            style={{
              padding: '15px 40px',
              fontSize: '18px',
              fontWeight: 'bold',
              background: loading || !code.trim() ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading || !code.trim() ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!loading && code.trim()) {
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {loading ? '🔍 분석 중...' : '✨ 코드 리뷰 시작'}
          </button>
        </div>

        {/* 결과 영역 */}
        {review && (
          <div style={{
            marginTop: '30px',
            padding: '30px',
            backgroundColor: review.success ? '#f0f9ff' : '#fff0f0',
            borderRadius: '12px',
            border: `2px solid ${review.success ? '#667eea' : '#ff4444'}`,
          }}>
            {review.success ? (
              <>
                <h2 style={{ 
                  color: '#667eea', 
                  marginTop: 0,
                  fontSize: '24px',
                  borderBottom: '2px solid #667eea',
                  paddingBottom: '10px',
                }}>
                  📊 코드 리뷰 결과
                </h2>
                <div style={{
                  marginTop: '20px',
                  lineHeight: '1.8',
                  whiteSpace: 'pre-wrap',
                  fontSize: '15px',
                  color: '#333',
                }}>
                  {review.review}
                </div>
                <div style={{ 
                  marginTop: '20px', 
                  paddingTop: '20px',
                  borderTop: '1px solid #ddd',
                  fontSize: '13px', 
                  color: '#888',
                  textAlign: 'right',
                }}>
                  🤖 Model: {review.model}
                </div>
              </>
            ) : (
              <>
                <h3 style={{ color: '#ff4444', marginTop: 0 }}>❌ 오류 발생</h3>
                <p style={{ color: '#666' }}>{review.error}</p>
              </>
            )}
          </div>
        )}

        {/* 기능 안내 */}
        <div style={{ 
          marginTop: '50px', 
          padding: '25px',
          backgroundColor: '#f9f9f9',
          borderRadius: '12px',
        }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>💡 기능 소개</h3>
          <ul style={{ lineHeight: '2', color: '#666' }}>
            <li>🐛 <strong>버그 감지:</strong> 잠재적인 오류와 버그를 찾아냅니다</li>
            <li>🎯 <strong>성능 최적화:</strong> 더 효율적인 코드 작성 방법을 제안합니다</li>
            <li>🔒 <strong>보안 검토:</strong> 보안 취약점을 분석합니다</li>
            <li>📝 <strong>코드 품질:</strong> 가독성과 유지보수성을 평가합니다</li>
            <li>💡 <strong>개선 제안:</strong> 구체적인 코드 예시를 제공합니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
