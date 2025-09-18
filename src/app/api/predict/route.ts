import { NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { predictFailure } from '@/ai/flows/predict-failure';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await predictFailure({
      temperature: Number(body?.temperature),
      load: Number(body?.load),
      speed: Number(body?.speed),
      timestamp: String(body?.timestamp ?? new Date().toISOString()),
    });
    return Response.json(result);
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: 'Prediction failed', error: String(error?.message ?? error) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}


