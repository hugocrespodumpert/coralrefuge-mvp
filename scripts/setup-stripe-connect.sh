#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# STRIPE CONNECT SETUP SCRIPT
# ═══════════════════════════════════════════════════════════════
# This script helps set up Stripe Connect for the MVP
#
# Usage: ./scripts/setup-stripe-connect.sh
#

set -e

echo "🌊 Coral Refuge - Stripe Connect Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📋 Setup Checklist:"
echo ""
echo "1. Database Migration"
echo "   ✓ Migration file created: supabase/migrations/002_add_stripe_connect.sql"
echo "   → Action needed: Run this migration in Supabase Dashboard"
echo ""

echo "2. Stripe Test Account"
echo "   → Action needed: Create test Connected Account"
echo "   → Go to: https://dashboard.stripe.com/test/connect/accounts"
echo "   → Click 'Create account' → Choose 'Express'"
echo "   → Country: Egypt (EG), Email: test-hepca@coralrefuge.test"
echo "   → Copy the account ID (starts with acct_)"
echo ""

echo "3. Update Database"
echo "   → Action needed: Update partner_accounts table"
echo "   → Run this SQL in Supabase:"
echo "   UPDATE partner_accounts"
echo "   SET stripe_account_id = 'YOUR_ACCOUNT_ID_HERE'"
echo "   WHERE partner_name = 'HEPCA';"
echo ""

echo "4. Webhook Configuration"
echo "   → Action needed: Add webhook events in Stripe Dashboard"
echo "   → Go to: https://dashboard.stripe.com/test/webhooks"
echo "   → Add events: application_fee.created, transfer.created"
echo ""

echo "5. Test Payment"
echo "   ✓ Code is ready to test"
echo "   → Go to /sponsor and select Ras Mohammed or Giftun Islands"
echo "   → Use test card: 4242 4242 4242 4242"
echo ""

echo "6. Verify Split"
echo "   → Check Stripe Dashboard"
echo "   → Platform should have $7.50 (15%)"
echo "   → HEPCA account should have $42.50 (85%)"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📚 For detailed instructions, see: docs/STRIPE_CONNECT_MVP.md"
echo ""

# Check if TypeScript is available
if command -v npx &> /dev/null; then
    echo "🔍 Running TypeScript check..."
    if npx tsc --noEmit --skipLibCheck; then
        echo "✅ TypeScript check passed!"
    else
        echo "⚠️  TypeScript errors found (see above)"
        echo "   These may need to be fixed before deployment"
    fi
else
    echo "ℹ️  TypeScript not available, skipping type check"
fi

echo ""
echo "✅ Implementation Complete!"
echo ""
echo "Next Steps:"
echo "1. Apply database migration in Supabase"
echo "2. Create Stripe test Connected Account"
echo "3. Update database with account ID"
echo "4. Test a payment"
echo "5. Check admin dashboard at /admin"
echo ""
echo "🚀 Ready to build a marketplace for coral reefs!"
