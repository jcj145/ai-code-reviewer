export async function GET() {
  try {
    // Google Gemini에서 공식적으로 지원하는 모델 목록
    const availableModels = [
      {
        name: 'models/gemini-1.5-flash',
        displayName: 'Gemini 1.5 Flash',
        description: '빠른 응답 속도, 무료 사용 가능',
        recommended: true,
      },
      {
        name: 'models/gemini-1.5-pro',
        displayName: 'Gemini 1.5 Pro',
        description: '고성능 모델, 복잡한 작업에 적합',
        recommended: false,
      },
      {
        name: 'models/gemini-pro',
        displayName: 'Gemini Pro',
        description: '이전 버전 안정 모델',
        recommended: false,
      },
      {
        name: 'models/gemini-pro-vision',
        displayName: 'Gemini Pro Vision',
        description: '이미지 + 텍스트 처리 가능',
        recommended: false,
      },
    ];
    
    return Response.json({ 
      success: true, 
      count: availableModels.length,
      currentModel: 'gemini-2.5-flash',
      models: availableModels,
      note: '현재 프로젝트는 models/gemini-2.5-flash를 사용 중입니다.'
    });
  } catch (error: any) {
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
