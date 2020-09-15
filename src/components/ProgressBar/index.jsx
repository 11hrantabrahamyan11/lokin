import React from "react";

import "./ProgressBar.less";

const ProgressBar = () => (
  <section className="progress">
    <div className="container progress__container">
      <div className="progress__title">
        <p className="progress__title_text">Тип предприятия</p>
        <p className="progress__title_text">Категории</p>
        <p className="progress__title_text">График работы</p>
        <p className="progress__title_text blue">Оборот и нагрузка</p>
        <p className="progress__title_text blue">Должности</p>
        <p className="progress__title_text blue">Тип нагрузки</p>
      </div>
      <div className="progress__content">
        <div className="progress__content_step">1</div>
        <div className="progress__divider divione" />
        <div className="progress__content_step">2</div>
        <div className="progress__divider divitwo" />
        <div className="progress__content_step">3</div>
        <div className="progress__divider" />
        <div className="progress__content_step">4</div>
        <div className="progress__divider" />
        <div className="progress__content_step">5</div>
        <div className="progress__divider" />
        <div className="progress__content_step">6</div>
      </div>
    </div>
  </section>
);

export default ProgressBar;
