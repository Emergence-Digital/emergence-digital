import type { ReactNode } from "react";
import { postAsset, type Graphic, type InsightPost } from "@/lib/insights-data";
import StatBlock from "./StatBlock";
import ChainBlock from "./ChainBlock";
import SceneBlock from "./SceneBlock";
import IconGridBlock from "./IconGridBlock";
import ForecastBlock from "./ForecastBlock";
import BarsBlock from "./BarsBlock";
import SquareGridBlock from "./SquareGridBlock";
import QuoteBlock from "./QuoteBlock";
import ShortlistBlock from "./ShortlistBlock";
import RingBlock from "./RingBlock";
import TimelineBlock from "./TimelineBlock";
import CalloutBlock from "./CalloutBlock";
import LabelBlock from "./LabelBlock";
import ChecklistBlock from "./ChecklistBlock";
import CompareBlock from "./CompareBlock";
import ScanBlock from "./ScanBlock";
import ShieldBlock from "./ShieldBlock";
import DotsBlock from "./DotsBlock";
import PadlockBlock from "./PadlockBlock";
import ChatCardBlock from "./ChatCardBlock";
import SourcesBlock from "./SourcesBlock";
import TugOfWarBlock from "./TugOfWarBlock";
import ConvergeBlock from "./ConvergeBlock";

interface PostGraphicProps {
  post: InsightPost;
  graphic: Graphic;
  jump?: ReactNode;
}

/** A beat's graphic, with its image paths turned into the post's public URLs. Types not built yet render nothing. */
export default function PostGraphic({ post, graphic, jump }: PostGraphicProps) {
  const asset = (path: string) => postAsset(post, path);
  const source = post.sourceChip;

  switch (graphic.type) {
    case "stat":
      return <StatBlock graphic={graphic} source={source} jump={jump} />;
    case "chain":
      return (
        <ChainBlock
          graphic={{ ...graphic, steps: graphic.steps.map((step) => ({ ...step, cutout: step.cutout && asset(step.cutout) })) }}
          source={source}
          jump={jump}
        />
      );
    case "scene":
      if (graphic.variant === "padlock") {
        return (
          <PadlockBlock graphic={{ ...graphic, layers: graphic.layers.map((layer) => ({ ...layer, src: asset(layer.src) })) }} jump={jump} />
        );
      }
      return (
        <SceneBlock
          graphic={{ ...graphic, layers: graphic.layers.map((layer) => ({ ...layer, src: asset(layer.src) })) }}
          source={source}
          jump={jump}
        />
      );
    case "iconGrid":
      return <IconGridBlock graphic={graphic} jump={jump} />;
    case "forecast":
      return <ForecastBlock graphic={graphic} jump={jump} />;
    case "bars":
      return <BarsBlock graphic={graphic} source={source} jump={jump} />;
    case "squareGrid":
      return (
        <SquareGridBlock graphic={{ ...graphic, cutout: graphic.cutout && asset(graphic.cutout) }} source={source} jump={jump} />
      );
    case "quote":
      return <QuoteBlock graphic={graphic} source={source} jump={jump} />;
    case "shortlist":
      return <ShortlistBlock graphic={graphic} jump={jump} />;
    case "ring":
      return <RingBlock graphic={graphic} jump={jump} />;
    case "timeline":
      return (
        <TimelineBlock graphic={{ ...graphic, cutout: graphic.cutout && asset(graphic.cutout) }} source={source} jump={jump} />
      );
    case "callout":
      return <CalloutBlock graphic={graphic} jump={jump} />;
    case "label":
      return <LabelBlock graphic={graphic} jump={jump} />;
    case "checklist":
      return (
        <ChecklistBlock
          graphic={{ ...graphic, complete: { ...graphic.complete, cutout: graphic.complete.cutout && asset(graphic.complete.cutout) } }}
          jump={jump}
        />
      );
    case "compare":
      return <CompareBlock graphic={graphic} jump={jump} />;
    case "scan":
      return <ScanBlock graphic={graphic} jump={jump} />;
    case "shield":
      return <ShieldBlock graphic={graphic} jump={jump} />;
    case "dots":
      return <DotsBlock graphic={graphic} jump={jump} />;
    case "chatCard":
      return <ChatCardBlock graphic={{ ...graphic, cutout: asset(graphic.cutout) }} jump={jump} />;
    case "sources":
      return <SourcesBlock graphic={graphic} source={source} jump={jump} />;
    case "tugOfWar":
      return <TugOfWarBlock graphic={graphic} jump={jump} />;
    case "converge":
      return <ConvergeBlock graphic={{ ...graphic, cutout: asset(graphic.cutout) }} jump={jump} />;
    default:
      return null;
  }
}
