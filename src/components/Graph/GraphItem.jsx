import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Graph.less";

const GraphItem = ({ className, active, cubeActiveToggler }) => {
  const itemClass = classNames("graph__content_item", {
    active,
    [className]: className,
  });

  return (
    <div role="button" onClick={cubeActiveToggler} className={itemClass} />
  );
};

GraphItem.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool.isRequired,
  cubeActiveToggler: PropTypes.func.isRequired,
};

export default GraphItem;
