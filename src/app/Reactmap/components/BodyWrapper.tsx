import { useLayoutEffect, useState } from "react";
import "./BodyWrapper.scss";
import UkraineFolkMap from "./map/ukraine-folk-map/UkraineFolkMap";
import RegionList from "./list-of-regions/RegionList";
import ScaleMapInput from "./map/scale-input/ScaleMapInput";
import SidebarMenu from "./side-bar-menu/SideBarMenu";
import React from "react";

type Props = {};

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([
        document.documentElement.clientWidth,
        document.documentElement.clientHeight,
      ]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

const BodyWrapper = (props: Props) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [scale, setScale] = useState<number>(0);
  const [width] = useWindowSize();

  return (
    <div className="body-wrapper">
      <div className="map-content-wrapper">
        {width <= 1440 && (
          <SidebarMenu>
            <div className="region-list-wrapper">
              <RegionList getSelectedRegion={setSelectedRegion} />
            </div>
          </SidebarMenu>
        )}
        <UkraineFolkMap
          startXOffset={width > 1600 ? width - 1680 : 0}
          scale={scale}
          selectedRegion={selectedRegion}
          setScale={setScale}
        />
        {width > 1440 && (
          <div className="region-list-wrapper absolute-position">
            <RegionList getSelectedRegion={setSelectedRegion} />
          </div>
        )}
        <div className="scale-slider-wrapper">
          <ScaleMapInput scale={scale} getScale={setScale} />
        </div>
      </div>
    </div>
  );
};

export default BodyWrapper;
