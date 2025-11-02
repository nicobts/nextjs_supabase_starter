-- Create projects table (user workspaces) - only if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'projects') THEN
    CREATE TABLE public.projects (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL,
      description TEXT,
      organization_id UUID,
      owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
      is_public BOOLEAN DEFAULT FALSE,
      settings JSONB DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
    );
  END IF;
END $$;

-- Create subscription_plans table - only if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'subscription_plans') THEN
    CREATE TABLE public.subscription_plans (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price_monthly DECIMAL(10,2),
      price_yearly DECIMAL(10,2),
      features JSONB DEFAULT '[]',
      limits JSONB DEFAULT '{}',
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
    );
  END IF;
END $$;

-- Create notifications table - only if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'notifications') THEN
    CREATE TABLE public.notifications (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      message TEXT,
      type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
      is_read BOOLEAN DEFAULT FALSE,
      data JSONB DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
    );
  END IF;
END $$;

-- Enable Row Level Security where needed
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'projects') THEN
    ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'notifications') THEN
    ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create basic policies (only if tables exist)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'projects') THEN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Users can view their own projects" ON public.projects;
    DROP POLICY IF EXISTS "Users can create projects" ON public.projects;
    DROP POLICY IF EXISTS "Users can update their own projects" ON public.projects;

    -- Create new policies
    CREATE POLICY "Users can view their own projects" ON public.projects
      FOR SELECT USING (owner_id = auth.uid());

    CREATE POLICY "Users can create projects" ON public.projects
      FOR INSERT WITH CHECK (owner_id = auth.uid());

    CREATE POLICY "Users can update their own projects" ON public.projects
      FOR UPDATE USING (owner_id = auth.uid());
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'notifications') THEN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
    DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;

    -- Create new policies
    CREATE POLICY "Users can view their own notifications" ON public.notifications
      FOR SELECT USING (user_id = auth.uid());

    CREATE POLICY "Users can update their own notifications" ON public.notifications
      FOR UPDATE USING (user_id = auth.uid());

    CREATE POLICY "System can create notifications" ON public.notifications
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Insert default subscription plans (only if table exists and plans don't exist)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'subscription_plans') THEN
    INSERT INTO public.subscription_plans (name, description, price_monthly, price_yearly, features, limits)
    SELECT 'Free', 'Perfect for getting started', 0, 0,
     '["Up to 3 projects", "Basic analytics", "Community support"]',
     '{"projects": 3, "users": 1, "storage_gb": 1}'
    WHERE NOT EXISTS (SELECT 1 FROM public.subscription_plans WHERE name = 'Free');

    INSERT INTO public.subscription_plans (name, description, price_monthly, price_yearly, features, limits)
    SELECT 'Pro', 'For growing teams', 29, 290,
     '["Unlimited projects", "Advanced analytics", "Priority support", "Custom integrations"]',
     '{"projects": -1, "users": 10, "storage_gb": 100}'
    WHERE NOT EXISTS (SELECT 1 FROM public.subscription_plans WHERE name = 'Pro');

    INSERT INTO public.subscription_plans (name, description, price_monthly, price_yearly, features, limits)
    SELECT 'Enterprise', 'For large organizations', 99, 990,
     '["Everything in Pro", "Dedicated support", "Custom contracts", "SLA guarantee"]',
     '{"projects": -1, "users": -1, "storage_gb": 1000}'
    WHERE NOT EXISTS (SELECT 1 FROM public.subscription_plans WHERE name = 'Enterprise');
  END IF;
END $$;

-- Create indexes for better performance (only if tables exist)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'projects') THEN
    CREATE INDEX IF NOT EXISTS idx_projects_owner ON public.projects(owner_id);
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'notifications') THEN
    CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, is_read, created_at DESC);
  END IF;
END $$;
