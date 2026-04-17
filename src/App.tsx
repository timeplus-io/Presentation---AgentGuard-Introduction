import { Presentation } from './components/Presentation';
import { TitleSlide } from './slides/01_TitleSlide';
import { TableOfContentsSlide } from './slides/02_TableOfContentsSlide';
import { StatusSlide } from './slides/03_StatusSlide';
import { SecurityGapSlide } from './slides/04_SecurityGapSlide';
import { FallShortSlide } from './slides/05_FallShortSlide';
import { CapabilitiesSlide } from './slides/06_CapabilitiesSlide';
import { ArchitectureSlide } from './slides/07_ArchitectureSlide';
import { DataCollectionSlide } from './slides/08_DataCollectionSlide';
import { CIMSlide } from './slides/09_CIMSlide';
import { StreamingDetectionSlide } from './slides/10_StreamingDetectionSlide';
import { AlertPipelineSlide } from './slides/11_AlertPipelineSlide';
import { DemoSlide } from './slides/12_DemoSlide';
import { CallToActionSlide } from './slides/13_CallToActionSlide';

export default function App() {
  const slides = [
    <TitleSlide key="title" />,
    <TableOfContentsSlide key="toc" />,
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
