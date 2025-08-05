"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon";

interface VideoDemoProps {
  videoUrl?: string;
  videoId?: string;
  platform?: "youtube" | "vimeo" | "local";
  posterImage?: string;
  videoFile?: string;
}

export default function VideoDemo({ 
  videoUrl,
  videoId, 
  platform = "youtube",
  posterImage,
  videoFile 
}: VideoDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Construct video embed URL based on platform
  const getEmbedUrl = () => {
    if (videoUrl) return videoUrl;
    if (!videoId) return "";
    
    switch (platform) {
      case "youtube":
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      case "vimeo":
        return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
      default:
        return "";
    }
  };

  const embedUrl = getEmbedUrl();

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Watch Mazu Save Lives</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how Mazu provides life-saving guidance in real emergency scenarios. 
              Watch the 3-minute demo to understand why offline AI matters when disasters strike.
            </p>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black">
            {!isPlaying && posterImage ? (
              <div className="relative aspect-video">
                <img 
                  src={posterImage} 
                  alt="Mazu Demo Video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button
                    size="lg"
                    onClick={() => setIsPlaying(true)}
                    className="gap-2"
                  >
                    <Icon name="RiPlayFill" className="w-6 h-6" />
                    Play Demo (3 min)
                  </Button>
                </div>
              </div>
            ) : videoFile ? (
              <div className="aspect-video">
                <video
                  controls
                  autoPlay
                  className="w-full h-full"
                  poster={posterImage}
                >
                  <source src={videoFile} type="video/mp4" />
                  <source src={videoFile} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : embedUrl ? (
              <div className="aspect-video">
                <iframe
                  src={embedUrl}
                  title="Mazu Demo Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              // Placeholder for when video is being added
              <div className="aspect-video bg-muted flex items-center justify-center">
                <div className="text-center p-8">
                  <Icon name="RiVideoLine" className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Demo Video Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Our 3-minute demonstration video showing Mazu in action will be available shortly.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <Icon name="RiWifiOffLine" className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h4 className="font-semibold">100% Offline</h4>
              <p className="text-sm text-muted-foreground">Works without internet</p>
            </div>
            <div className="p-4">
              <Icon name="RiTimeLine" className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h4 className="font-semibold">{"< 2s Response"}</h4>
              <p className="text-sm text-muted-foreground">Instant AI guidance</p>
            </div>
            <div className="p-4">
              <Icon name="RiShieldCheckLine" className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h4 className="font-semibold">Red Cross Protocols</h4>
              <p className="text-sm text-muted-foreground">Trusted emergency procedures</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}