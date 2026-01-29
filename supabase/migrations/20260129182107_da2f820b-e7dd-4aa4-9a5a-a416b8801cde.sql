-- Create gallery_images table for storing photo metadata
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  image_url TEXT NOT NULL,
  aspect_ratio TEXT NOT NULL DEFAULT 'square' CHECK (aspect_ratio IN ('tall', 'wide', 'square')),
  category TEXT DEFAULT 'performance' CHECK (category IN ('performance', 'studio', 'candid', 'press')),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Public read access for gallery
CREATE POLICY "Gallery images are publicly viewable"
ON public.gallery_images
FOR SELECT
USING (true);

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);

-- Public read access for gallery bucket
CREATE POLICY "Gallery images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'gallery');

-- Insert sample data for demonstration
INSERT INTO public.gallery_images (title, image_url, aspect_ratio, category, display_order) VALUES
('Comedy Store Performance', 'https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=800', 'tall', 'performance', 1),
('Studio Portrait', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800', 'square', 'studio', 2),
('Backstage Moment', 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800', 'wide', 'candid', 3),
('Festival Set', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', 'tall', 'performance', 4),
('Press Photo', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800', 'square', 'press', 5),
('Green Room', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800', 'wide', 'candid', 6),
('Headshot', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800', 'tall', 'studio', 7),
('On Stage', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800', 'square', 'performance', 8),
('Behind the Scenes', 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800', 'wide', 'candid', 9);