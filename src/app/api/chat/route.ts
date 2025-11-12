import { model } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    if (!message || typeof message !== 'string') {
      return Response.json({ 
        success: false, 
        error: '메시지를 입력해주세요.' 
      }, { status: 400 });
    }
    
    const prompt = `당신은 친절한 AI 어시스턴트입니다. 한국어로 답변해주세요.\n\n사용자: ${message}\n\nAI:`;
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    return Response.json({ 
      success: true, 
      message: text,
      model: 'gemini-2.5-flash',
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    
    return Response.json({ 
      success: false, 
      error: error.message || '알 수 없는 오류가 발생했습니다.' 
    }, { status: 500 });
  }
}
