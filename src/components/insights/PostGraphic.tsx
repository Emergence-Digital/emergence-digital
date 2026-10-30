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
    default:
      return null;
  }
}
