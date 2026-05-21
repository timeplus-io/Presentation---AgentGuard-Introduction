import { SlideLayout } from '../components/Presentation';

export function DemoSlide() {
  return (
    <SlideLayout title="Live Demo">
      <div className="absolute inset-0">
        <iframe
          src="https://www.youtube.com/embed/pPdkfkO_ePs?autoplay=1&mute=1&rel=0"
          title="AgentGuard Demo"
          className="w-full h-full rounded-xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </SlideLayout>
  );
}
