import { Presentation } from './components/Presentation';
import { TitleSlide } from './slides/01_TitleSlide';
import { StatusSlide } from './slides/02_StatusSlide';
import { SecurityGapSlide } from './slides/03_SecurityGapSlide';
import { FallShortSlide } from './slides/04_FallShortSlide';
import { CapabilitiesSlide } from './slides/05_CapabilitiesSlide';
import { ArchitectureSlide } from './slides/06_ArchitectureSlide';
import { DataCollectionSlide } from './slides/07_DataCollectionSlide';
import { CIMSlide } from './slides/08_CIMSlide';
import { StreamingDetectionSlide } from './slides/09_StreamingDetectionSlide';
import { AlertPipelineSlide } from './slides/10_AlertPipelineSlide';
import { DemoSlide } from './slides/11_DemoSlide';
import { CallToActionSlide } from './slides/12_CallToActionSlide';

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
