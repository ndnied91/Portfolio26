import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);

  if (searchParams.get('preview') === 'true') {
    const { data } = await supabase
      .from('visitors')
      .select('count')
      .eq('id', 1)
      .single();
    if (!data) return NextResponse.json({ count: 0 });
    return NextResponse.json({ count: data.count });
  }

  const { data, error } = await supabase.rpc('increment_visitors');
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ count: data });
}

export async function GET() {
  const { data, error } = await supabase
    .from('visitors')
    .select('count')
    .eq('id', 1)
    .single();
  if (error) return NextResponse.json({ error }, { status: 500 });
  if (!data) return NextResponse.json({ count: 0 });
  return NextResponse.json({ count: data.count });
}