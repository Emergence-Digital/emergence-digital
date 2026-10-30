import type { ReactNode } from "react";
import { postAsset, type Graphic, type InsightPost } from "@/lib/insights-data";
import StatBlock from "./StatBlock";
import ChainBlock from "./ChainBlock";
import SceneBlock from "./SceneBlock";
import IconGridBlock from "./IconGridBlock";
import ForecastBlock from "./ForecastBlock";

interface PostGraphicProps {
  post: InsightPost;
  graphic: Graphic;
  jump?: ReactNode;
}

/** A beat's graphic, with its image paths turned into the post's public URLs. Types not built yet render nothing. */
export default function PostGraphic({ post, graphic, jump }: PostGraphicProps) {
  const asset = (path: string) => postAsset(post, path);

  switch (graphic.type) {
    case "stat":
      return <StatBlock graphic={graphic} source={post.sourceChip} jump={jump} />;
    case "chain":
      return (
        <ChainBlock
          graphic={{ ...graphic, steps: graphic.steps.map((step) => ({ ...step, cutout: step.cutout && asset(step.cutout) })) }}
          source={post.sourceChip}
          jump={jump}
        />
      );
    case "scene":
      return (
        <SceneBlock
          graphic={{ ...graphic, layers: graphic.layers.map((layer) => ({ ...layer, src: asset(layer.src) })) }}
          source={post.sourceChip}
          jump={jump}
        />
      );
    case "iconGrid":
      return <IconGridBlock graphic={graphic} jump={jump} />;
    case "forecast":
      return <ForecastBlock graphic={graphic} jump={jump} />;
    default:
      return null;
  }
}
