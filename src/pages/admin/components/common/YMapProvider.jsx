'use client'
import React from 'react';
import { useState, useEffect } from 'react'
import Link from "next/link";
import { YMaps, Map, FullscreenControl, SearchControl, GeolocationControl } from "@pbe/react-yandex-maps";
import { Button, Circle, Placemark, ZoomControl } from "@pbe/react-yandex-maps";
import { defaultYMapX, defaultYMapY } from '../../../../const/CustomConsts';

export default function YMapProvider({ mapX, mapY, onChildData }) {
  if (!mapX) mapX = defaultYMapX;
  if (!mapY) mapY = defaultYMapY;
  const [coordinate, setCoordinate] = useState("")
  const onMapClick = (e) => {
    const coords = e.get("coords");
    setCoordinate(coords);
    onChildData(coords);
  };
  const mapXY = [mapX, mapY];
  const placeMark = {
    geometry: mapXY,
    properties: {
      hintContent: '1-hintContent',
      balloonContent: '2-balloonContent',
      iconContent: '1',
    }
  }
  const mapLink = 'https://yandex.ru/maps/?ll=' + mapX + '%2C' + mapY + '&z=5';

  return (
    <>
      <YMaps>
        <Map defaultState={{ center: mapXY, zoom: 10 }}
          style={{
            width: '50v', height: '369px',
          }}
          onClick={onMapClick}
        >
          <Button
            options={{ maxWidth: 128 }}
            data={{ content: "Unpress me!" }}
            defaultState={{ selected: true }}
          />
          <Placemark {...placeMark}
          // modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
          />
          <ZoomControl />
          <FullscreenControl />
          <SearchControl />
          <GeolocationControl />
        </Map>
      </YMaps>
      <p className="text-sm md:text-base xl:text-lg font-medium text-[#FF6432]">
        <Link href={mapLink}
          target="_blank">
          Открыть Яндекс Карты
        </Link>
      </p >
    </>
  )
}
