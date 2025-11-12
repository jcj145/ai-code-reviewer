export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  return Response.json({
    hasApiKey: !!apiKey,
    keyLength: apiKey?.length || 0,
    keyPrefix: apiKey?.substring(0, 10) + '...',
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('GEMINI'))
  });
}
