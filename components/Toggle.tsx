"use client";
import React from "react";
import styled from "styled-components";

const Switch = () => {
  return (
    <StyledWrapper>
      <div className="toggle-switch">
        <label className="switch-label">
          <input type="checkbox" className="checkbox" />
          <span className="slider" />
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .toggle-switch {
    position: relative;
    width: 30px;
    height: 15px;
    --light: #d8dbe0;
    --dark: #28292c;
    --link: rgb(27, 129, 112);
    --link-hover: rgb(24, 94, 82);
  }

  .switch-label {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--dark);
    border-radius: 10px;
    cursor: pointer;
    border: 1.5px solid var(--dark);
  }

  .checkbox {
    display: none;
  }

  .slider {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    transition: 0.3s;
  }

  .checkbox:checked ~ .slider {
    background-color: var(--light);
  }

  .slider::before {
    content: "";
    position: absolute;
    top: 1.75px;
    left: 1.5px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--dark);
    box-shadow: inset 8px -3px 0px 0px var(--light);
    transition: 0.3s;
  }

  .checkbox:checked ~ .slider::before {
    transform: translateX(16px); /* 40 - 14 - margin */
    background-color: var(--dark);
    box-shadow: none;
  }
`;

export default Switch;
