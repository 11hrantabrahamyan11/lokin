import React, { useState, useEffect } from "react";
import classNames from "classnames";

import "./Graph.less";
import GraphItem from "./GraphItem";

import Input from "../Input";
import { getTimeFromString } from "../../utils";
import { ReactComponent as Vector } from "../../icons/Vector.svg";
import { ReactComponent as Vector1 } from "../../icons/Vector1.svg";

const Graph = () => {
  const [snip, setSnipe] = useState(true);
  const [endValue, setEndValue] = useState("0300");
  const [hoursCount, setHourseCount] = useState(112);
  const [startValue, setStartValue] = useState("1130");

  const { hour: startHour, minute: startMinutes } = getTimeFromString(
    startValue
  );
  const { hour: endHour, minute: endMinutes } = getTimeFromString(endValue);

  const lineLength = 34 * (hoursCount / 7);
  const isEndMore = startHour < endHour;
  const range = isEndMore
    ? (endHour * 60 + endMinutes - (startHour * 60 + startMinutes)) / 60
    : ((endHour + 24) * 60 + endMinutes - (startHour * 60 + startMinutes)) / 60;

  const initialHoursCubes = Array.from({ length: hoursCount }, (_, index) => ({
    id: index + 1,
    active: false,
    sliced: index % (hoursCount / 7) === 0,
  }));
  const [hoursCubes, setHoursCubes] = useState(initialHoursCubes);

  const getTimeZonesByRange = (range) => {
    const timezones = [
      {
        hour: `${startHour < 10 ? "0" : ""}${startHour}`,
        minutes: `${startMinutes < 10 ? "0" : ""}${startMinutes}`,
      },
    ];

    for (let i = 1; i < range / 2; i++) {
      if (startHour + i * 2 > 24) {
        timezones.push({
          hour: `${startHour + i * 2 - 24 < 10 ? "0" : ""}${startHour +
            i * 2 -
            24}`,
          minutes: "00",
        });
      } else if (startHour + i * 2 < 10) {
        timezones.push({ hour: `0${startHour + i * 2}`, minutes: "00" });
      } else {
        timezones.push({ hour: startHour + i * 2, minutes: "00" });
      }
    }

    return timezones;
  };

  const timeZones = getTimeZonesByRange(range);

  const [timeZone, setTimeZone] = useState(timeZones);

  useEffect(
    () => {
      if (startValue.length === 4 && endValue.length === 4) {
        setTimeZone(timeZones);
        setHourseCount(Math.ceil(range) * 7);
      } else {
        setHourseCount(0);
      }
    },
    [startValue, endValue]
  );

  useEffect(
    () => {
      setHoursCubes(initialHoursCubes);
    },
    [hoursCount]
  );

  const cubeActiveToggler = (id) => {
    const updatedHoursCubes = hoursCubes.map((item) => {
      if (item.id === id) {
        return { ...item, active: !item.active };
      }

      return item;
    });

    setHoursCubes(updatedHoursCubes);
  };

  const renderItems = hoursCubes.map(({ id, sliced, active }) => (
    <GraphItem
      key={id}
      active={active}
      className={snip && sliced ? "snip" : ""}
      cubeActiveToggler={() => cubeActiveToggler(id)}
    />
  ));

  const startChangeHandler = (e) => {
    const currentStart = e.target.value.replace(":", "");
    const slicedCurrentStart = currentStart.slice(2, 4);

    setStartValue(currentStart);

    if (slicedCurrentStart > 59) {
      setStartValue(`${startHour}00`);
    } else if (currentStart.slice(0, 2) > 23) {
      setStartValue(`00${startMinutes}`);
    }

    setSnipe(slicedCurrentStart > 0);
  };

  const endChangeHandler = (e) => {
    const currentEnd = e.target.value.replace(":", "");

    setEndValue(currentEnd);

    if (currentEnd.slice(2, 4) > 59) {
      setEndValue(`${endHour}00`);
    } else if (currentEnd.slice(0, 2) > 23) {
      setEndValue(`00${endMinutes}`);
    }
  };

  const handleHoursUpdate = (active) => {
    const updatedHoursCubes = hoursCubes.map((cube) => ({ ...cube, active }));

    setHoursCubes(updatedHoursCubes);
  };

  const renderTimeZones = timeZone.map(({ minutes, hour }) => (
    <p key={hour}>
      {hour}
      <sub>{minutes}</sub>
    </p>
  ));

  const graphContainer = classNames("graph__container", {
    visibility: !hoursCount,
  });

  const graphHeader = classNames("graph__header", {
    snip_title: snip,
  });

  return (
    <section>
      <div className="container graph" style={{ width: lineLength + 220 }}>
        <h1 className="graph__title">График работы предприятия</h1>
        <div className="graph__interval">
          <h3 className="graph__subtitle">Задать интервал таблицы </h3>
          <div className="graph__interval_time">
            <Input onChange={startChangeHandler} value={startValue} />
          </div>
          <div className="graph__divider" />
          <div className="graph__interval_time">
            <Input onChange={endChangeHandler} value={endValue} />
          </div>
        </div>
        <div className={graphContainer}>
          <div className={graphHeader}>{renderTimeZones}</div>
          <div
            className="graph__content"
            style={{ width: snip ? lineLength + 39 - 17 : lineLength + 39 }}
          >
            <div className="graph__content_date">
              <span>Пн</span>
              <span>Вт</span>
              <span>Ср</span>
              <span>Чт</span>
              <span>Пт</span>
              <span>Сб</span>
              <span>Вс</span>
            </div>
            <div className="graph__content_items">{renderItems}</div>
          </div>
        </div>
        <div className="graph__change">
          <button
            className="graph__change_btn"
            onClick={() => handleHoursUpdate(true)}
          >
            <Vector />
            Заполнить автоматически
          </button>
          <button
            className="graph__change_btn"
            onClick={() => handleHoursUpdate(false)}
          >
            <Vector1 />
            Очистить
          </button>
        </div>
      </div>
      <div className="routing">
        <button>Назад</button>
        <button>Далее</button>
      </div>
    </section>
  );
};

export default Graph;
