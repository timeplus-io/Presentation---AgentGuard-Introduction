import { SlideLayout } from '../components/Presentation';
import demoVideo from '../assets/Agentguard Quick Demo - Scenario 9.mp4';

export function DemoSlide() {
  return (
    <SlideLayout title="Live Demo">
      <div className="absolute inset-0">
        <video
          src={demoVideo}
          className="w-full h-full rounded-xl object-contain object-center"
          controls
          autoPlay
          loop
          muted
        />
      </div>
    </SlideLayout>
  );
}
