import { model } from '@/lib/gemini';

export async function GET() {
  try {
    const result = await model.generateContent(
      'Hello! Please respond with a simple greeting.'
    );
    
    const response = result.response;
    const text = response.text();
    
    return Response.json({ 
      success: true, 
      message: text,
      model: 'gemini-pro',
    });
  } catch (error: any) {
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
