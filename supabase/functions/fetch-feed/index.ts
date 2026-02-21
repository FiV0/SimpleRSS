import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { feed_id } = await req.json()

    if (!feed_id) {
      return new Response(
        JSON.stringify({ error: 'feed_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get feed URL from database
    const { data: feed, error: feedError } = await supabase
      .from('feeds')
      .select('id, url')
      .eq('id', feed_id)
      .single()

    if (feedError || !feed) {
      return new Response(
        JSON.stringify({ error: 'Feed not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch the RSS feed
    const feedResponse = await fetch(feed.url)
    const feedXml = await feedResponse.text()

    // TODO: Parse RSS/Atom XML and insert articles
    // For now, just update last_fetched_at
    await supabase
      .from('feeds')
      .update({ last_fetched_at: new Date().toISOString() })
      .eq('id', feed.id)

    return new Response(
      JSON.stringify({ success: true, feed_id: feed.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Feed fetch failed:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch feed',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
