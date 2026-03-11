'use client';

import { useState } from 'react';
import { Instagram, Heart, MessageCircle, Send, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';
import Link from 'next/link';

interface InstagramWidgetProps {
  isDark: boolean;
}

interface InstagramPost {
  id: string;
  images: string[];
  caption: string;
  likes: number;
  comments: string[];
}

const dummyPost: InstagramPost = {
  id: '1',
  images: [
    '/IMG_9907.jpg',
    '/IMG_9906.jpg',
    '/IMG_9905.jpg'
  ],
  caption: 'Coding adventures! 💻✨ #DevLife #CodeAndCoffee',
  likes: 150,
  comments: [
    'Great work! Keep it up! 👍',
    'Inspiring! What project are you working on?'
  ]
};

const profileLink = 'https://www.instagram.com/hardikgauba/';

export function InstagramWidget({ isDark }: InstagramWidgetProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % dummyPost.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + dummyPost.images.length) % dummyPost.images.length);
  };

  const IconLink = ({ children, ariaLabel }: { children: React.ReactNode; ariaLabel: string }) => (
    <Link href={profileLink} className="hover:text-blue-500 transition-colors" aria-label={ariaLabel}>
      {children}
    </Link>
  );

  return (
    <Card className={`backdrop-blur-sm transition-colors duration-300 rounded-3xl overflow-hidden ${
      isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
    }`}>
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Link href={profileLink}>
              <Avatar className="w-8 h-8 cursor-pointer">
                <AvatarImage src="/insta4.JPG" alt="hardikgauba" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link href={profileLink} className="text-sm font-semibold hover:underline">
                hardikgauba
              </Link>
              <p className="text-xs text-gray-500">380 followers</p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full text-xs"
            onClick={() => window.open(profileLink, '_blank')}
          >
            View profile
          </Button>
        </div>

        <div className="relative">
          <Image
            src={dummyPost.images[currentImageIndex]}
            alt={`Instagram Post Image ${currentImageIndex + 1}`}
            width={400}
            height={400}
            className="w-full h-auto"
          />
          <button 
            onClick={prevImage} 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextImage} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex justify-between mb-2">
            <div className="flex space-x-4">
              <IconLink ariaLabel="Like post">
                <Heart className="w-6 h-6" />
              </IconLink>
              <IconLink ariaLabel="Comment on post">
                <MessageCircle className="w-6 h-6" />
              </IconLink>
              <IconLink ariaLabel="Share post">
                <Send className="w-6 h-6" />
              </IconLink>
            </div>
            <IconLink ariaLabel="Save post">
              <Bookmark className="w-6 h-6" />
            </IconLink>
          </div>
          <p className="font-semibold text-sm mb-1">{dummyPost.likes.toLocaleString()} likes</p>
          <p className="text-sm">
            <Link href={profileLink} className="font-semibold hover:underline">hardikgauba</Link>{' '}
            {dummyPost.caption}
          </p>
          <div className="mt-2 space-y-1">
            {dummyPost.comments.map((comment, index) => (
              <p key={index} className="text-sm">{comment}</p>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1 hover:underline cursor-pointer">
            <Link href={profileLink}>View all {dummyPost.comments.length} comments</Link>
          </p>
          <div className="flex items-center mt-2">
            <input 
              type="text" 
              placeholder="Add a comment..." 
              className="flex-grow bg-transparent text-sm focus:outline-none cursor-pointer"
              onClick={() => window.open(profileLink, '_blank')}
              readOnly
            />
            <Link href={profileLink}>
              <Instagram className="w-5 h-5 text-gray-500 hover:text-blue-500 transition-colors" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
