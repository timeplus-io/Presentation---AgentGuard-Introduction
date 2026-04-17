import { Presentation } from './components/Presentation';
import { TitleSlide } from './slides/TitleSlide';
import { StatusSlide } from './slides/StatusSlide';
import { SecurityGapSlide } from './slides/SecurityGapSlide';
import { FallShortSlide } from './slides/FallShortSlide';
import { CapabilitiesSlide } from './slides/CapabilitiesSlide';
import { ArchitectureSlide } from './slides/ArchitectureSlide';
import { DataCollectionSlide } from './slides/DataCollectionSlide';
import { CIMSlide } from './slides/CIMSlide';
import { StreamingDetectionSlide } from './slides/StreamingDetectionSlide';
import { AlertPipelineSlide } from './slides/AlertPipelineSlide';
import { DemoSlide } from './slides/DemoSlide';
import { CallToActionSlide } from './slides/CallToActionSlide';

export default function App() {
  const slides = [
    <TitleSlide key="title" />,
    <StatusSlide key="status" />,
    <SecurityGapSlide key="gap" />,
    <FallShortSlide key="fallshort" />,
    <CapabilitiesSlide key="capabilities" />,
    <ArchitectureSlide key="architecture" />,
    <DataCollectionSlide key="datacollection" />,
    <CIMSlide key="cim" />,
    <StreamingDetectionSlide key="detection" />,
    <AlertPipelineSlide key="alertpipeline" />,
    <DemoSlide key="demo" />,
    <CallToActionSlide key="cta" />
  ];

  return (
    <div className="w-screen h-screen">
      <Presentation slides={slides} />
    </div>
  );
}
