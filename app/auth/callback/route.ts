import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  console.log('🔐 Auth callback triggered');

  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const error_description = requestUrl.searchParams.get('error_description');

  // Handle OAuth errors
  if (error) {
    console.error('❌ Auth callback error:', error, error_description);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${request.headers.get('host')}`;
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error_description || 'Authentication failed')}`, baseUrl)
    );
  }

  // Validate code exists
  if (!code) {
    console.error('❌ No authorization code provided');
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${request.headers.get('host')}`;
    return NextResponse.redirect(
      new URL('/login?error=No authorization code provided', baseUrl)
    );
  }

  try {
    console.log('🔄 Exchanging code for session...');

    // Exchange the code for a session
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error('❌ Failed to exchange code for session:', exchangeError);
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${request.headers.get('host')}`;
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(exchangeError.message)}`, baseUrl)
      );
    }

    if (data?.session) {
      console.log('✅ Session created successfully for user:', data.user?.email);
    }

    // Redirect to dashboard after successful login
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${request.headers.get('host')}`;
    console.log('✅ Redirecting to dashboard:', `${baseUrl}/dashboard`);
    return NextResponse.redirect(new URL('/dashboard', baseUrl));

  } catch (error) {
    console.error('❌ Unexpected error during auth callback:', error);
    const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${request.headers.get('host')}`;
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(errorMessage)}`, baseUrl)
    );
  }
}
