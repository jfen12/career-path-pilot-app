-- Add Stripe-related columns to profiles table
ALTER TABLE profiles
ADD COLUMN stripe_customer_id TEXT,
ADD COLUMN subscription_id TEXT,
ADD COLUMN subscription_status TEXT,
ADD COLUMN current_period_end TIMESTAMP WITH TIME ZONE;

-- Create index for faster lookups
CREATE INDEX idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);
CREATE INDEX idx_profiles_subscription_id ON profiles(subscription_id); 