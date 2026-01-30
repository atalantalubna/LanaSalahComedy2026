-- ============================================
-- ADMIN SYSTEM MIGRATION
-- Creates tables for reviews, subscribers, contacts, social links, and videos
-- ============================================

-- ============================================
-- REVIEWS TABLE
-- ============================================
CREATE TYPE public.review_relationship AS ENUM ('press', 'peer', 'audience');
CREATE TYPE public.review_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  relationship review_relationship NOT NULL DEFAULT 'audience',
  review_text TEXT NOT NULL,
  status review_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES auth.users(id)
);

-- RLS for reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Public can submit reviews
CREATE POLICY "Anyone can submit a review"
ON public.reviews FOR INSERT WITH CHECK (true);

-- Public can view only approved reviews
CREATE POLICY "Approved reviews are publicly viewable"
ON public.reviews FOR SELECT
USING (status = 'approved' OR auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- Admins can update reviews
CREATE POLICY "Admins can update reviews"
ON public.reviews FOR UPDATE
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- Admins can delete reviews
CREATE POLICY "Admins can delete reviews"
ON public.reviews FOR DELETE
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- ============================================
-- SUBSCRIBERS TABLE
-- ============================================
CREATE TABLE public.subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe
CREATE POLICY "Anyone can subscribe"
ON public.subscribers FOR INSERT WITH CHECK (true);

-- Admins can view subscribers
CREATE POLICY "Admins can view subscribers"
ON public.subscribers FOR SELECT
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- Admins can update subscribers
CREATE POLICY "Admins can update subscribers"
ON public.subscribers FOR UPDATE
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- Admins can delete subscribers
CREATE POLICY "Admins can delete subscribers"
ON public.subscribers FOR DELETE
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- ============================================
-- CONTACTS TABLE
-- ============================================
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_read BOOLEAN NOT NULL DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Anyone can submit contact form
CREATE POLICY "Anyone can submit contact form"
ON public.contacts FOR INSERT WITH CHECK (true);

-- Admins can view contacts
CREATE POLICY "Admins can view contacts"
ON public.contacts FOR SELECT
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- Admins can update contacts
CREATE POLICY "Admins can update contacts"
ON public.contacts FOR UPDATE
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- Admins can delete contacts
CREATE POLICY "Admins can delete contacts"
ON public.contacts FOR DELETE
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- ============================================
-- SOCIAL LINKS TABLE
-- ============================================
CREATE TABLE public.social_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- Public can view active social links
CREATE POLICY "Active social links are publicly viewable"
ON public.social_links FOR SELECT USING (is_active = true OR auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- Admins can insert social links
CREATE POLICY "Admins can insert social links"
ON public.social_links FOR INSERT
WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- Admins can update social links
CREATE POLICY "Admins can update social links"
ON public.social_links FOR UPDATE
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- Admins can delete social links
CREATE POLICY "Admins can delete social links"
ON public.social_links FOR DELETE
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- ============================================
-- VIDEOS TABLE
-- ============================================
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  thumbnail_url TEXT,
  video_url TEXT NOT NULL,
  duration TEXT,
  category TEXT DEFAULT 'standup' CHECK (category IN ('standup', 'podcast', 'interview', 'sketch', 'clip')),
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Public can view active videos
CREATE POLICY "Active videos are publicly viewable"
ON public.videos FOR SELECT USING (is_active = true OR auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- Admins can insert videos
CREATE POLICY "Admins can insert videos"
ON public.videos FOR INSERT
WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- Admins can update videos
CREATE POLICY "Admins can update videos"
ON public.videos FOR UPDATE
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- Admins can delete videos
CREATE POLICY "Admins can delete videos"
ON public.videos FOR DELETE
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- ============================================
-- UPDATE GALLERY_IMAGES TABLE (already exists)
-- Add admin policies
-- ============================================

-- Add location column to gallery_images if it doesn't exist
ALTER TABLE public.gallery_images ADD COLUMN IF NOT EXISTS location TEXT;

-- Admins can insert gallery images
CREATE POLICY "Admins can insert gallery images"
ON public.gallery_images FOR INSERT
WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- Admins can update gallery images
CREATE POLICY "Admins can update gallery images"
ON public.gallery_images FOR UPDATE
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- Admins can delete gallery images
CREATE POLICY "Admins can delete gallery images"
ON public.gallery_images FOR DELETE
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'lubna@atalantadigital.com'));

-- ============================================
-- STORAGE BUCKET FOR GALLERY
-- ============================================
-- Note: This needs to be run in Supabase Dashboard or via API
-- INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);
