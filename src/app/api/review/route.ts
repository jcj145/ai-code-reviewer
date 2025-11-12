import { model } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { code, language } = await request.json();
    
    if (!code || typeof code !== 'string') {
      return Response.json({ 
        success: false, 
        error: '코드를 입력해주세요.' 
      }, { status: 400 });
    }

    const prompt = `당신은 전문 코드 리뷰어입니다. 아래 ${language || '코드'}를 분석하고 다음 항목에 대해 리뷰해주세요:

1. 🐛 버그/오류: 잠재적인 버그나 런타임 오류
2. 🎯 성능: 성능 개선 가능한 부분
3. 🔒 보안: 보안 취약점
4. 📝 코드 품질: 가독성, 유지보수성
5. 💡 개선 제안: 구체적인 코드 예시와 함께

코드:
\`\`\`${language || 'code'}
${code}
\`\`\`

한국어로 상세하고 친절하게 답변해주세요.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    return Response.json({ 
      success: true, 
      review: text,
      model: 'gemini-pro',
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    
    return Response.json({ 
      success: false, 
      error: error.message || '알 수 없는 오류가 발생했습니다.' 
    }, { status: 500 });
  }
}
