import { supabase } from './supabase';

/**
 * Send magic link to user's email
 */
export async function sendMagicLink(email: string, redirectTo?: string) {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo || `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send magic link',
    };
  }
}

/**
 * Sign out current user
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to sign out',
    };
  }
}

/**
 * Get current user session
 */
export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      return {
        success: false,
        error: error.message,
        session: null,
      };
    }

    return {
      success: true,
      session,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get session',
      session: null,
    };
  }
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      return {
        success: false,
        error: error.message,
        user: null,
      };
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get user',
      user: null,
    };
  }
}

/**
 * Create or update user profile
 */
export async function upsertUserProfile(userId: string, profile: {
  name?: string;
  email?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        ...profile,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update profile',
    };
  }
}

/**
 * Get user profile
 */
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // Ignore "not found" error
      return {
        success: false,
        error: error.message,
        profile: null,
      };
    }

    return {
      success: true,
      profile: data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get profile',
      profile: null,
    };
  }
}

/**
 * Get user's sponsorships
 */
export async function getUserSponsorships(userId: string) {
  try {
    const { data, error } = await supabase
      .from('sponsorships')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return {
        success: false,
        error: error.message,
        sponsorships: [],
      };
    }

    return {
      success: true,
      sponsorships: data || [],
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get sponsorships',
      sponsorships: [],
    };
  }
}
